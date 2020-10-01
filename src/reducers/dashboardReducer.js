import {Dashboard} from '../actions/actionTypes';

const initialState = {
  totalEarnings: 0,
  currentMonthEarnings: 0,
  yearEarnings: [],
};

export const dashboardReducer = (state=initialState, action) => {
  switch (action.type) {
    case Dashboard.SET_STATISTICS:
      return {...action.payload};
    case Dashboard.ADD_EARNINGS:
      return {
        ...state,
        currentMonthEarnings: parseFloat(state.currentMonthEarnings) + parseFloat(action.payload),
        totalEarnings: parseFloat(state.totalEarnings) + parseFloat(action.payload),
      };
    default: {
      return {...state};
    }
  }
};
