import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './Contactdata/ContactData';


class Checkout extends Component {
    state ={
        ingredients: null,
        totalPrice: 0
    }

    componentDidMount() {
       const query = new URLSearchParams(this.props.location.search);
       const ingredients = {};
       let price = 0;
       // loop through the queryParam
       for (let param of query.entries()){
            // ['salad', '1']
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = param[1]
            }
       }
       this.setState({ingredients: ingredients, totalPrice: price});
    }

    checkoutCancelledHandler =() => {
        // go back 
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        // replace the current route with 'checkout/contact-data;
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients} 
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} />
            </div>
        );
    }
}

export default Checkout;