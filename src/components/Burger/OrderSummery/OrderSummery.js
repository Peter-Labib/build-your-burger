import React from 'react'
import Button from '../../UI/Button/Button'

const OrderSummery = props => {
    const ingredientSummery = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey} style={{ listStyle: 'none' }}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
            )
        })
    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A dilicious burger with the following ingredients</p>
            <ul>{ingredientSummery}</ul>
            <p><strong>Total Price: {props.price}</strong></p>
            <p>Continue To Checkout?</p>
            <Button btnType='Danger' clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType='Success' clicked={props.purchaseContinued}>CONFIRM</Button>
        </React.Fragment>
    )
}

export default OrderSummery