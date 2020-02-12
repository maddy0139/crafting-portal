import Selectors from "./UserSelectors";
import BaseApi from "../base-api/BaseApi";
import ActionTypes from './UserActionTypes';
import DefaulterviceBase from '../ServiceClass';
import UserServiceClass from "./User.service";
import _bindAll from 'lodash/bindAll';

export default class UserApi extends BaseApi {
    sliceName: string;
    selectors: any;
    ServiceBase:any;

    constructor(store: any, sliceName = 'userApi', ServiceBase  = DefaulterviceBase) {
        super(store, sliceName);
        this.sliceName = sliceName;
        this.selectors = new Selectors();
        this.ServiceBase = ServiceBase;
        this.loginUser = this.loginUser.bind(this);
        _bindAll(this, ['loginUser', 'loadUserDetails', 'signup', 'checkEmailAvailability', 'checkUsernameAvailability']);
    }
    async loginUser(payload = {}) {
        return this.serviceRequest(
            UserServiceClass.loginUser,
            payload,
            ActionTypes.LOGIN_USER,
            res => {
                return res.data;
            }, 
            error => {
                return error;
            });
    }
    async loadUserDetails(userId:string){
        await this.serviceRequest(
            UserServiceClass.loadUserDetails,
            userId,
            ActionTypes.LOAD_USER_DETAILS
        );
    }

    async signup(user:any){
        return await this.serviceRequest(
            UserServiceClass.signupUser,
            user,
            ActionTypes.SIGNUP_USER
        );
    }

    async checkUsernameAvailability(userName:string){
        const config = {
            params: {
                userName
            }
        }
        return await this.serviceRequest(
            UserServiceClass.checkUsername,
            config,
            ActionTypes.CHECK_USER_NAME,
            res => {
                return res.data;
            }, error => {
                return error;
            }
        );
    }

    async checkEmailAvailability(email:string){
        const config = {
            params: {
                email
            }
        }
        return await this.serviceRequest(
            UserServiceClass.checkEmailAvailability,
            config,
            ActionTypes.CHECK_USER_EMAIL,
            res => {
                return res.data;
            }, error => {
                return error;
            }
        );
    }

    logout(){
        this.dispatchStoreAction(ActionTypes.LOGOUT_USER,{});
    }

    getUserDetails = () => {
        return this.selectors.getUserDetailsSelector(this.getState());
    }
}