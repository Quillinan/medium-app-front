import { AxiosError } from 'axios';
import Swal from 'sweetalert2';

const handleError = (error: AxiosError) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        Swal.fire({
          title: 'Não autorizado',
          text: 'Chave da API inválida.',
          icon: 'error',
        });
        break;
      case 404:
        Swal.fire({
          title: 'Não encontrado',
          text: 'Dado não existe ou não foi encontrado.',
          icon: 'error',
        });
        break;
      case 429:
        Swal.fire({
          title: 'Muitas chamadas',
          text: 'Muitas chamadas para a API. Tente novamente mais tarde.',
          icon: 'warning',
        });
        break;
      default:
        Swal.fire({
          title: 'Erro',
          text: 'Erro na requisição da API.',
          icon: 'error',
        });
    }
  } else {
    Swal.fire({
      title: 'Erro',
      text: 'Erro na requisição da API.',
      icon: 'error',
    });
  }
};

export default handleError;
