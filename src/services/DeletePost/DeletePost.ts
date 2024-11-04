import { apiUrl, deleteApi } from '@services/Api/Api';
import handleError from '@errors/HandleError/HandleError';
import { ErrorResponse } from '@utils/Types/Types';

export const deletePost = async (
  authorId: string
): Promise<void | ErrorResponse> => {
  const url = `${apiUrl}api/Post/${authorId}`;

  try {
    const result = await deleteApi(url);

    if (result === undefined) {
      return;
    }

    return result as ErrorResponse;
  } catch (error: any) {
    return handleError(error);
  }
};
