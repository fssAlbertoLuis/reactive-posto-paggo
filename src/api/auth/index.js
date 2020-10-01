import api from '../api';
import errorHandling from '../../utils/errorHandling';

const signIn = async (email, password) => {
  try {
    const res = await api.post('/auth', {email: email, password});
    if (res.data && res.data.access_token) {
      api.defaults.headers.common['Authorization'] =
        `${res.data.token_type} ${res.data.access_token}`;
      localStorage.setItem('token', res.data.access_token);
    }
    return res;
  } catch (err) {
    throw errorHandling(err);
  }
};

const getUserData = async () => {
  try {
    const res = await api.get('/user');
    return res.data;
  } catch (err) {
    throw errorHandling(err);
  }
};
const signOut = async () => {
  await api.get('/logout');
  localStorage.removeItem('token');
};

export const authService = {
  signIn, signOut, getUserData,
};
