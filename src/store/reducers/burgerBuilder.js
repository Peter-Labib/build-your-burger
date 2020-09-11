import * as actionTypes from '../actions/actionTypes'

const initialState = {
    ingredients: null,
    totalPrice: 10,
    purchasable: false,
    error: false,
    building: false
}

const INGREDIENTS_PRICE = {
    salad: 5,
    bacon: 10,
    meat: 10,
    cheese: 8
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName],
                building: true

            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName],
                building: true
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice: 10,
                building: false,
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state
    }
}

export default reducer