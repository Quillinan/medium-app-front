import handleError from '@errors/HandleError/HandleError';
import { apiUrl, post } from '@services/Api/Api';
import { Post, ErrorResponse, CreatePostData } from '@utils/Types/Types';

export const createPost = async (
  postData: CreatePostData
): Promise<Post | ErrorResponse | undefined> => {
  const url = `${apiUrl}api/Post`;
  const formData = new FormData();

  formData.append('Title', postData.title);
  formData.append('Subtitle', postData.subtitle);
  formData.append('Content', postData.content);
  formData.append('AuthorId', postData.authorId);
  formData.append('AuthorName', postData.authorName);

  if (postData.coverImage) {
    formData.append('CoverImageData', postData.coverImage);
  }

  try {
    const response = await post(url, formData);
    return response as Post;
  } catch (error: any) {
    return handleError(error);
  }
};
