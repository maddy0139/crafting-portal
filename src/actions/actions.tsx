import { createAction } from 'redux-actions';
import { SET_SELECTED_CATEGORY_ID, GET_CATEGORIES, SET_CATEGORIES } from './actionTypes';

export const setSelectedCategoryId = (action: any) => {
  return {
    type: SET_SELECTED_CATEGORY_ID,
    ...action
  };
};
export const setCategories = (action: any) => {
  return {
    type: SET_CATEGORIES,
    ...action
  };
};

export const getCategories = (action: any) => {
  return {
    type: GET_CATEGORIES,
    ...action
  };
};