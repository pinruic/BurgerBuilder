import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { withRouter } from 'react-router-dom';

const burger = (props) => {
    /*
    // Object.key() returns an array of a give object's own enumerable 
    // property names, iterated in the same order that a normal loop would.
    //console.log(props.ingredients);
    //console.log( Object.keys(props.ingredients));
    let transformedIngredients = Object.keys(props.ingredients)
        //.map() method creates a new array populated witht the results 
        // of calling a provided function on every element in the
        // calling array.
        .map(igKey => { // we want to execute a function on each item of [] 
            //console.log(props.ingredients[igKey]); 
            // Array(2) it creates two elements in array [undefined] and [undefined]
            return [...Array(props.ingredients[igKey])].map((_, i) =>{
                return <BurgerIngredient key={igKey + i} type={igKey} />
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);

    console.log(transformedIngredients);
    */
    //console.log(props);
    let transformedIngredients = [];
    //console.log(props.ingredients);
    for (let key in props.ingredients) {
        for (let i = 0; i < props.ingredients[key]; i++) {
            //console.log(props.ingredients[key]);
            //console.log(key + i);
            transformedIngredients.push(<BurgerIngredient key={key + i} type={key} />)
        }
    }
    //console.log(transformedIngredients);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }
    

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );

};

export default withRouter(burger);