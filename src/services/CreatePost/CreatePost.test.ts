import handleError from '@errors/HandleError/HandleError';
import { post, apiUrl } from '@services/Api/Api';
import { Post, ErrorResponse, CreatePostData } from '@utils/Types/Types';
import { Mock } from 'vitest';
import { createPost } from './CreatePost';

vi.mock('@services/Api/Api', () => ({
  apiUrl: 'https://api.mock.com/',
  post: vi.fn(),
}));
vi.mock('@errors/HandleError/HandleError', () => ({
  default: vi.fn(),
}));
describe('createPost', () => {
  const postData: CreatePostData = {
    title: 'Test Title',
    subtitle: 'Test Subtitle',
    content: 'This is test content.',
    authorId: '12345',
    authorName: 'Test Author',
    coverImage: new File(['test image'], 'test.png', { type: 'image/png' }),
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return Post data on successful post request', async () => {
    const mockResponse: Post = {
      id: 1,
      title: postData.title,
      subtitle: postData.subtitle,
      content: postData.content,
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: postData.authorId,
      authorName: postData.authorName,
      coverImageUrl: 'http://example.com/image.png',
    };

    (post as Mock).mockResolvedValueOnce(mockResponse);

    const result = await createPost(postData);
    expect(result).toEqual(mockResponse);
    expect(post).toHaveBeenCalledWith(
      `${apiUrl}api/Post`,
      expect.any(FormData)
    );
  });

  it('should handle errors using handleError and return ErrorResponse', async () => {
    const mockError = new Error('Network Error');
    const mockErrorResponse: ErrorResponse = {
      message: 'Network Error',
      code: '',
      detailedMessage: '',
      helpUrl: '',
      details: null,
    };

    (post as Mock).mockRejectedValueOnce(mockError);
    (handleError as Mock).mockReturnValueOnce(mockErrorResponse);

    const result = await createPost(postData);
    expect(result).toEqual(mockErrorResponse);
    expect(handleError).toHaveBeenCalledWith(mockError);
  });

  it('should not append CoverImageData if coverImage is not provided', async () => {
    const postDataWithoutImage: CreatePostData = {
      ...postData,
      coverImage: null,
    };
    const mockResponse: Post = {
      id: 2,
      title: postDataWithoutImage.title,
      subtitle: postDataWithoutImage.subtitle,
      content: postDataWithoutImage.content,
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: postDataWithoutImage.authorId,
      authorName: postDataWithoutImage.authorName,
      coverImageUrl: '',
    };

    (post as Mock).mockResolvedValueOnce(mockResponse);

    const result = await createPost(postDataWithoutImage);
    expect(result).toEqual(mockResponse);

    const formDataArg = (post as Mock).mock.calls[0][1];
    expect(formDataArg.has('CoverImageData')).toBe(false);
  });
});
