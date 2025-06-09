import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../entities/auth/authSlice.ts';
import userReducer from '../entities/user/userSlice';

const AUTH_STORAGE_KEY = 'auth-data';
const USER_STORAGE_KEY = 'user-data';

const loadInitialState = () => {
    let preloadedAuth = {
        authToken: null,
        refreshToken: null,
        loading: false,
        error: null,
    };

    let preloadedUser = {
        name: null,
        email: null,
        avatar: null,
    };

    try {
        const authRaw = localStorage.getItem(AUTH_STORAGE_KEY);
        if (authRaw) {
            const parsed = JSON.parse(authRaw);
            preloadedAuth = { ...preloadedAuth, ...parsed };
        }

        const userRaw = localStorage.getItem(USER_STORAGE_KEY);
        if (userRaw) {
            const parsed = JSON.parse(userRaw);
            preloadedUser = { ...preloadedUser, ...parsed };
        }
    } catch (e) {
        console.warn('Error loading from localStorage:', e);
    }

    return {
        auth: preloadedAuth,
        user: preloadedUser,
    };
};

const preloadedState = loadInitialState();

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
    },
    preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

let prevAuth: string | null = null;
let prevUser: string | null = null;

store.subscribe(() => {
    const state = store.getState();

    const authSerialized = JSON.stringify({
        authToken: state.auth.authToken,
        refreshToken: state.auth.refreshToken,
    });

    const userSerialized = JSON.stringify(state.user);

    if (authSerialized !== prevAuth) {
        if (state.auth.authToken || state.auth.refreshToken) {
            localStorage.setItem(AUTH_STORAGE_KEY, authSerialized);
        } else {
            localStorage.removeItem(AUTH_STORAGE_KEY);
        }
        prevAuth = authSerialized;
    }

    if (userSerialized !== prevUser) {
        if (state.user.name || state.user.email || state.user.avatar) {
            localStorage.setItem(USER_STORAGE_KEY, userSerialized);
        } else {
            localStorage.removeItem(USER_STORAGE_KEY);
        }
        prevUser = userSerialized;
    }
});
