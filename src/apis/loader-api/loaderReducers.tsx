import ActionTypes from "./loader.actionTypes";

const initialState = {
    isLoading: false,
    counter: 0
};

export const loaderReducer = (state = initialState, action: any) => {
    const { type } = action;
    let newState;
    let counter;
    switch (type) {
        case ActionTypes.SHOW_LOADER:
            counter = state.counter + 1;
            newState = { ...state, isLoading: counter > 0, counter }
            break;
        case ActionTypes.HIDE_LOADER:
            counter = state.counter - 1;
            newState = { ...state, isLoading: counter > 0, counter }
            break;
        default:
            newState = state;
    }
    return newState;

}
