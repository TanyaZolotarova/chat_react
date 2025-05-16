import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';

interface UserState {
    name: string;
    email: string;
    avatar: string;
}

const STORAGE_KEY = 'user';

const loadUserFromStorage = (): UserState => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch {
            return { name: 'User', email: 'Not available', avatar: '' };
        }
    }
    return { name: 'User', email: 'Not available', avatar: '' };
};

const saveUserToStorage = (user: UserState) => {
    const { name, email } = user;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ name, email }));
};

const clearUserStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
};

const initialState: UserState = loadUserFromStorage();
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<UserState>) => {
            const { name, email, avatar } = action.payload;
            state.name = name;
            state.email = email;
            state.avatar = avatar;
            saveUserToStorage(state);
        },
        logoutUser: (state) => {
            state.name = 'User';
            state.email = 'Not available';
            state.avatar = '';
            clearUserStorage();
        },
    },
});

export const { setUserData, logoutUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export const selectUserName = (state: RootState) => state.user.name;
export const selectUserEmail = (state: RootState) => state.user.email;
export const selectUserAvatar = (state: RootState) => state.user.avatar;
export default userSlice.reducer;
