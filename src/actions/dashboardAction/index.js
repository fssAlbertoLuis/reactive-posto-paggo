import {Dashboard} from '../actionTypes';
import {flashWarningMessage} from '../flashMessage';
import {companyService} from '../../api/company';
import {checkGeneralErrors} from '../checkErrors';
import {popFromQueue, pushToQueue} from '../asyncQueue';

const setStatistics = (payload) => ({
  type: Dashboard.SET_STATISTICS,
  payload,
});

export const addEarnings = (payload) => ({
  type: Dashboard.ADD_EARNINGS,
  payload,
});

export function getStatisticsApi() {
  return async function(dispatch) {
    try {
      dispatch(pushToQueue('Recebendo estatísticas da empresa...'));
      const res = await companyService.statistics();
      dispatch(setStatistics(res));
      dispatch(popFromQueue());
    } catch (e) {
      if (!checkGeneralErrors(dispatch, e)) {
        dispatch(flashWarningMessage('Não foi possível carregar as estatísticas da empresa'));
      }
      dispatch(popFromQueue());
    }
  };
}
