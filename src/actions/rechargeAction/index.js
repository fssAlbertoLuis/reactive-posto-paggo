import {rechargeService} from '../../api/recharge';
import {
  flashSuccessMessage,
  flashErrorMessage,
  flashWarningMessage,
} from '../flashMessage';
import {checkGeneralErrors} from '../checkErrors';
import {Recharge} from '../actionTypes';
import {addEarnings} from '../dashboardAction';

export const setListPerPage = (payload) => ({
  type: Recharge.CHANGE_PER_PAGE,
  payload,
});

const setList = (payload) => ({
  type: Recharge.SET_LIST,
  payload, update: Date.now(),
});

const insert = (payload) => ({
  type: Recharge.INSERT,
  payload,
});

const insertNewListPage = (payload, page, perPage) => ({
  type: Recharge.INSERT_NEW_PAGE,
  payload, page, perPage,
  update: Date.now(),
});

export const resetList = () => ({
  type: Recharge.RESET_LIST,
});

export const updateCurrentPage = (page) => ({
  type: Recharge.UPDATE_CURRENT_PAGE,
  page,
});

export function getRechargeListApi(toggleLoading) {
  return async function(dispatch) {
    toggleLoading();
    try {
      const res = await rechargeService.rechargeList();
      dispatch(setList(res));
      toggleLoading();
    } catch (e) {
      if (!checkGeneralErrors(dispatch, e)) {
        dispatch(flashWarningMessage('Não foi possivel buscar lista'));
      }
      toggleLoading();
    }
  };
}
export function rechargeCustomerApi(rechargeInfo, toggleLoading, resetForm) {
  return async function(dispatch) {
    toggleLoading();
    try {
      const res = await rechargeService.rechargeCustomer(rechargeInfo);
      dispatch(flashSuccessMessage('Recarga realizada com sucesso'));
      dispatch(insert(res));
      dispatch(addEarnings(res.amount));
      resetForm();
    } catch (e) {
      if (!checkGeneralErrors(dispatch, e)) {
        dispatch(
            flashErrorMessage(
                'Não foi possível realizar a recarga, cheque todas as informações'
            )
        );
      }
      toggleLoading();
      resetForm();
    }
  };
}

export function getRechargePageListApi(page, perPage, toggleLoading) {
  return async function(dispatch) {
    toggleLoading();
    try {
      const res = await rechargeService.rechargeList(page, perPage);
      dispatch(insertNewListPage(res, page, perPage));
      toggleLoading();
    } catch (e) {
      if (!checkGeneralErrors(dispatch, e)) {
        dispatch(flashErrorMessage('Não foi possível carregar lista'));
      }
      toggleLoading();
    }
  };
}
