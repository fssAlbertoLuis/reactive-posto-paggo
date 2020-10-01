import {Company} from '../actionTypes';
import {checkGeneralErrors} from '../checkErrors';
import {flashWarningMessage, flashSuccessMessage} from '../flashMessage';
import {companyService} from '../../api/company';
import {startLoading, stopLoading} from '../LoaderDiv';

const setList = (payload) => ({
  type: Company.SET_LIST,
  payload, update: Date.now(),
});

const insertCompanyRequest = () => ({
  type: Company.INSERT_REQUEST,
});

const insertCompany = (payload) => ({
  type: Company.INSERT,
  payload,
});

const stopCompanyRequest = () => ({
  type: Company.STOP_REQUEST,
});

export function insertCompanyApi(company, router) {
  return async function(dispatch) {
    dispatch(insertCompanyRequest());
    try {
      const res = await companyService.insertCompany(company);
      dispatch(insertCompany(res));
      dispatch(flashSuccessMessage('Empresa criada.'));
      router.push(`/company/view/${res.id}`);
    } catch (e) {
      if (!checkGeneralErrors(dispatch, e)) {
        dispatch(flashWarningMessage(
            'Existem informações inválidas, verifique o formulário'
        ));
      }
      return dispatch(stopCompanyRequest());
    }
  };
}

export function getCompanyApi(id) {
  return async function(dispatch) {
    dispatch(startLoading());
    try {
      const res = await companyService.getCompany(id);
      dispatch(stopLoading());
      dispatch(insertCompany(res));
    } catch (e) {
      if (!checkGeneralErrors(dispatch, e)) {
        dispatch(flashWarningMessage(
            'Erro ao buscar empresa'
        ));
      }
      return dispatch(stopLoading());
    }
  };
}

export function getCompanyListApi(setLoading) {
  return async function(dispatch) {
    setLoading();
    try {
      const res = await companyService.getCompanyList();
      dispatch(setList(res));
      setLoading();
    } catch (e) {
      if (!checkGeneralErrors(dispatch, e)) {
        dispatch(flashWarningMessage('Não foi possível buscar lista'));
      }
      setLoading();
    }
  };
}
