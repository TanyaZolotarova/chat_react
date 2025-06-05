import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../entities/auth/authSlice.ts';
import userReducer from '../entities/user/userSlice';

const STORAGE_KEY = 'user-avatar';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

let prevSerializedAvatar: string | null = null;

store.subscribe(() => {
    const { avatar } = store.getState().user;
    const serialized = JSON.stringify({ avatar });

    if (serialized !== prevSerializedAvatar) {
        localStorage.setItem(STORAGE_KEY, serialized);
        prevSerializedAvatar = serialized;
    }
});
