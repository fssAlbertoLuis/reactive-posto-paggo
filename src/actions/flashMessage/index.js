import {FlashMessage} from '../actionTypes';

export const flashInfoMessage = (message) => ({
  type: FlashMessage.INFO,
  message,
});

export const flashErrorMessage = (message) => ({
  type: FlashMessage.ERROR,
  message,
});

export const flashWarningMessage = (message) => ({
  type: FlashMessage.WARNING,
  message,
});

export const flashSuccessMessage = (message) => ({
  type: FlashMessage.SUCCESS,
  message,
});

export const flashMessageClose = () => ({
  type: FlashMessage.CLOSE,
});
