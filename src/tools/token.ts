const set = (token: string): void => {
    if (token) localStorage.setItem('token', token);
};

const get = (): string => {
    return localStorage.getItem('token');
};
const token = { set, get };
export default token;
