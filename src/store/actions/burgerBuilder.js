import * as actionTypes from './actionTypes'
import axios from '../../axios-order'

export const ingredientAdd = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients
    }
}

export const fetchIngredientsFailed = (error) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
        error
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('ingredients.json')
            .then(res => {
                dispatch(setIngredients(res.data))
            })
            .catch(() => {
                dispatch(fetchIngredientsFailed())
            })
    }
}

export const ingredientRemove = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
}