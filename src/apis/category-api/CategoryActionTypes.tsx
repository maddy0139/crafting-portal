import {createActionTypes} from '../../utils/reduxUtils';

const ActionTypes = createActionTypes([
    'SET_CATEGORIES',
    'GET_CATEGORIES',
    'SET_SELECTED_CATEGORY_ID',
    'LOAD_CATEGORIES',
    'LOAD_CATEGORY_DETAILS',
    'ADD_CATEGORY',
    'DELETE_CATEGORY',
    'EDIT_CATEGORY'
]);

export default ActionTypes;
