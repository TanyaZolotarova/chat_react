import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authenticateUser } from './authThunks.ts';
import { clearUserStorage, saveUserInfoToStorage } from '../../components/Utils/storage.ts';

interface AuthState {
    authToken: string | null;
    refreshToken: string | null;
    avatar: string;
    name: string;
    email: string;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    authToken: null,
    refreshToken: null,
   //TODO: delete localStorage when will be update DB
    avatar: localStorage.getItem('avatar') || '',
    name: localStorage.getItem('name') || 'User',
    email: localStorage.getItem('email') || 'Not available',
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
            //TODO: delete it when will be update DB
            state.avatar = '';
            state.name = 'User';
            state.email = 'Not available';
            clearUserStorage();
            state.error = null;
        },
        //TODO: delete localStorage when will be update DB
        setUserData: (state, action) => {
            const { name, email, avatar } = action.payload;
            state.name = name;
            state.email = email;
            state.avatar = avatar;
            saveUserInfoToStorage(name, email, avatar);
        },
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
            localStorage.setItem('name', action.payload);
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
            localStorage.setItem('email', action.payload);
        },
        setAvatar: (state, action: PayloadAction<string>) => {
            state.avatar = action.payload;
            localStorage.setItem('avatar', action.payload);
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

export const { logout, setUserData, setName, setEmail, setAvatar} = authSlice.actions;
export default authSlice.reducer;
