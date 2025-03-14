import axios from 'axios';
import { hashPassword } from '../entities/utils.ts';


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

type RegistrationData = {
    name: string;
    email: string;
    password: string;
    terms?: boolean;
};

type RegisterResponse = {
    id: string;
    message: string;
};

export const registerUser = async (data: RegistrationData):Promise<RegisterResponse> => {
    if (!data.password) {
        throw new Error('Password is required for registration.');
    }

    try {
        const hashedPassword = await hashPassword(data.password);
        const requestData = { ...data, password: hashedPassword };
        const response = await api.post('/registration', requestData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response?.data || error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
};
