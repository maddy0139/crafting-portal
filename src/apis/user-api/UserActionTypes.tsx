import {createActionTypes} from '../../utils/reduxUtils';

const ActionTypes = createActionTypes([
    'LOGIN_USER',
    'LOAD_USER_DETAILS',
    'LOGOUT_USER',
    'SIGNUP_USER',
    'CHECK_USER_NAME',
    'CHECK_USER_EMAIL',

]);

export default ActionTypes;
