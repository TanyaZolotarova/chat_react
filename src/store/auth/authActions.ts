import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { loginService } from './authService';


type LoginData = {
    email: string;
    password: string;
};

type LoginError = {
    message: string;
};

type LoginResponse = {
    authToken: string;
    refreshToken: string;
};

export const loginUser = createAsyncThunk<LoginResponse, LoginData, { rejectValue: LoginError; }>(
    'auth/loginUser',
    async (data: LoginData, { rejectWithValue }) => {

        try {
            return await loginService(data);
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                return rejectWithValue(error.response.data as LoginError);
            }
            return rejectWithValue({ message: 'Unexpected error' });
        }

    }
);
