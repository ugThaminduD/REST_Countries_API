const SESSION_KEY = 'userSession';

export const login = (userData) => {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(userData));
};

export const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
};

export const getSession = () => {
    const session = sessionStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
};

export const getToken = () => {
    const session = getSession();
    return session ? session.token : null;
};

export const isLoggedIn = () => {
    return getSession() !== null;
};
