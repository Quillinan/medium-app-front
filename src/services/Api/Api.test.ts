import { vi, describe, it, expect } from 'vitest';
import axios, {
  AxiosError,
  AxiosHeaders,
  InternalAxiosRequestConfig,
} from 'axios';
import handleError from '@errors/HandleError/HandleError';
import { ErrorResponse } from '@utils/Types/Types';
import { get } from './Api';

vi.mock('axios');

vi.mock('@errors/HandleError/HandleError', () => {
  return {
    default: vi.fn(),
  };
});

describe('get', () => {
  const url = 'http://example.com/api/data';

  it('should handle error and return ErrorResponse when API call fails', async () => {
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

    (axios.get as jest.Mock).mockRejectedValueOnce(mockError);

    const errorResponseMock: ErrorResponse = {
      code: '500',
      message: 'Erro na requisição da API.',
      detailedMessage: mockError.message || 'Erro desconhecido',
      helpUrl: '',
      details: null,
    };

    (handleError as jest.Mock).mockReturnValue(errorResponseMock);

    const result = await get(url);

    expect(result).toEqual(errorResponseMock);
    expect(handleError).toHaveBeenCalledWith(mockError);
  });

  it('should return data when API call is successful', async () => {
    const mockData = { id: 1, name: 'Test' };

    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: mockData,
    });

    const result = await get(url);

    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith(url, {
      auth: {
        username: import.meta.env.VITE_API_USERNAME,
        password: import.meta.env.VITE_API_PASSWORD,
      },
    });
  });
});
