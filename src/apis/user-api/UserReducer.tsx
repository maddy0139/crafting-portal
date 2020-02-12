import ActionTypes from './UserActionTypes';

const initialState = {
    userInformation: {}
};
export const userReducer = (state = initialState, action: any) => {
    const { type, payload } = action;
    let newState;

    switch (type) {
        case `${ActionTypes.LOAD_USER_DETAILS}_SUCCESS`:
            newState = { ...state, userInformation: payload }
            break;
        case `${ActionTypes.LOGIN_USER}_SUCCESS`:
            localStorage.setItem('accessToken',payload && payload.accessToken);
            newState = state;
            break;
        case `${ActionTypes.LOGIN_USER}_FAILURE`:
            newState = state;
            break;
        case ActionTypes.LOGOUT_USER:
            localStorage.setItem('accessToken', '');
            newState = initialState;
            break;
        case ActionTypes.SIGNUP_USER: 
            newState = state;
            break;
        default:
            newState = state;
            break;
    }
    return newState;
}
