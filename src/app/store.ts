import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../entities/auth/authSlice.ts';
import userReducer from '../entities/user/userSlice';

const STORAGE_KEY = 'app-state';

const preloadedState = (() => {
    try {
        const localData = localStorage.getItem(STORAGE_KEY);
        if (!localData) return undefined;

        const parsed = JSON.parse(localData);
        return {
            auth: parsed.auth,
            user: parsed.user,
        };
    } catch (e) {
        console.warn('Error parsing localStorage:', e);
        return undefined;
    }
})();

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
    },
    preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
    try {
        const { auth, user } = store.getState();
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ auth, user }));
    } catch (e) {
        console.warn('Error saving to localStorage:', e);
    }
});
