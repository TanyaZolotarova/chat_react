import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser } from './authActions';


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
        logout: (state) => {
            state.authToken = null;
            state.refreshToken = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ authToken: string; refreshToken: string }>) => {
                state.loading = false;
                state.authToken = action.payload.authToken;
                state.refreshToken = action.payload.refreshToken;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'An unexpected error occurred';
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
