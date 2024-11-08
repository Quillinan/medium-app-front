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
    const { status, data } = error.response;
    const errorData = data as { message?: string; details?: string };

    const iconType = status === 429 ? 'warning' : 'error';

    Swal.fire({
      title: errorData.message || 'Erro',
      text: errorData.details || 'Erro na requisição da API.',
      icon: iconType,
    });

    errorResponse = {
      code: status.toString(),
      message: errorData.message || 'Erro na requisição da API.',
      detailedMessage: error.message,
      helpUrl: '',
      details: errorData.details ?? null,
    };
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
