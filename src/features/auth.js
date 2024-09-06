import Cookies from 'js-cookie';

export const setAuthTokenInCookie = (token) => {
  Cookies.set('authToken', token, { expires: 7, secure: true, sameSite: 'strict' }); // Secure cookie with appropriate settings
};

export const getAuthTokenFromCookie = () => {
  return Cookies.get('authToken');
};

export const removeAuthTokenFromCookie = () => {
  Cookies.remove('authToken');
};


export const setAuthUserInCookie = ( user) => {
 Cookies.set('userData', JSON.stringify(user), { expires: 30, secure: true, sameSite: 'strict' });
};

export const getAuthUserFromCookie = () => {
  return Cookies.get('userData');
};

export const removeAuthUserFromCookie = () => {
  Cookies.remove('userData');
};


