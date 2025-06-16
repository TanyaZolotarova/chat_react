import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    avatar: string | null;
    name: string | null;
    email: string | null;
}

const initialState: UserState = {
    name: null,
    email: null,
    avatar: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<UserState>) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.avatar = action.payload.avatar;
        },
        clearUserData: (state) => {
            state.name = null;
            state.email = null;
            state.avatar = null;
        }
    },
});

export const { setUserData, clearUserData } = userSlice.actions;
export const selectUser = (state: {user: UserState}) => state.user;
export const selectUserName = (state: {user: UserState}) => state.user.name;
export const selectUserEmail = (state: {user: UserState}) => state.user.email;
export const selectUserAvatar = (state: {user: UserState}) => state.user.avatar;
export default userSlice.reducer;
