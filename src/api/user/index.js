import api from '../api';
import errorHandling from '../../utils/errorHandling';

const getUserList = async (page=null, perPage=null) => {
  page = page ? '?page='+page : '';
  perPage = perPage ? (page ? '&per_page='+perPage : '?per_page='+perPage) : '';
  try {
    const res = await api.get('/user/all'+page+perPage);
    return res.data;
  } catch (e) {
    throw errorHandling(e);
  }
};

const insertUser = async (user) => {
  try {
    const res = await api.post('/user/create', user);
    return res.data;
  } catch (e) {
    throw errorHandling(e);
  }
};

const editUser = async (user, id) => {
  try {
    const res = await api.patch(`/user/update/${id}`, user);
    return res.data;
  } catch (e) {
    throw errorHandling(e);
  }
};

const getUser = async (id) => {
  try {
    const res = await api.get(`/user/view/${id}`);
    return res.data;
  } catch (e) {
    throw errorHandling(e);
  }
};

const editUserProfile = async (user) => {
  try {
    const res = await api.patch('/user/profile_edit', user);
    return res.data;
  } catch (e) {
    throw errorHandling(e);
  }
};

export const userService = {
  getList: getUserList,
  insertUser: insertUser,
  editUser: editUser,
  getUser: getUser,
  editUserProfile: editUserProfile,
};
