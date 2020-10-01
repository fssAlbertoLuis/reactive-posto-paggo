import {errorTypes} from './errorTypes';

const errorHandling = (err) => {
  const response = err.response;
  if (response) {
    switch (response.status) {
      case errorTypes.BAD_REQUEST:
        return {
          type: errorTypes.BAD_REQUEST,
          response: 'Informações de requisição inválidas (400)',
        };
      case errorTypes.UNAUTHORIZED:
        return {
          type: errorTypes.UNAUTHORIZED,
          response: 'Erro de sessão. Faça login novamente (401)',
        };
      case errorTypes.FORBIDDEN:
        return {
          type: errorTypes.FORBIDDEN,
          response: 'Você não tem permissão para realizar essa ação',
        };
      case errorTypes.VALIDATION:
        return {
          type: errorTypes.VALIDATION,
          response: response.data.message,
        };
      case errorTypes.NOT_FOUND:
        return {
          type: errorTypes.NOT_FOUND,
          response: null,
        };
      case errorTypes.SERVER_ERROR:
        return {
          type: errorTypes.SERVER_ERROR,
          response: 'Erro interno do servidor. Tente novamente ou contate-nos',
        };
      default:
        return null;
    }
  } else {
    return {
      type: errorTypes.NETWORK,
      response: 'Não foi possível conectar-se ao servidor',
    };
  }
};

export default errorHandling;
