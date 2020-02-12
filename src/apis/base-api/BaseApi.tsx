import { createActionCreator } from '../../utils/reduxUtils';

export default class BaseApi {
    store: any;
    sliceName: string;
    constructor(store: any, sliceName: string) {
        this.store = store;
        this.sliceName = sliceName;
        this.getState = this.getState.bind(this);
    }

    getState() {
        let state = this.store.getState();
        if (this.sliceName) {
            return state[this.sliceName];
        }
    }

    dispatchStoreAction = (type: any, payload: any) => {
        const action = createActionCreator(type);
        this.store.dispatch(action(payload));
    }

    async serviceRequest (
        serviceMethod: any,
        payload: any,
        actionType: any,
        getSuccessPayload = (res: { data: any; }) => { return res.data; },
        getErrorPayload = (err: any) => { return err; }
    ) {
        const requestType = this.getServiceRequestType(actionType);
        const successType = this.getServiceSuccessType(actionType);
        const failureType = this.getServiceFailureType(actionType);
        this.dispatchStoreAction(requestType,{});

        try {
            const res = await serviceMethod(payload);
            const serviceRequestResponse = await Promise.resolve(getSuccessPayload(res));
            this.dispatchStoreAction(successType, serviceRequestResponse);
            return serviceRequestResponse;
        } catch (err) {
            const serviceRequestErr = await Promise.resolve(getErrorPayload(err));
            // adding handler to skip error handling for specific error code
            this.dispatchStoreAction(failureType, serviceRequestErr);
            throw serviceRequestErr;
        }
    }

    getServiceRequestType(type: any) { return `${type}_REQUEST`; }
    getServiceSuccessType(type: any) { return `${type}_SUCCESS`; }
    getServiceFailureType(type: any) { return `${type}_FAILURE`; }
}