import { AxiosRequestConfig } from 'axios';

let store;

export const injectStore = (_store) => {
    console.log(store);
    store = _store;
};

export const insertTokenRequestInterceptor = (
    config: AxiosRequestConfig<any>,
) => {
    const header = {
        authorization: 'bearer ' + store.getState().auth.token,
    };

    config.headers
        ? (config.headers.authorization =
              'bearer ' + store.getState().auth.token)
        : (config.headers = header);

    return config;
};

// export const requestInterceptor = (request: AxiosInstance) => {
//     return request.interceptors.request.use((config) => {
//         const header = {
//             authorization: 'bearer ' + store.getState().auth.token,
//         };

//         config.headers
//             ? (config.headers.authorization =
//                   'bearer ' + store.getState().auth.token)
//             : (config.headers = header);
//         return config;
//     });
// };
