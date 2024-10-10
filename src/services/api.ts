import axios, { AxiosError } from 'axios';
import handleError from './Error/error';

export const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use(
  config => {
    // auth token = response.accessToken q o 365 me devolve ao aceitar o login
    const token = sessionStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log('Fazendo requisição:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
    });

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export const get = async (url: string): Promise<any> => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};
