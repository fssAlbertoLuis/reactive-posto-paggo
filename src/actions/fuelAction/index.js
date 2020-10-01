import {Fuel} from '../actionTypes';
import {fuelService} from '../../api/fuel';
import {flashWarningMessage, flashSuccessMessage} from '../flashMessage';
import {checkGeneralErrors} from '../checkErrors';

const getFuelListRequest = () => ({
  type: Fuel.GET_LIST_REQUEST,
});

const getFuelList = (payload) => ({
  type: Fuel.GET_LIST,
  payload,
});

const createFuelRequest = () => ({
  type: Fuel.CREATE_REQUEST,
});

export const createFuel = (payload) => ({
  type: Fuel.CREATE,
  payload,
});

const editFuel = (payload, index) => ({
  type: Fuel.EDIT,
  payload,
  index,
});

const stopRequest = () => ({
  type: Fuel.STOP_REQUEST,
});

export const deleteFuel = (index) => ({
  type: Fuel.DELETE,
  index,
});

export function getFuelListApi() {
  return async function(dispatch) {
    dispatch(getFuelListRequest());
    try {
      const res = await fuelService.getList();
      dispatch(getFuelList(res));
    } catch (e) {
      if (!checkGeneralErrors(dispatch, e)) {
        dispatch(flashWarningMessage('Ocorreram erros ao editar o usuário.'));
      }
      return dispatch(stopRequest());
    }
    return true;
  };
}
export function createFuelApi(fuel, index) {
  return async function(dispatch) {
    dispatch(createFuelRequest());
    try {
      const res = await fuelService.create(fuel);
      dispatch(flashSuccessMessage('Combustível adicionado.'));
      dispatch(editFuel(fuel, index));
      return res;
    } catch (e) {
      if (!checkGeneralErrors(dispatch, e)) {
        dispatch(flashWarningMessage('Ocorreram erros ao adicionar combustível.'));
      }
      return dispatch(stopRequest());
    }
  };
}

export function editFuelApi(fuel, index) {
  return async function(dispatch) {
    dispatch(createFuelRequest());
    try {
      await fuelService.edit(fuel);
      dispatch(editFuel(fuel, index));
      dispatch(flashSuccessMessage('Combustível editado'));
    } catch (e) {
      if (!checkGeneralErrors(dispatch, e)) {
        dispatch(flashWarningMessage(
            'Ocorreram erros ao editar o combustível.'
        ));
      }
      return dispatch(stopRequest());
    }
  };
}

export function deleteFuelApi(id, index) {
  return async function(dispatch) {
    try {
      await fuelService.del(id);
      dispatch(deleteFuel(index));
      dispatch(flashSuccessMessage('Combustível deletado.'));
    } catch (e) {
      if (!checkGeneralErrors(dispatch, e)) {
        dispatch(flashWarningMessage(
            'Ocorreram erros ao deletar o combustível.'
        ));
      }
      return dispatch(stopRequest());
    }
  };
}
