import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authenticateUser } from './authThunks.ts';

interface AuthState {
    authToken: string | null;
    refreshToken: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    authToken: null,
    refreshToken: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setTokens: (
            state,
            action: PayloadAction<{ authToken: string; refreshToken: string }>
        ) => {
            state.authToken = action.payload.authToken;
            state.refreshToken = action.payload.refreshToken;
        },
        logout: (state) => {
            state.authToken = null;
            state.refreshToken = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authenticateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(authenticateUser.fulfilled, (state, action: PayloadAction<{ authToken: string; refreshToken: string }>) => {
                state.loading = false;
                state.authToken = action.payload.authToken;
                state.refreshToken = action.payload.refreshToken;
            })
            .addCase(authenticateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'An unexpected error occurred';
            });
    },
});

export const { logout, setTokens} = authSlice.actions;
export const selectAuthToken = (state: { auth: AuthState }) => state.auth.authToken;
export const selectRefreshToken = (state: { auth: AuthState }) => state.auth.refreshToken;
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.loading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
export const selectIsAuthenticated = (state: { auth: AuthState }) => !!state.auth.authToken;
export default authSlice.reducer;
