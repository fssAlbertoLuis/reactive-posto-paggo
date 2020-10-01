import api from '../api';
import errorHandling from '../../utils/errorHandling';

const getList = async () => {
  try {
    const res = await api.get('/company/fuel_list');
    return res.data;
  } catch (e) {
    throw errorHandling(e);
  }
};

const create = async (fuel) => {
  try {
    const res = await api.post('/company/create_fuel', fuel);
    return res.data;
  } catch (e) {
    throw errorHandling(e);
  }
};

const edit = async (fuel) => {
  try {
    const res = await api.patch(`/company/update_fuel/${fuel.id}`, fuel);
    return res.data;
  } catch (e) {
    throw errorHandling(e);
  }
};

const del = async (id) => {
  try {
    const res = await api.delete('/company/delete_fuel/'+id);
    return res.data;
  } catch (e) {
    throw errorHandling(e);
  }
};

export const fuelService = {
  getList, create, edit, del,
};
