import {combineReducers} from 'redux';

import {authReducer} from './authReducer';
import {flashMessageReducer} from './flashMessageReducer';
import {asyncQueueReducer} from './asyncQueueReducer';
import {userReducer} from './userReducer';
import {loaderDivReducer} from './loaderDivReducer';
import {adminReducer} from './adminReducer';
import {fuelReducer} from './fuelReducer';
import {confirmDialogReducer} from './confirmDialogReducer';
import {rechargeReducer} from './rechargeReducer';
import {dashboardReducer} from './dashboardReducer';

export const Reducers = combineReducers({
  authState: authReducer,
  flashMessagesState: flashMessageReducer,
  asyncQueue: asyncQueueReducer,
  userState: userReducer,
  loaderState: loaderDivReducer,
  adminState: adminReducer,
  fuelState: fuelReducer,
  confirmDialogState: confirmDialogReducer,
  rechargeState: rechargeReducer,
  dashboardState: dashboardReducer,
});
