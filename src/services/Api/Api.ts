import handleError from '@errors/HandleError/HandleError';
import { ErrorResponse } from '@utils/Types/Types';
import axios, { AxiosError, AxiosResponse } from 'axios';

export const apiUrl = import.meta.env.VITE_API_URL;
export const apiUser = import.meta.env.VITE_API_USERNAME;
export const apiPassword = import.meta.env.VITE_API_PASSWORD;
export const codeAffiliate = import.meta.env.VITE_API_AFFILIATE;
export const codeSystem = import.meta.env.VITE_API_SYSTEM;

export const get = async (
  url: string
): Promise<object | ErrorResponse | undefined> => {
  try {
    const response: AxiosResponse = await axios.get(url, {
      auth: {
        username: apiUser,
        password: apiPassword,
      },
    });

    return response.data;
  } catch (error) {
    const errorResponse = handleError(error as AxiosError);
    return errorResponse;
  }
};
