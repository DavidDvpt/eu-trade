import { store } from '../app/store';
import { AxiosPublicInstance } from './AxiosPublicService';

const requestInterseptor = (config) => {
    try {
        const { token } = store.getState().auth;
        config.headers.common.Authorization = 'Bearer ' + token;
        return config;
    } catch (error) {
        console.log(error);
    }
};

export function AxiosPrivateInstance() {
    const request = AxiosPublicInstance();

    request.interceptors.request.use(requestInterseptor);

    return request;
}
