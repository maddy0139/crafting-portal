import axios from 'axios';
import defaultUris from './common/DefaultUris.json';
import _ from 'lodash';
import envConfig from '../config/common.config'

class ServiceClass {
    constructor(config){
        this.getMethod = this.getMethod.bind(this);
        this.postMethod = this.postMethod.bind(this);
        this.deleteMethod = this.deleteMethod.bind(this);
        this.getAuthorizationToken = this.getAuthorizationToken.bind(this);
        this.loadConfiguration = this.loadConfiguration.bind(this);
        this.updateAxiosHeader = this.updateAxiosHeader.bind(this);
        this.defaultUris = defaultUris;
        this.loadConfiguration(config);
    }

    getUri(methodName, ...pathParams) {
        let uri = this.defaultUris[methodName];
        const compiled = _.template(uri);
        uri = compiled(...pathParams);
        return uri;
    }
    
    loadConfiguration(config) {
        this.request = axios.create({
            baseURL: envConfig.BASE_URL,
            params: {
            },
            headers: {
                'Accept-Language': 'en-US',
                'Content-Type': 'application/json'
            }
        });
        this.axiosInteceptor(this.request);
    }

    static get normalize() {
        return (response) => {
            return response;
        };
    }

    static get errorNormalize() {
        return (error) => {
            let errorData = {};
            if (error) {
                errorData = {
                    errorCode: (error.response && error.response.status) || 503,
                    errorMessage: error.message,
                };
            }
            return Promise.reject(errorData);
        }
    }

    get ajax() {
        return {
            get: this.getMethod,
            post: this.postMethod,
            delete: this.deleteMethod
        };
    }

    getMethod(url, config, normalize = ServiceClass.normalize, errorNormalize = ServiceClass.errorNormalize) {
        return this.request.get(url, config).then((response) => {
            return normalize(response);
        }).catch((error) => {
            return errorNormalize(error);
        });
    }

    postMethod(url, config, normalize = ServiceClass.normalize, errorNormalize = ServiceClass.errorNormalize) {
        if (config && config.headers) {
            this.updateAxiosHeader(config.headers);
        }
        return this.request.post(url, config).then((response) => {
            return response;
        }).catch((error) => {
            return errorNormalize(error);
        });
    }

    deleteMethod(url, config, normalize = ServiceClass.normalize, errorNormalize = ServiceClass.errorNormalize) {
        return this.request.delete(url, config).then((response) => {
            return normalize(response);
        }).catch((error) => {
            return errorNormalize(error);
        });
    }

    getAuthorizationToken() {
        return localStorage.getItem('accessToken');
    }

    updateAxiosHeader(headerValue) {
        Object.keys(headerValue).forEach((key) => {
            if (headerValue[key]) {
                axios.defaults.headers.common[key] = headerValue[key];
            }
        });
    }

    axiosInteceptor(axios) {
        axios.interceptors.request.use((innerConfig) => {
            const newConfig = innerConfig;
            const uxfToken = 'Bearer ' + localStorage.getItem('accessToken');
            if(uxfToken){
                newConfig.headers = {...innerConfig.headers, Authorization: uxfToken};
            }
            return newConfig;
        }, error => Promise.reject(error));
        axios.interceptors.response.use((response) => {
            const uxfToken = response.headers && response.headers['authorization'];
            if (uxfToken) {
                localStorage.setItem('accessToken', uxfToken);
            }

            return response;
        }, error => Promise.reject(error));
    }
}
const ServiceBase = new ServiceClass();
export default ServiceBase;
export {
    ServiceClass,
};