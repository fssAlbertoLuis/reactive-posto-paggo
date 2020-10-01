import {Recharge} from '../actions/actionTypes';

const initialState = {
  list: null,
  lastUpdate: 0,
};

export const rechargeReducer = (state=initialState, action) => {
  switch (action.type) {
    case Recharge.SET_LIST:
      return {
        list: action.payload,
        lastUpdate: action.update,
      };
    case Recharge.INSERT:
      if (state.list && state.list.data) {
        return {
          ...state,
          list: {
            ...state.list,
            data: [action.payload, ...state.list.data],
            meta: {
              ...state.list.meta,
              total: state.list.meta.total + 1,
            },
          },
        };
      } else {
        return {...state};
      }
    case Recharge.INSERT_NEW_PAGE:
      let newArr = [];
      const page = action.payload.meta.current_page - 1;
      const perPage = parseInt(action.payload.meta.per_page, 10);
      if (!state.list) {
        if (page < 1) {
          newArr = [...action.payload.data];
        } else if (page === action.payload.meta.last_page) {
          newArr = [...Array(page*perPage), action.payload.data];
        } else {
          newArr = [
            ...Array(page*perPage),
            ...action.payload.data,
            ...Array(perPage),
          ];
        }
      } else {
        if (page < 1) {
          newArr = [...action.payload.data, ...state.list.data.slice((page+1)*perPage, action.payload.meta.total)];
        } else if (page === action.payload.meta.last_page) {
          newArr = [...state.list.data, action.payload.data];
        } else {
          newArr = [
            ...state.list.data.slice(0, page * perPage),
            ...action.payload.data,
            ...state.list.data.slice((page * perPage) + perPage, action.payload.meta.total),
          ];
        }
      }
      return {
        list: {
          meta: action.payload.meta,
          data: [...newArr],
          links: action.payload.links,
        },
        lastUpdate: action.update,
      };
    case Recharge.UPDATE_CURRENT_PAGE:
      return {
        ...state,
        list: {
          ...state.list,
          meta: {
            ...state.list.meta,
            current_page: action.page,
          },
        },
      };
    case Recharge.RESET_LIST:
      return {...initialState};
    case Recharge.CHANGE_PER_PAGE:
      return {
        ...state,
        list: {
          ...state.list,
          meta: {
            ...state.list.meta,
            per_page: action.payload,
          },
        },
      };
    default:
      return {...state};
  }
};
