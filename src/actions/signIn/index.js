import {Authentication} from '../actionTypes';
import {authService} from '../../api/auth';
import {
  flashErrorMessage, flashWarningMessage, flashInfoMessage,
} from '../flashMessage';
import {errorTypes} from '../../utils/errorHandling/errorTypes';
import {checkGeneralErrors} from '../checkErrors';
import {popFromQueue, pushToQueue} from '../asyncQueue';

export const signInRequest = () => ({
  type: Authentication.SIGN_IN_REQUEST,
});

export const signIn = () => ({
  type: Authentication.SIGN_IN,
});

export const signInRequestErrors = (payload) => ({
  type: Authentication.SIGN_IN_REQUEST_ERRORS,
  errors: payload,
});

export const stopSigningIn = () => ({
  type: Authentication.SIGN_IN_STOP,
});

export const signOut = () => ({
  type: Authentication.SIGN_OUT,
});

export const getUserData = () => ({
  type: Authentication.GET_USER_DATA,
});

export const setUserData = (payload) => ({
  type: Authentication.SET_USER_DATA,
  payload,
});

export const stopUserData = () => ({
  type: Authentication.STOP_USER_DATA,
});

export function signInApiRequest(email, password) {
  return async function(dispatch) {
    try {
      dispatch(signInRequest());
      const res = await authService.signIn(email, password);
      return dispatch(signIn(res.data));
    } catch (err) {
      if ([
        errorTypes.VALIDATION,
        errorTypes.NOT_FOUND,
        errorTypes.UNAUTHORIZED,
      ].includes(err.type)) {
        dispatch(flashWarningMessage('Login ou senha inválidos'));
      } else {
        checkGeneralErrors(dispatch, err);
      }
      return dispatch(stopSigningIn());
    }
  };
}

export function signOutApi() {
  return function(dispatch) {
    authService.signOut();
    dispatch(signOut());
    return dispatch(flashInfoMessage('Usuário deslogado'));
  };
}

export function forceSignOutApi() {
  return function(dispatch) {
    authService.signOut();
    return dispatch(signOut());
  };
}

export function getUserDataApi() {
  return async function(dispatch) {
    dispatch(pushToQueue('Recebendo informações de usuário...'));
    dispatch(getUserData());
    try {
      const res = await authService.getUserData();
      dispatch(setUserData(res));
      return dispatch(popFromQueue());
    } catch (err) {
      dispatch(stopUserData());
      dispatch(popFromQueue());
      if (!checkGeneralErrors(dispatch, err)) {
        return dispatch(flashErrorMessage(err));
      }
      return false;
    }
  };
}
