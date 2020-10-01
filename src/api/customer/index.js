import api from '../api';
import errorHandling from '../../utils/errorHandling';

const searchCustomer = async (search) => {
  try {
    const res = await api.get(`/customer/search/${search}`);
    return res.data;
  } catch (e) {
    throw errorHandling(e);
  }
};

export const customerService = {
  search: searchCustomer,
};
