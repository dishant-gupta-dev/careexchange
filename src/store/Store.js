import { configureStore } from '@reduxjs/toolkit';

import authReducer from "./slices/Auth";
import messageReducer from "./slices/Message";

export const Store = configureStore({
    reducer: {
        auth: authReducer,
        message: messageReducer
    },
});

export default Store;