import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';

interface UserState {
    avatar: string | null;
    name?: string | null;
    email?: string | null;
}

const STORAGE_KEY = 'user-avatar';

const loadUserFromStorage = (): UserState => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            return {
                avatar: parsed.avatar ?? null,
                name: null,
                email: null,
            };
        }
    } catch (error) {
        console.warn('Failed to parse avatar from localStorage:', error);
    }
    return { name: null, email: null, avatar: null };
};

const initialState: UserState = loadUserFromStorage();

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<UserState>) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.avatar = action.payload.avatar;
        },
    },
});

export const { setUserData } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export const selectUserName = (state: RootState) => state.user.name;
export const selectUserEmail = (state: RootState) => state.user.email;
export const selectUserAvatar = (state: RootState) => state.user.avatar;
export default userSlice.reducer;
