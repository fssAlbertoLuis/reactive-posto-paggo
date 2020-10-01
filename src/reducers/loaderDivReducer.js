import {LoaderDiv} from '../actions/actionTypes';

const initialState = {
  loading: false,
};

export const loaderDivReducer = (state=initialState, action) => {
  switch (action.type) {
    case LoaderDiv.START_LOADING:
      return {...state, loading: true};
    case LoaderDiv.STOP_LOADING:
      return {...state, loading: false};
    default:
      return {...state};
  }
};
