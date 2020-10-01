import {FlashMessage} from '../actions/actionTypes';

const initialState = {
  open: false,
  message: '',
  type: 'info',
};

export const flashMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case FlashMessage.INFO:
      return {
        ...state,
        open: true,
        message: action.message,
        type: 'info',
      };
    case FlashMessage.ERROR:
      return {
        ...state,
        open: true,
        message: action.message,
        type: 'error',
      };
    case FlashMessage.WARNING:
      return {
        ...state,
        open: true,
        message: action.message,
        type: 'warning',
      };
    case FlashMessage.SUCCESS:
      return {
        ...state,
        open: true,
        message: action.message,
        type: 'success',
      };
    case FlashMessage.CLOSE:
      return {
        ...state,
        open: false,
        message: '',
      };
    default:
      return state;
  }
};
