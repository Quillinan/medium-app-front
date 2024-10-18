import { ErrorResponse } from '@utils/Types/Types';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';

const handleError = (error: AxiosError): ErrorResponse => {
  let errorResponse: ErrorResponse = {
    code: 'UNKNOWN_ERROR',
    message: 'Erro na requisição da API.',
    detailedMessage: '',
    helpUrl: '',
    details: null,
  };

  if (error.response) {
    switch (error.response.status) {
      case 401:
        Swal.fire({
          title: 'Não autorizado',
          text: 'Chave da API inválida.',
          icon: 'error',
        });
        errorResponse = {
          code: '401',
          message: 'Não autorizado. Chave da API inválida.',
          detailedMessage: error.message,
          helpUrl: '',
          details: null,
        };
        break;
      case 404:
        Swal.fire({
          title: 'Não encontrado',
          text: 'Dado não existe ou não foi encontrado.',
          icon: 'error',
        });
        errorResponse = {
          code: '404',
          message: 'Dado não encontrado.',
          detailedMessage: error.message,
          helpUrl: '',
          details: null,
        };
        break;
      case 429:
        Swal.fire({
          title: 'Muitas chamadas',
          text: 'Muitas chamadas para a API. Tente novamente mais tarde.',
          icon: 'warning',
        });
        errorResponse = {
          code: '429',
          message: 'Muitas chamadas para a API.',
          detailedMessage: error.message,
          helpUrl: '',
          details: null,
        };
        break;
      default:
        Swal.fire({
          title: 'Erro',
          text: 'Erro na requisição da API.',
          icon: 'error',
        });
        errorResponse = {
          code: error.response.status.toString(),
          message: 'Erro na requisição da API.',
          detailedMessage: error.message,
          helpUrl: '',
          details: null,
        };
    }
  } else {
    Swal.fire({
      title: 'Erro',
      text: 'Erro na requisição da API.',
      icon: 'error',
    });
  }

  return errorResponse;
};

export default handleError;
