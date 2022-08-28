import axios from 'axios';

import { insertTokenRequestInterceptor } from './axiosInterceptors';

const API_URL = import.meta.env.VITE_API_URL;

export function AxiosPublicInstance() {
    const request = axios.create({ baseURL: API_URL });

    return request;
}

export function AxiosPrivateInstance() {
    const request = AxiosPublicInstance();
    request.interceptors.request.use(insertTokenRequestInterceptor);
    return request;
}
