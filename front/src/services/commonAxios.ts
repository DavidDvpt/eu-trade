import { store } from '../app/store';
import { injectStore } from './axiosInterceptors';

injectStore(store);
