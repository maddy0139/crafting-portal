import BaseApi from "../base-api/BaseApi";
import Selectors from './NotificationApi.Selectors';
import ActionTypes from "./NotificationApi.actionTypes";

export default class NotificationApi extends BaseApi {
    selectors:Selectors;
    constructor(store:any, sliceName = 'notificationApi') {
        super(store, sliceName);
        this.selectors = new Selectors();
    }

    setSuccessNotificationMessage = (message:any) => {
        this.dispatchStoreAction(ActionTypes.SHOW_SUCCESS_NOTIFICATION, message);
    }

    getSuccessMessage = () => {
        return this.selectors.getSuccessMessageSelector(this.getState());
    }

    hideSuccessNotification = () => {
        return this.dispatchStoreAction(ActionTypes.HIDE_SUCCESS_NOTIFICATION, {});
    }

}