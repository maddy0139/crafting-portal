import { combineReducers } from 'redux';
import { categoryReducer } from '../apis/category-api/CategoryReducer';
import { loaderReducer } from "../apis/loader-api/loaderReducers";
import { userReducer } from '../apis/user-api/UserReducer';
import { notificationReducer } from '../apis/notification-api/NotificationApi.reducer';

const rootReducer = combineReducers({
    categoryApi: categoryReducer,
    loaderApi: loaderReducer,
    userApi: userReducer,
    notificationApi: notificationReducer
})

export default rootReducer;