import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// const requestInterseptor = (config) => {
//     if (store) {
//         const { token } = store.getState().auth;
//         try {
//             config.headers.common.Authorization = 'Bearer ' + token;
//             return config;
//         } catch (error) {
//             console.log(error);
//         }
//     }
// };

export function AxiosPublicInstance() {
    const request = axios.create({ baseURL: API_URL });

    return request;
}
