import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { LoginData, LoginResponse, loginUser } from '../../components/AuthApi';

interface LoginError {
    message: string;
}

export const authenticateUser = createAsyncThunk<LoginResponse, LoginData, { rejectValue: LoginError; }>(
    'auth/loginUser',
    async (data: LoginData, { rejectWithValue }) => {
        try {
            return await loginUser(data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message || 'Unexpected error');
            }
            return rejectWithValue({ message: 'Unexpected error' });
        }
    }
);
