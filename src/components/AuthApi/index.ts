import axios from 'axios';
import { hashString } from '../Utils';


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

interface RegistrationData {
    name: string;
    email: string;
    password: string;
}

interface RegisterResponse {
    id: string;
    message: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface LoginResponse {
    authToken: string;
    refreshToken: string;
}

export const registerUser = async (data: RegistrationData):Promise<RegisterResponse> => {

    try {
        const hashedPassword = await hashString(data.password);
        const requestData = { ...data, password: hashedPassword };
        const response = await api.post('/registration', requestData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response?.data || error.message);
        } else {
            console.error('Unexpected error occurred during registration:', error);
        }
        throw error;
    }

};

export const loginUser  = async (data: LoginData): Promise<LoginResponse> => {
    const hashedPassword = await hashString(data.password);
    const requestData = { ...data, password: hashedPassword };

    const response = await api.post('/login', requestData);
    return response.data;
};
