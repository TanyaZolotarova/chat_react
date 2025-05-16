import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../entities/auth/authSlice.ts';
import userReducer from '../entities/user/userSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
