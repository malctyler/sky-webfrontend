import { setCookie, getCookie, removeCookie } from './cookieUtils';

const AUTH_TOKEN_COOKIE = 'auth_token';
const USER_INFO_COOKIE = 'user_info';

export const getAuthToken = () => {
    return getCookie(AUTH_TOKEN_COOKIE);
};

export const setAuthToken = (token: string) => {
    setCookie(AUTH_TOKEN_COOKIE, token);
};

export const removeAuthToken = () => {
    removeCookie(AUTH_TOKEN_COOKIE);
};

export const getUserInfo = () => {
    const userInfo = getCookie(USER_INFO_COOKIE);
    return userInfo ? JSON.parse(userInfo) : null;
};

export const setUserInfo = (userInfo: any) => {
    setCookie(USER_INFO_COOKIE, JSON.stringify(userInfo));
};

export const removeUserInfo = () => {
    removeCookie(USER_INFO_COOKIE);
};

export const getAuthHeaders = () => {
    const token = getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};
