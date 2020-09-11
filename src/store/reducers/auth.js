import * as actionType from '../actions/actionTypes'

const initialState = {
    idToken: null,
    localId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.AUTH_START:
            return {
                ...state,
                loading: true,
                error: null
            }
        case actionType.AUTH_SUCCESS:
            return {
                ...state,
                idToken: action.idToken,
                localId: action.localId,
                loading: false
            }
        case actionType.AUTH_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case actionType.AUTH_LOGOUT:
            return {
                ...state,
                idToken: null,
                localId: null
            }
        case actionType.SET_AUTH_REDIRECT_PATH:
            return {
                ...state,
                authRedirectPath: action.path
            }
        default:
            return state
    }
}

export default reducer