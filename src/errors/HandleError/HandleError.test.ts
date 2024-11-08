import { AxiosError, AxiosHeaders, InternalAxiosRequestConfig } from 'axios';
import Swal from 'sweetalert2';
import { ErrorResponse } from '@utils/Types/Types';
import handleError from './HandleError';

vi.mock('sweetalert2', async () => {
  const original =
    await vi.importActual<typeof import('sweetalert2')>('sweetalert2');
  return {
    ...original,
    default: {
      fire: vi.fn(),
    },
  };
});

describe('handleError', () => {
  const mockConfig: InternalAxiosRequestConfig = {
    url: '/api/test',
    method: 'GET',
    headers: new AxiosHeaders(),
  };

  const mockError: Partial<AxiosError> = {
    message: 'Request failed',
    response: {
      data: {},
      status: 500,
      statusText: 'Internal Server Error',
      headers: new AxiosHeaders(),
      config: mockConfig,
    },
  };

  it('should return default error response for unknown error', () => {
    const result: ErrorResponse = handleError(mockError as AxiosError);

    expect(result.code).toBe('500');
    expect(result.message).toBe('Erro na requisição da API.');
    expect(result.detailedMessage).toBe(mockError.message);
    expect(result.details).toBeNull();
    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Erro',
      text: 'Erro na requisição da API.',
      icon: 'error',
    });
  });

  it('should handle 401 error', () => {
    mockError.response!.status = 401;
    mockError.response!.data = {
      message: 'Não autorizado',
      details: 'Chave da API inválida.',
    };

    const result: ErrorResponse = handleError(mockError as AxiosError);

    expect(result.code).toBe('401');
    expect(result.message).toBe('Não autorizado');
    expect(result.detailedMessage).toBe(mockError.message);
    expect(result.details).toBe('Chave da API inválida.');
    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Não autorizado',
      text: 'Chave da API inválida.',
      icon: 'error',
    });
  });

  it('should handle 404 error', () => {
    mockError.response!.status = 404;
    mockError.response!.data = {
      message: 'Não encontrado',
      details: 'Dado não existe ou não foi encontrado.',
    };

    const result: ErrorResponse = handleError(mockError as AxiosError);

    expect(result.code).toBe('404');
    expect(result.message).toBe('Não encontrado');
    expect(result.detailedMessage).toBe(mockError.message);
    expect(result.details).toBe('Dado não existe ou não foi encontrado.');
    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Não encontrado',
      text: 'Dado não existe ou não foi encontrado.',
      icon: 'error',
    });
  });

  it('should handle 429 error with warning icon', () => {
    mockError.response!.status = 429;
    mockError.response!.data = {
      message: 'Muitas chamadas',
      details: 'Muitas chamadas para a API. Tente novamente mais tarde.',
    };

    const result: ErrorResponse = handleError(mockError as AxiosError);

    expect(result.code).toBe('429');
    expect(result.message).toBe('Muitas chamadas');
    expect(result.detailedMessage).toBe(mockError.message);
    expect(result.details).toBe(
      'Muitas chamadas para a API. Tente novamente mais tarde.'
    );
    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Muitas chamadas',
      text: 'Muitas chamadas para a API. Tente novamente mais tarde.',
      icon: 'warning',
    });
  });

  it('should handle error without response object', () => {
    const noResponseError: Partial<AxiosError> = {
      message: 'Network Error',
    };

    const result: ErrorResponse = handleError(noResponseError as AxiosError);

    expect(result.code).toBe('UNKNOWN_ERROR');
    expect(result.message).toBe('Erro na requisição da API.');
    expect(result.detailedMessage).toBe('');
    expect(result.details).toBeNull();
    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Erro',
      text: 'Erro na requisição da API.',
      icon: 'error',
    });
  });
});
