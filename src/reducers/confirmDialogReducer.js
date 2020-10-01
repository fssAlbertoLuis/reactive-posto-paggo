import {ConfirmDialog} from '../actions/actionTypes';

const initialState = {
  open: false,
  title: '',
  message: '',
  onClose: null,
};

export const confirmDialogReducer = (state=initialState, action) => {
  switch (action.type) {
    case ConfirmDialog.OPEN:
      return {
        open: true,
        title: action.title,
        message: action.message,
        onClose: action.onClose,
      };
    case ConfirmDialog.CLOSE:
      return {...initialState};
    default:
      return {...state};
  }
};
