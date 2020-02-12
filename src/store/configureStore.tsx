import { createStore, compose, applyMiddleware } from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from '../reducers/rootReducers';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'categoryApi',
    storage
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const logger = createLogger({
    collapsed:true
});
declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const Store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunkMiddleware,promiseMiddleware,logger)
    ),
    
);
export const persistor = persistStore(Store);
export default Store;
