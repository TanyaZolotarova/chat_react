export const saveUserInfoToStorage = (name: string, email: string, avatar: string = '') => {
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('avatar', avatar);
};

export const clearUserStorage = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('avatar');
};
