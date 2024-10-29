import handleError from '@errors/HandleError/HandleError';
import { apiUrl, get } from '@services/Api/Api';
import { Post, ErrorResponse } from '@utils/Types/Types';

export const getPosts = async (): Promise<
  Post[] | ErrorResponse | undefined
> => {
  const url = `${apiUrl}api/Post`;
  try {
    const response = await get(url);
    return response as Post[];
  } catch (error: any) {
    return handleError(error);
  }
};
