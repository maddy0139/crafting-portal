import ActionTypes from "./NotificationApi.actionTypes";

const initialState = {
    showSuccessMessage: false,
    successMessage: ''
};

export const notificationReducer = (state = initialState, action: any) => {
    const { type, payload } = action;
    let newState;
    switch (type) {
        case ActionTypes.SHOW_SUCCESS_NOTIFICATION:
            newState = { 
                ...state,
                notification: {
                    message: payload.message,
                    type: payload.type,
                    showMessage: true
                }
            };
            break;
        case ActionTypes.HIDE_SUCCESS_NOTIFICATION:
            newState = {
                ...state,
                notification: {}
            }
            break;
        default:
            newState = state;
    }
    return newState;

}
