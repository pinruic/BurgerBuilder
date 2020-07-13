import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        // prevent sending request and reload the page
        event.preventDefault();
        //console.log(this.props.ingredients);

        this.setState( {loading: true} );
        //alert('You continue!');
        //for firebase, node name + .json
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
                this.setState( {loading: false} );
                //redirect
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState( {loading: false} );
            });
    }

    render() {
        let form =(
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="your name" />
                <input className={classes.Input} type="email" name="email" placeholder="your email" />
                <input className={classes.Input} type="text" name="street" placeholder="your street" />
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;