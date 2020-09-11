import React from 'react'

import styles from './Order.module.css'

const Order = (props) => {
    const ingredients = []
    for (const ingredientName in props.ingredients) {
        ingredients.push({ name: ingredientName, amount: props.ingredients[ingredientName] })
    }
    const ingredientOutput = ingredients.map((ing, index) => <span key={index}>{ing.name} ({ing.amount})</span>)
    return (
        <div className={styles.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>$ {props.price.toFixed(2)}</strong></p>
        </div>
    )
}

export default Order
