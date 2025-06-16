import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../entities/auth/authSlice';
import userReducer from '../entities/user/userSlice';

const STORAGE_KEY = 'app-state';

const preloadedState = ((): {auth: AuthState, user: UserState} | undefined => {
    try {
        const localData = localStorage.getItem(STORAGE_KEY);
        return localData ? JSON.parse(localData) : undefined;
    } catch (e) {
        console.warn('Error parsing localStorage:', e);
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
        const state = store.getState();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
        console.warn('Error saving to localStorage:', e);
    }
});
