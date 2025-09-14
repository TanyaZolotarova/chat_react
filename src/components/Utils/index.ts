import md5 from 'blueimp-md5';

export const hashString = async (password: string): Promise<string> => {
    return md5(password);
};

export const getIdGenerator = () => {
    let idCounter = 0;
    return () => ++idCounter;
};

export const generateEmailId = (email: string): number => {
    let emailHash = 0;
    for (let i = 0; i < email.length; i++) {
        emailHash = email.charCodeAt(i) + ((emailHash << 5) - emailHash);
    }
    return Math.abs(emailHash % 10000);
};
