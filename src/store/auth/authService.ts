import axios from 'axios';
import { hashString } from '../../components/Utils';


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

type LoginData = {
    email: string;
    password: string;
};

type LoginResponse = {
    authToken: string;
    refreshToken: string;
};

export const loginService = async (data: LoginData): Promise<LoginResponse> => {
    const hashedPassword = await hashString(data.password);
    const requestData = { ...data, password: hashedPassword };

    const response = await api.post('/login', requestData);
    return response.data;
};
