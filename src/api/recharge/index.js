import api from '../api';
import errorHandling from '../../utils/errorHandling';

const rechargeCustomer = async (rechargeInfo) => {
  try {
    const res = await api.post('/user/recharge_customer', rechargeInfo);
    return res.data;
  } catch (e) {
    throw errorHandling(e);
  }
};

const rechargeList = async (page=null, perPage=null) => {
  page = page ? '?page='+page : '';
  perPage = perPage ? (page ? '&per_page='+perPage : '?per_page='+perPage) : '';
  try {
    const res = await api.get('/company/recharge_list'+page+perPage);
    return res.data;
  } catch (e) {
    throw errorHandling(e);
  }
};

export const rechargeService = {
  rechargeCustomer, rechargeList,
};
