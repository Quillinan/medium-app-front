import { get, apiUrl } from './api';

export const getCloudTotvs = async (): Promise<any> => {
  const url = `${apiUrl}`;

  return get(url);
};
