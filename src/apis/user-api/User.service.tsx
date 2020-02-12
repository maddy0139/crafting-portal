import ServiceBase from "../ServiceClass";

class UserService {
    serviceBase: any;
    constructor(serviceBase = ServiceBase) {
        this.serviceBase = serviceBase;
    }

    loginUserUri = () => {
        return this.serviceBase.getUri('loginUserUri')
    }
    loginUser = (payload:any) => {
        return this.serviceBase.ajax.post(this.loginUserUri(), payload, {});
    }

    loadUserDetailsUri = (userId: string) => {
        return this.serviceBase.getUri('loadUserDetailsUri', { userId });
    }
    loadUserDetails = (userId:string) => {
        return this.serviceBase.ajax.get(this.loadUserDetailsUri(userId), {});
    }

    signupUserUri = () => {
        return this.serviceBase.getUri('signupUserUri');
    }
    
    signupUser = (user:any) => {
        return this.serviceBase.ajax.post(this.signupUserUri(), user);
    }

    checkUsernameUri = () => {
        return this.serviceBase.getUri('checkUsernameAvailabilityUri');
    }
    checkUsername = (config:any) => {
        return this.serviceBase.ajax.get(this.checkUsernameUri(), config);
    }

    checkEmailAvailabilityUri = () => {
        return this.serviceBase.getUri('checkEmailAvailabilityUri');
    }
    checkEmailAvailability = (config:any) => {
        return this.serviceBase.ajax.get(this.checkEmailAvailabilityUri(), config);
    }

}
export default new UserService();
export {
    UserService as ServiceClass,
};