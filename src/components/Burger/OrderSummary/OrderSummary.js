import React, {Component} from 'react';
import Button from '../../UI/Button/Button';
import Auxillary from '../../../hoc/Auxillary/Auxillary';

class OrderSummary extends Component {

    componentDidUpdate() {
        console.log('[order summary] will update'); 
    }

    render() {

        const ingredientSummary = [];
        //console.log(ingredientSummary);

        for (let key in this.props.ingredients) {
            ingredientSummary.push(
                                <li key={key}>
                                    <span style={{textTransform: 'capitalize'}}>{key}</span>: {this.props.ingredients[key]}
                                </li>  
            );
        }

        
        return (
            
            <Auxillary>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Auxillary>
        );
    }
}

export default OrderSummary;