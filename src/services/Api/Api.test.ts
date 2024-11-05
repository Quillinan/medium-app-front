import { describe, it, expect, Mock } from 'vitest';
import axios, {
  AxiosError,
  AxiosHeaders,
  InternalAxiosRequestConfig,
} from 'axios';
import handleError from '@errors/HandleError/HandleError';
import { ErrorResponse } from '@utils/Types/Types';
import { getApi, getTotvs, postApi } from './Api';

vi.mock('axios');

vi.mock('@errors/HandleError/HandleError', () => ({
  default: vi.fn(),
}));

describe('API Utility Functions', () => {
  const url = 'http://example.com/api/data';
  const mockAuthConfig = {
    auth: {
      username: import.meta.env.VITE_API_TOTVS_USERNAME,
      password: import.meta.env.VITE_API_TOTVS_PASSWORD,
    },
  };

  describe('getTotvs', () => {
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

      const errorResponseMock: ErrorResponse = {
        code: '500',
        message: 'Erro na requisição da API.',
        detailedMessage: mockError.message || 'Erro desconhecido',
        helpUrl: '',
        details: null,
      };

      (axios.get as Mock).mockRejectedValueOnce(mockError);
      (handleError as Mock).mockReturnValue(errorResponseMock);

      const result = await getTotvs(url);

      expect(result).toEqual(errorResponseMock);
      expect(handleError).toHaveBeenCalledWith(mockError);
    });

    it('should return data when API call is successful', async () => {
      const mockData = { id: 1, name: 'Test' };

      (axios.get as Mock).mockResolvedValueOnce({ data: mockData });

      const result = await getTotvs(url);

      expect(result).toEqual(mockData);
      expect(axios.get).toHaveBeenCalledWith(url, mockAuthConfig);
    });
  });

  describe('get function', () => {
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
          status: 404,
          statusText: 'Not Found',
          headers: new AxiosHeaders(),
          config: mockConfig,
        },
      };

      const errorResponseMock: ErrorResponse = {
        code: '404',
        message: 'Erro na requisição da API.',
        detailedMessage: mockError.message || 'Erro desconhecido',
        helpUrl: '',
        details: null,
      };

      (axios.get as Mock).mockRejectedValueOnce(mockError);
      (handleError as Mock).mockReturnValue(errorResponseMock);

      const result = await getApi(url);

      expect(result).toEqual(errorResponseMock);
      expect(handleError).toHaveBeenCalledWith(mockError);
    });

    it('should return data when API call is successful', async () => {
      const mockData = { id: 1, name: 'Test' };

      (axios.get as Mock).mockResolvedValueOnce({ data: mockData });

      const result = await getApi(url);

      expect(result).toEqual(mockData);
      expect(axios.get).toHaveBeenCalledWith(url);
    });
  });

  describe('post function', () => {
    const postUrl = 'http://example.com/api/upload';
    const formData = new FormData();
    formData.append(
      'file',
      new Blob(['test content'], { type: 'text/plain' }),
      'test.txt'
    );

    it('should handle error and return ErrorResponse when API call fails', async () => {
      const mockConfig: InternalAxiosRequestConfig = {
        url: '/api/upload',
        method: 'POST',
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

      const errorResponseMock: ErrorResponse = {
        code: '500',
        message: 'Erro na requisição da API.',
        detailedMessage: mockError.message || 'Erro desconhecido',
        helpUrl: '',
        details: null,
      };

      (axios.post as Mock).mockRejectedValueOnce(mockError);
      (handleError as Mock).mockReturnValue(errorResponseMock);

      const result = await postApi(postUrl, formData);

      expect(result).toEqual(errorResponseMock);
      expect(handleError).toHaveBeenCalledWith(mockError);
    });

    it('should return data when API call is successful', async () => {
      const mockData = { success: true };

      (axios.post as Mock).mockResolvedValueOnce({ data: mockData });

      const result = await postApi(postUrl, formData);

      expect(result).toEqual(mockData);
      expect(axios.post).toHaveBeenCalledWith(postUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    });
  });
});
