import {Authentication} from '../actions/actionTypes';

const token = localStorage.getItem('token');

const initialState = {
  signedIn: token ? true : false,
  signedOut: false,
  signingIn: false,
  user: {
    isLoading: false,
    isEmpty: true,
    info: {},
    menu: [],
  },
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case Authentication.SIGN_IN_REQUEST:
      return {
        ...state,
        signingIn: true,
        signedOut: false,
      };

    case Authentication.SIGN_IN:
      return {
        ...state,
        signingIn: false,
        signedIn: true,
      };
    case Authentication.SIGN_OUT:
      return {...initialState, signedIn: false, signedOut: true};
    case Authentication.SIGN_IN_STOP:
      return {...initialState, signedIn: false};
    case Authentication.GET_USER_DATA:
      return {
        ...state,
        user: {
          isEmpty: true,
          isLoading: true,
        },
      };
    case Authentication.SET_USER_DATA:
      return {
        ...state,
        user: {
          isEmpty: false,
          isLoading: false,
          info: action.payload,
        },
      };
    case Authentication.STOP_USER_DATA:
      return {
        ...state,
        user: {
          isEmpty: true,
          isLoading: false,
          info: {},
        },
      };
    case Authentication.UPDATE_AUTH_USER:
      return {
        ...state,
        user: {
          ...state.user,
          info: action.payload,
        },
      };
    default:
      return state;
  }
};
