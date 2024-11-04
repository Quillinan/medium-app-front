import handleError from '@errors/HandleError/HandleError';
import { ErrorResponse } from '@utils/Types/Types';
import axios, { AxiosError, AxiosResponse } from 'axios';

export const apiUrl = import.meta.env.VITE_API_URL;
export const apiTotvsUrl = import.meta.env.VITE_API_TOTVS_URL;
export const apiTotvsUser = import.meta.env.VITE_API_TOTVS_USERNAME;
export const apiTotvsPassword = import.meta.env.VITE_API_TOTVS_PASSWORD;
export const codeAffiliate = import.meta.env.VITE_API_AFFILIATE;
export const codeSystem = import.meta.env.VITE_API_SYSTEM;

export const codeSentenceBirth = import.meta.env.VITE_API_SENTENCE_BIRTHDAYS;

export const getApi = async (
  url: string
): Promise<object | ErrorResponse | undefined> => {
  try {
    const response: AxiosResponse = await axios.get(url);
    return response.data;
  } catch (error) {
    const errorResponse = handleError(error as AxiosError);
    return errorResponse;
  }
};

export const postApi = async (
  url: string,
  body: FormData
): Promise<object | ErrorResponse | undefined> => {
  try {
    const response: AxiosResponse = await axios.post(url, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    const errorResponse = handleError(error as AxiosError);
    return errorResponse;
  }
};

export const getTotvs = async (
  url: string
): Promise<object | ErrorResponse | undefined> => {
  try {
    const response: AxiosResponse = await axios.get(url, {
      auth: {
        username: apiTotvsUser,
        password: apiTotvsPassword,
      },
    });
    return response.data;
  } catch (error) {
    const errorResponse = handleError(error as AxiosError);
    return errorResponse;
  }
};
