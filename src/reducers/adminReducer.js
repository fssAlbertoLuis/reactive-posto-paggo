import {Company} from '../actions/actionTypes';

const initialState = {
  company: null,
  list: null,
  lastUpdate: 0,
  loading: false,
};

export const adminReducer = (state=initialState, action) => {
  switch (action.type) {
    case Company.SET_LIST:
      return {
        ...state, list: action.payload, lastUpdate: action.update,
      };
    case Company.INSERT_REQUEST:
      return {
        ...state, loading: true,
      };
    case Company.INSERT:
      return {
        ...state, company: action.payload, loading: false,
      };
    case Company.STOP_REQUEST:
      return {
        ...state, loading: false,
      };
    case Company.RESET_STATE:
      return {
        ...state,
        company: null,
        loading: false,
      };
    default:
      return {...state};
  }
}
;
