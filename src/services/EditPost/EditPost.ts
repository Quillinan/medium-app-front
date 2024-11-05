import handleError from '@errors/HandleError/HandleError';
import { apiUrl, putApi } from '@services/Api/Api';
import { Post, ErrorResponse, EditPostData } from '@utils/Types/Types';

export const editPost = async (
  postData: EditPostData,
  postId: string
): Promise<Post | ErrorResponse | undefined> => {
  const url = `${apiUrl}api/Post/${postId}`;
  const formData = new FormData();

  if (postData.title) {
    formData.append('Title', postData.title);
  }
  if (postData.subtitle) {
    formData.append('Subtitle', postData.subtitle);
  }
  if (postData.content) {
    formData.append('Content', postData.content);
  }
  if (postData.coverImage) {
    formData.append('CoverImageData', postData.coverImage);
  }

  try {
    const response = await putApi(url, formData);
    return response as Post;
  } catch (error: any) {
    return handleError(error);
  }
};
