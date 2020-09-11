import * as actionType from '../actions/actionTypes'

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        case actionType.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }
        case actionType.PURCHASE_BURGER_SUCCESS:
            // eslint-disable-next-line no-case-declarations
            const newOrder = {
                ...action.orderData,
                id: action.id
            }
            return {
                ...state,
                orders: state.orders.concat(newOrder),
                loading: false,
                purchased: true
            }
        case actionType.PURCHASE_BURGER_FAILED:
            return {
                ...state,
                loading: false
            }
        case actionType.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true
            }
        case actionType.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            }
        case actionType.FETCH_ORDERS_FAILED:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}

export default reducer