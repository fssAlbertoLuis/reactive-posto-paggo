import {LoaderDiv} from '../actionTypes';

export const startLoading = () => ({
  type: LoaderDiv.START_LOADING,
});

export const stopLoading = () => ({
  type: LoaderDiv.STOP_LOADING,
});
