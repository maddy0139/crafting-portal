import ActionTypes from './SubCategoryActionTypes';

const initialState = {
    subCategories: []
};
export const subCategoryReducer = (state = initialState, action: any) => {
    const { type, payload } = action;
    let newState;

    switch (type) {
        case ActionTypes.SET_SELECTED_SUB_CATEGORY_ID:
            newState = { ...state, selectedSubCategoryId: payload }
            break;
        case `${ActionTypes.LOAD_SUB_CATEGORIES}_SUCCESS`:
            newState = {
                ...state,
                subCategories: payload && payload.subCategories
            }
            break;
        case `${ActionTypes.GET_SUB_CATEGORIES}_SUCCESS`:
            newState = state.subCategories
            break;
        case `${ActionTypes.LOAD_SUB_CATEGORY_DETAILS}_SUCCESS`:
            newState = {
                ...state,
                subCategoryDetails: payload && payload.subCategory
            };
            break;
        case `${ActionTypes.ADD_SUB_CATEGORY}_SUCCESS`:
        case `${ActionTypes.DELETE_SUB_CATEGORY}_SUCCESS`:
        case `${ActionTypes.EDIT_SUB_CATEGORY}_SUCCESS`:
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
