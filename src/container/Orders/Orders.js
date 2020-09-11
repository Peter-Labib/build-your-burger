import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import axios from '../../axios-order'
import * as actionCreate from '../../store/actions/index'

import Order from '../../components/Order/Order'
import WithErrorHandler from '../../Hoc/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'

const Orders = props => {
    const { fetchOrders, idToken, userId } = props

    useEffect(() => {
        fetchOrders(idToken, userId)
    }, [fetchOrders, idToken, userId])

    let orders = <Spinner />
    if (!props.loading) {
        orders = (
            <div>
                {props.orders.map(ord => <Order key={ord.id} ingredients={ord.ingredients} price={+ord.totalPrice} />)}
            </div>
        )
    }
    return orders
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        idToken: state.auth.idToken,
        userId: state.auth.localId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (idToken, userId) => dispatch(actionCreate.fetchOrder(idToken, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders, axios))
