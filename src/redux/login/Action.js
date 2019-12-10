
import { LOGIN_KEY, LOGIN_FORM, LOGIN_ROOT, LOGIN_UPDATE, LOGIN_REQUEST_STATUS, LOGIN_REQEUST_LOADING, STATUS, MESSAGE, EMPTY, LOGIN_FORM_EMAIL, LOGIN_FORM_PASSWORD, USER_DATA, ERROR, SUCCESS, SYSTEM_DATA_IS_AUTHENTICATED, LOGIN_REQUEST_SESSION_STATUS, LOGIN_REQEUST_SESSION_LOADING, LOGIN_REQEUST_LOGOUT_LOADING, LOG_OUT, LOGIN_RESET } from "../Types";
import Utils from '../../components/util/Utils';


/** Login */
export const login = (obj) => {
    return (dispatch, getState) => {
        try {
            const loginInfo = getState()[LOGIN_ROOT][LOGIN_KEY];
            const formData = loginInfo[LOGIN_FORM];

            //Intialize the request status and loading
            dispatch(updateUIConstraints({
                [LOGIN_REQUEST_STATUS]: {
                    [STATUS]: EMPTY,
                    [MESSAGE]: ""
                },
                [LOGIN_REQEUST_LOADING]: true
            }));

            const body = {
                "email": formData[LOGIN_FORM_EMAIL],
                "password": formData[LOGIN_FORM_PASSWORD]
            }

            
        } catch (error) {
            Utils.log("Update Form Data ===> error ", error);
            dispatch(updateUIConstraints({
                [LOGIN_REQUEST_STATUS]: {
                    [STATUS]: ERROR,
                    [MESSAGE]: ""
                },
                [LOGIN_REQEUST_LOADING]: false
            }));
        }
    }
}

/** Session Login */
export const sessionLogin = (obj) => {
    return (dispatch, getState) => {
        try {
            
        } catch (error) {
            Utils.log("Update Form Data ===> error ", error);
            dispatch(updateUIConstraints({
                [LOGIN_REQUEST_SESSION_STATUS]: {
                    [STATUS]: ERROR,
                    [MESSAGE]: ""
                },
                [LOGIN_REQEUST_SESSION_LOADING]: false
            }));
        }
    }
}

/** Logout */
export const logout = (obj) => {
    return (dispatch, getState) => {
        try {
            
        } catch (error) {
            Utils.log("Update Logout Form Data ===> error", error);
            dispatch(updateUIConstraints({
                [LOGIN_REQEUST_LOGOUT_LOADING]: false
            }));
        }
    }
}

/** Manage Form Data */
export const updateFormData = (obj) => {
    return (dispatch, getState) => {
        try {
            const formData = getState()[LOGIN_ROOT][LOGIN_KEY];
            const data = Object.assign(formData[LOGIN_FORM], obj);

            dispatch(updateLoginState(Object.assign(formData, {
                [LOGIN_FORM]: data
            })));
        } catch (error) {
            Utils.log("Update Form Data ===> error ", error);
        }
    }
}

/** Manage UI Constraints */
export const updateUIConstraints = (obj) => {
    return (dispatch, getState) => {
        try {
            const formData = getState()[LOGIN_ROOT][LOGIN_KEY];
            const data = Object.assign(formData, obj);

            dispatch(updateLoginState(data));
        } catch (error) {
            Utils.log("Update UI Constraints ===> error ", error);
        }
    }
}

/** Update login data state */
const updateLoginState = (obj) => {
    return (dispatch, getState) => {
        try {
            const formData = getState()[LOGIN_ROOT][LOGIN_KEY];

            dispatch({
                type: LOGIN_UPDATE,
                payload: Object.assign(formData, obj)
            })
        } catch (error) {
            Utils.log("Update Login State ===> error ", error);
        }
    }
}

/** Reset login data state */
export const resetLoginState = (obj) => {
    return (dispatch, getState) => {
        try {
            dispatch({
                type: LOGIN_RESET,
                payload: {}
            })
        } catch (error) {
            Utils.log("Update Login State ===> error ", error);
        }
    }
}

/** Update logout data state */
export const updateLogoutState = () => {
    return (dispatch, getState) => {
        try {
            dispatch({
                type: LOG_OUT,
                payload: {}
            })
        } catch (error) {
            Utils.log("Update Login State ===> error ", error);
        }
    }
}