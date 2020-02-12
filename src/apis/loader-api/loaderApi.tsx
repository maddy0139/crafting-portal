import ActionTypes from './loader.actionTypes';
import Selectors from './loaderApiSelectors';
import BaseApi from '../base-api/BaseApi';

export default class LoaderApi extends BaseApi{

    state:any;
    store:any;
    selectors:Selectors;
    constructor(store:any, sliceName = 'loaderApi'){
        super(store, sliceName);
        this.store = store;
        this.selectors = new Selectors();
    }
    showLoader = () => {
        this.dispatchStoreAction(ActionTypes.SHOW_LOADER, {});
    }

    hideLoader = () => {
        this.dispatchStoreAction(ActionTypes.HIDE_LOADER, {});
    }
    getLoaderCounter = () => {
        return this.selectors.loaderCounterSelector(this.getState());
    }
    isLoading = () => {
        return this.getLoaderCounter() > 0;
    }
    loadWithLoader = (asyncMethod: any, ...args:any) => {
        this.showLoader();
        const promise = new Promise((resolve, reject) => {
            const asyncMethodPromise = asyncMethod(...args);
            asyncMethodPromise.then((response: any) => {
                this.hideLoader();
                resolve(response);
            }).catch((error: any) => {
                this.hideLoader();
                reject(error);
            });
        });
        return promise;
    }
}