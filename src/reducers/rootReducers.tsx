import { combineReducers } from 'redux';
import { categoryReducer } from '../apis/category-api/CategoryReducer';
import { loaderReducer } from "../apis/loader-api/loaderReducers";
import { userReducer } from '../apis/user-api/UserReducer';
import { notificationReducer } from '../apis/notification-api/NotificationApi.reducer';
import {subCategoryReducer} from '../apis/sub-category-api/SubCategoryReducer';

const rootReducer = combineReducers({
    categoryApi: categoryReducer,
    loaderApi: loaderReducer,
    userApi: userReducer,
    notificationApi: notificationReducer,
    subCategoryApi: subCategoryReducer
})

export default rootReducer;