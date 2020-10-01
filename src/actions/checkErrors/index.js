import {flashErrorMessage, flashWarningMessage} from '../flashMessage';
import {errorTypes} from '../../utils/errorHandling/errorTypes';
import {forceSignOutApi, stopSigningIn} from '../signIn';


export const checkGeneralErrors = (dispatch, error) => {
  switch (error.type) {
    case errorTypes.UNAUTHORIZED:
      dispatch(forceSignOutApi());
      dispatch(flashErrorMessage('Erro de sessão, faça login novamente'));
      return true;
    case errorTypes.NETWORK:
      dispatch(stopSigningIn());
      dispatch(flashErrorMessage('Não foi possível comunicar-se com o servidor.'));
      return true;
    case errorTypes.SERVER_ERROR:
      dispatch(flashErrorMessage(error.response));
      return true;
    case errorTypes.NOT_FOUND:
      dispatch(flashWarningMessage('Requisição não encontrada.'));
      return 'Nada encontrado';
    case errorTypes.WRONG_METHOD:
      return 'Erro de processamento de informações. (405)';
    default:
      return false;
  }
};
