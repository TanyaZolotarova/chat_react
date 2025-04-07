import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { submitLogin } from '../../components/AuthApi';

interface LoginData {
    email: string;
    password: string;
}

interface LoginError {
    message: string;
}

interface LoginResponse {
    authToken: string;
    refreshToken: string;
}

export const loginUser = createAsyncThunk<LoginResponse, LoginData, { rejectValue: LoginError; }>(
    'auth/loginUser',
    async (data: LoginData, { rejectWithValue }) => {
        try {
            return await submitLogin(data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message;
                return rejectWithValue(message || 'Unexpected error');
            }
            return rejectWithValue({ message: 'Unexpected error' });
        }
    }
);
