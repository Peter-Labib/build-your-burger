import * as actionType from "./actionTypes";
import axios from "axios";

export const authStart = () => {
    return {
        type: actionType.AUTH_START,
    };
};

export const authSuccess = (idToken, localId) => {
    return {
        type: actionType.AUTH_SUCCESS,
        idToken,
        localId,
    };
};

export const authFailed = (error) => {
    return {
        type: actionType.AUTH_FAILED,
        error,
    };
};

export const authLogout = () => {
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("idToken");
    return {
        type: actionType.AUTH_LOGOUT,
    };
};

const checkAuthTimeout = (expireTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expireTime * 1000);
    };
};

export const auth = (email, password, isSignup) => {
    return (dispatch) => {
        dispatch(authStart());
        const dataAuth = {
            email,
            password,
            returnSecureToken: true,
        };
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
        if (!isSignup) {
            url =
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
        }
        axios
            .post(url + "AIzaSyCESM_1Xgp18ni4j3jHkqw10_er8yLBLOg", dataAuth)
            .then((res) => {
                const expirationDate = new Date(
                    new Date().getTime() + res.data.expiresIn * 1000
                );
                localStorage.setItem("expirationDate", expirationDate);
                localStorage.setItem("idToken", res.data.idToken);
                localStorage.setItem("localId", res.data.localId);
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch((err) => {
                dispatch(authFailed(err.response.data.error));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionType.SET_AUTH_REDIRECT_PATH,
        path,
    };
};

export const authCheckState = () => {
    return (dispatch) => {
        const idToken = localStorage.getItem("idToken");
        if (!idToken) {
            dispatch(authLogout());
        } else {
            const expirationDate = new Date(localStorage.getItem("expirationDate"));
            if (expirationDate <= new Date()) {
                dispatch(authLogout());
            } else {
                const localId = localStorage.getItem("localId");
                dispatch(authSuccess(idToken, localId));
                dispatch(
                    checkAuthTimeout(
                        (expirationDate.getTime() - new Date().getTime()) / 1000
                    )
                );
            }
        }
    };
};
