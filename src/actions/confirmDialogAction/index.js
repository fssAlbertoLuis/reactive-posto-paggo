import {ConfirmDialog} from '../actionTypes';

export const openConfirmDialog = (title, message, onClose) => ({
  type: ConfirmDialog.OPEN,
  title, message, onClose,
});

export const closeConfirmDialog = () => ({
  type: ConfirmDialog.CLOSE,
});

export const resetConfirmDialog = () => ({
  type: ConfirmDialog.RESET,
});
