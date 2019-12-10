import { combineReducers } from 'redux'
import Login from './login/Reducer'
import ForgotPassword from './forget_passsword/Reducer'
import ChangePassword from './change_password/Reducer'
import ResetPassword from './reset_password/Reducer'
import UserData from './user/Reducer'


import { LOGIN_ROOT, CHANGE_PASSWORD_ROOT, RESET_PASSWORD_ROOT, FORGOT_PASSWORD_ROOT, USER_ROOT, SYSTEM_DATA_ROOT, SIDEBAR_ROOT, HEADER_ROOT, FOOTER_ROOT, CATEGORY_ROOT, PRODUCT_ROOT, USERS_ROOT, ORDER_ROOT, REPORT_ROOT, DRIVER_ROOT, SPLASH_ROOT, DISCOUNT_ROOT, SALES_DELIVERYCHARGES_ROOT } from './Types'

export default combineReducers({
    [LOGIN_ROOT]: Login,
    [FORGOT_PASSWORD_ROOT]: ForgotPassword,
    [CHANGE_PASSWORD_ROOT]: ChangePassword,
    [RESET_PASSWORD_ROOT]: ResetPassword,
    [USER_ROOT]: UserData,
    
})