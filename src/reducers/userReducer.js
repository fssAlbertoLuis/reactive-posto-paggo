import {User} from '../actions/actionTypes';

const initialState = {
  user: null,
  list: null,
  loading: false,
  lastUpdate: 0,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case User.GET_LIST:
      return {
        list: action.payload,
        loading: false,
        lastUpdate: action.update,
      };
    case User.GET_LIST_REQUEST:
      return {...state, loading: true};
    case User.USER_INSERT:
      return {list: [...state.list, action.payload], loading: false};
    case User.USER_INSERT_REQUEST:
      return {...state, loading: true};
    case User.USER_GET_RESET_REQUEST:
      return {
        ...state,
        user: null,
        loading: false,
      };
    case User.CLEAN_USER:
      return {
        ...state,
        user: null,
      };
    case User.USER_GET_REQUEST:
      return {
        ...state,
        user: null,
        loading: true,
      };
    case User.USER_GET:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case User.USER_STOP_REQUEST:
      return {...state, loading: false};
    case User.INSERT_NEW_PAGE:
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
    case User.UPDATE_CURRENT_PAGE:
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
    case User.RESET_LIST:
      return {...initialState};
    case User.CHANGE_PER_PAGE:
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
