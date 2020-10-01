import api from '../api';
import errorHandling from '../../utils/errorHandling';

const insertCompany = async (company) => {
  try {
    const res = await api.post('/company/create', company);
    return res.data;
  } catch (e) {
    throw errorHandling(e);
  }
};

const getCompany = async (id) => {
  try {
    const res = await api.get(`/company/view/${id}`);
    return res.data;
  } catch (e) {
    throw errorHandling(3);
  }
};

const getCompanyList = async () => {
  try {
    const res = await api.get('/company/all');
    return res.data;
  } catch (e) {
    throw errorHandling(e);
  }
};

const statistics = async () => {
  try {
    const res = await api.get('/company/statistics');
    return res.data;
  } catch (e) {
    throw errorHandling(e);
  }
};

export const companyService = {
  insertCompany, getCompany, getCompanyList, statistics,
};
