import * as actionTypes from './actionTypes'
import axios from '../../axios-order'

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return (dispatch, getState) => {
        dispatch(purchaseBurgerStart())
        const idToken = getState().auth.idToken
        axios.post('/orders.json?auth=' + idToken, orderData)
            .then(res => dispatch(purchaseBurgerSuccess(res.data.name, orderData)))
            .catch(err => dispatch(purchaseBurgerFailed(err)))
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    }
}

export const fetchOrderFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrder = (idToken, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart())
        const queryParams = '?auth=' + idToken + '&orderBy="userId"&equalTo' + userId + '"'
        axios.get('/orders.json' + queryParams).then(res => {
            const fetchOrders = []
            for (const key in res.data) {
                fetchOrders.push({
                    ...res.data[key],
                    id: key
                })
            }
            dispatch(fetchOrderSuccess(fetchOrders))
        })
            .catch(err => dispatch(fetchOrderFailed(err)))
    }
}