import {User, Authentication} from '../actionTypes';
import {userService} from '../../api/user';
import {checkGeneralErrors} from '../checkErrors';
import {
  flashErrorMessage, flashSuccessMessage, flashWarningMessage,
} from '../flashMessage';
import {startLoading, stopLoading} from '../LoaderDiv';

export const userListRequest = () => ({
  type: User.GET_LIST_REQUEST,
});

export const getUserList = (payload) => ({
  type: User.GET_LIST,
  payload,
  update: Date.now(),
});

const userInsertRequest = () => ({
  type: User.USER_INSERT_REQUEST,
});

const userInsert = (payload) => ({
  type: User.USER_INSERT,
  payload,
});

const getUserResetRequest = () => ({
  type: User.USER_GET_RESET_REQUEST,
});

export const getUser = (payload) => ({
  type: User.USER_GET,
  payload,
});

export const cleanUser = () => ({
  type: User.CLEAN_USER,
});

const stopRequest = () => ({
  type: User.USER_STOP_REQUEST,
});

const insertNewListPage = (payload, page, perPage) => ({
  type: User.INSERT_NEW_PAGE,
  payload, page, perPage,
  update: Date.now(),
});

export const resetList = () => ({
  type: User.RESET_LIST,
});

export const updateCurrentPage = (page) => ({
  type: User.UPDATE_CURRENT_PAGE,
  page,
});

const updateAuthUser = (payload) => ({
  type: Authentication.UPDATE_AUTH_USER,
  payload,
});

export function getUserListApi() {
  return async function(dispatch) {
    dispatch(userListRequest());
    try {
      const res = await userService.getList();
      dispatch(getUserList(res));
    } catch (e) {
      if (!checkGeneralErrors(dispatch, e)) {
        dispatch(flashWarningMessage('Não foi possivel buscar a lista'));
      }
      dispatch(stopRequest());
    }
  };
}

export function userInsertApi(userData, router) {
  return async function(dispatch) {
    dispatch(userInsertRequest());
    try {
      const res = await userService.insertUser(userData);
      if (res) {
        dispatch(flashSuccessMessage('Usuário adicionado.'));
        dispatch(userInsert(res));
        router.push('/user/list');
      }
      dispatch(stopRequest());
    } catch (e) {
      if (!checkGeneralErrors(dispatch, e)) {
        dispatch(flashWarningMessage('Ocorreram erros ao enviar o formulário.'));
      }
      dispatch(userInsert());
    }
  };
}

export function editUserApi(userData, id) {
  return async function(dispatch) {
    dispatch(userInsertRequest());
    try {
      const res = await userService.editUser(userData, id);
      if (res) {
        dispatch(flashSuccessMessage('Usuário editado.'));
        const user = res;
        user.password = '';
        user.r_password = '';
        dispatch(stopRequest());
        dispatch(getUser(user));
      }
    } catch (e) {
      if (!checkGeneralErrors(dispatch, e)) {
        dispatch(flashWarningMessage('Ocorreram erros ao editar o usuário.'));
      }
      dispatch(stopRequest());
    }
  };
}

export function getUserApi(id, router) {
  return async function(dispatch) {
    dispatch((startLoading()));
    try {
      const res = await userService.getUser(id);
      const user = res;
      user.password = '';
      user.r_password = '';
      dispatch(stopLoading());
      dispatch(getUser(res));
    } catch (e) {
      dispatch(getUserResetRequest());
      if (!checkGeneralErrors(dispatch, e)) {
        dispatch(flashErrorMessage('Ocorreram erros ao edit o usuário.'));
      } else {
        router.push('/user/list');
      }
      dispatch(stopRequest());
      dispatch(stopLoading());
    }
  };
}

export function editUserProfile(userData) {
  return async function(dispatch) {
    dispatch(userInsertRequest());
    try {
      const res = await userService.editUserProfile(userData);
      dispatch(flashSuccessMessage('Perfil editado.'));
      dispatch(updateAuthUser(res));
      dispatch(stopRequest());
    } catch (e) {
      dispatch(getUserResetRequest());
      if (!checkGeneralErrors(dispatch, e)) {
        dispatch(flashErrorMessage(
            'Ocorreram erros ao edit o perfil de usuário.'
        ));
      }
      dispatch(stopRequest());
    }
  };
}

export function getUserPageListApi(page, perPage, toggleLoading) {
  return async function(dispatch) {
    toggleLoading();
    try {
      const res = await userService.getList(page, perPage);
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
