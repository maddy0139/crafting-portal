import ActionTypes from './CategoryActionTypes';

const initialState = {
    categories: []
};
export const categoryReducer = (state = initialState, action: any) => {
    const { type, payload } = action;
    let newState;

    switch (type) {
        case ActionTypes.SET_SELECTED_CATEGORY_ID:
            newState = { ...state, selectedCategoryId: payload }
            break;
        case `${ActionTypes.LOAD_CATEGORIES}_SUCCESS`:
            newState = {
                ...state,
                categories: payload && payload.categories
            }
            break;
        case `${ActionTypes.GET_CATEGORIES}_SUCCESS`:
            newState = state.categories
            break;
        case `${ActionTypes.LOAD_CATEGORY_DETAILS}_SUCCESS`:
            newState = {
                ...state,
                categoryDetails: payload && payload.category
            };
            break;
        case `${ActionTypes.ADD_CATEGORY}_SUCCESS`:
        case `${ActionTypes.DELETE_CATEGORY}_SUCCESS`:
        case `${ActionTypes.EDIT_CATEGORY}_SUCCESS`:
            newState = {
                ...state
            }
            break;
        default:
            newState = state;
            break;
    }
    return newState;
}
