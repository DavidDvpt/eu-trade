import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export function AxiosPublicInstance() {
    const request = axios.create({ baseURL: API_URL });

    return request;
}
