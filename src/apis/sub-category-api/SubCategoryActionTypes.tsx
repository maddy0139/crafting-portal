import {createActionTypes} from '../../utils/reduxUtils';

const ActionTypes = createActionTypes([
    'SET_SUB_CATEGORIES',
    'GET_SUB_CATEGORIES',
    'SET_SELECTED_SUB_CATEGORY_ID',
    'LOAD_SUB_CATEGORIES',
    'LOAD_SUB_CATEGORY_DETAILS',
    'ADD_SUB_CATEGORY',
    'DELETE_SUB_CATEGORY',
    'EDIT_SUB_CATEGORY'
]);

export default ActionTypes;
