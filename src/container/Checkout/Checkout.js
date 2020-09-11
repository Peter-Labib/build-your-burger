import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData'

const checkout = props => {

    const checkoutCancelledHandler = () => {
        props.history.goBack()
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data')
    }

    let summery = <Redirect to='/' />
    if (props.ings) {
        const purchasedRedirect = props.purchased ? <Redirect to='/' /> : null
        summery = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={props.ings}
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler} />
                <Route path={props.match.path + '/contact-data'} component={ContactData} />
            </div>
        )
    }
    return summery;
}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default withRouter(connect(mapStateToProps)(checkout));