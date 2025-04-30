import md5 from 'blueimp-md5';

export const hashString = async (password: string): Promise<string> => {
    return md5(password);
};

let idCounter = 0;
export const generateId = () => ++idCounter;
