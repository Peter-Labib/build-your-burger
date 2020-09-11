import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as actionCreate from '../../store/actions/index'
import Burger from '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery'
import axios from '../../axios-order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../Hoc/withErrorHandler'


const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false)
    const {onInitIngredients} =props

    useEffect(() => {
        onInitIngredients()
    }, [onInitIngredients])

    const updatePurchasableState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((pre, curr) => pre + curr)
        return sum > 0
    }

    const purchasingHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true)
        } else {
            props.onSetRedirectPath('/checkout')
            props.history.push('/auth')
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchased()
        props.history.push("/checkout")

    }

        const disabledInfo = {
            ...props.ings
        }

        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummery = null


        let burger = props.error ? <p>ingredients can not be loaded</p> : <Spinner />
        if (props.ings) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={props.ings} />
                    <BurgerControls
                        ingredientAdded={props.onIngredientAdded}
                        ingredientRemoved={props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={props.totalPrice.toFixed(2)}
                        purchasable={updatePurchasableState(props.ings)}
                        orderd={purchasingHandler}
                        isAuth={props.isAuthenticated} />
                </React.Fragment>
            )
            orderSummery = (<OrderSummery
                ingredients={props.ings}
                purchaseCancelled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}
                price={props.totalPrice.toFixed(2)} />)
        }

        return (
            <React.Fragment>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                    {orderSummery}
                </Modal>
                {burger}
            </React.Fragment>
        )
    }

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.idToken != null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actionCreate.ingredientAdd(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actionCreate.ingredientRemove(ingName)),
        onInitIngredients: () => dispatch(actionCreate.initIngredients()),
        onInitPurchased: () => dispatch(actionCreate.purchaseInit()),
        onSetRedirectPath: (path) => dispatch(actionCreate.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))