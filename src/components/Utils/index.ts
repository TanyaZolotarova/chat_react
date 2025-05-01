import md5 from 'blueimp-md5';

export const hashString = async (password: string): Promise<string> => {
    return md5(password);
};

export const getIdGenerator = () => {
    let idCounter = 0;
    return () => ++idCounter;
};
