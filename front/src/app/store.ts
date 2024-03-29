import { configureStore } from '@reduxjs/toolkit';

import accountReducer from '../features/account/accountSlice';
import { appApi } from '../features/appApi';
import authReducer from '../features/auth/authSlice';
import manageReducer from '../features/manage/manageSlice';
import modalsReducer from '../features/modals/modalSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        modals: modalsReducer,
        manage: manageReducer,
        account: accountReducer,
        [appApi.reducerPath]: appApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(appApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
//setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
