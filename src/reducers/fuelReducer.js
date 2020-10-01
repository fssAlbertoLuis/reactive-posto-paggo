import {Fuel} from '../actions/actionTypes';

const initialState = {
  list: [],
  loading: false,
  createLoading: false,
};

export const fuelReducer = (state=initialState, action) => {
  switch (action.type) {
    case Fuel.GET_LIST_REQUEST:
      return {...state, loading: true};
    case Fuel.GET_LIST:
      return {list: action.payload, loading: false};
    case Fuel.CREATE_REQUEST:
      return {...state, createLoading: true};
    case Fuel.CREATE:
      const newList = state.list;
      newList.push(action.payload);
      return {list: newList, createLoading: false};
    case Fuel.EDIT:
      const l = state.list;
      l[action.index] = action.payload;
      return {list: l, createLoading: false};
    case Fuel.DELETE:
      const r = state.list;
      r.splice(action.index, 1);
      return {list: [...r], createLoading: false};
    case Fuel.STOP_REQUEST:
      return {...state, createLoading: false, loading: false};
    default:
      return {...state};
  }
}
;
