import React, { Component } from 'react';
import Auxillary from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-my-burger-4714f.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch (error => {
                this.setState({error: true});
            });
    }

    // must user arrow function in order to user 'this' keyword
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    updatePurchaseState(ingredients) {
        
        let sum = 0;
        for (let key in ingredients) {
            for (let i = 0; i < ingredients[key]; i++) {
                //console.log(props.ingredients[key]);
                //console.log(key + i);
                sum +=1;
            }
        }
        this.setState({purchaseable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;

        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.setState( {loading: true} );
        //alert('You continue!');
        //for firebase, node name + .json
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice.toFixed(2),
            // dummy data
            customer: {
                name: 'PinRui Chen',
                address: {
                    street: '123 street',
                    postCode: '123 abc',
                    country: 'Camada'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState( {loading: false, purchasing: false} );
            })
            .catch(error => {
                this.setState( {loading: false, purchasing: false} );
            });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        //{salad: true, meat: false, ...}
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <Auxillary>
                    <Burger ingredients={this.state.ingredients} />
                        <BuildControls 
                            ingredientAdded={this.addIngredientHandler}
                            ingredientRemoved={this.removeIngredientHandler}
                            disabled={disabledInfo}
                            price={this.state.totalPrice}
                            purchaseable={this.state.purchaseable} 
                            ordered={this.purchaseHandler} />
                </Auxillary>
            );

            orderSummary = <OrderSummary
                price={this.state.totalPrice.toFixed(2)} 
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.state.ingredients} />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        
        return(
            <Auxillary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} > 
                    {orderSummary}
                </Modal>
                {burger}
            </Auxillary>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);