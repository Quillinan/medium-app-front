import handleError from '@errors/HandleError/HandleError';
import { apiUrl, putApi } from '@services/Api/Api';
import { Post, ErrorResponse, EditPostData } from '@utils/Types/Types';
import { editPost } from './EditPost';
import { Mock } from 'vitest';

vi.mock('@services/Api/Api', () => ({
  apiUrl: 'https://api.mock.com/',
  putApi: vi.fn(),
}));

vi.mock('@errors/HandleError/HandleError', () => ({
  default: vi.fn(),
}));

describe('editPost', () => {
  const postId = '12345';
  const url = `${apiUrl}api/Post/${postId}`;
  const postData: EditPostData = {
    title: 'Updated Title',
    subtitle: 'Updated Subtitle',
    content: 'Updated Content',
    coverImage: new File(['updated image'], 'updated.png', {
      type: 'image/png',
    }),
  };

  const createMockResponse = (data: EditPostData): Post => ({
    id: 2,
    title: data.title || '',
    subtitle: data.subtitle || '',
    content: data.content || '',
    createdAt: new Date(),
    updatedAt: new Date(),
    authorId: '12345',
    authorName: 'Test Author',
    coverImageUrl: '',
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should handle errors using handleError and return ErrorResponse', async () => {
    const postDataWithPartialUpdate: EditPostData = {
      title: 'Partial Update Title',
    };

    const mockError = new Error('Network Error');
    const mockErrorResponse: ErrorResponse = {
      message: 'Network Error',
      code: '',
      detailedMessage: '',
      helpUrl: '',
      details: null,
    };

    (putApi as Mock).mockRejectedValueOnce(mockError);
    (handleError as Mock).mockReturnValueOnce(mockErrorResponse);

    const result = await editPost(postDataWithPartialUpdate, postId);
    expect(result).toEqual(mockErrorResponse);
    expect(handleError).toHaveBeenCalledWith(mockError);
  });

  it('should not append CoverImageData if coverImage is not provided', async () => {
    const postDataWithoutImage: EditPostData = {
      title: 'Updated Title Without Image',
      subtitle: 'Updated Subtitle',
      content: 'Updated Content',
      coverImage: null,
    };

    const mockResponse = createMockResponse(postDataWithoutImage);

    (putApi as Mock).mockResolvedValueOnce(mockResponse);

    const result = await editPost(postDataWithoutImage, postId);
    expect(result).toEqual(mockResponse);

    const formDataArg = (putApi as Mock).mock.calls[0][1] as FormData;
    expect(formDataArg.has('CoverImageData')).toBe(false);
  });

  it('should return updated Post data on successful put request', async () => {
    const mockResponse = createMockResponse(postData);

    (putApi as Mock).mockResolvedValueOnce(mockResponse);

    const result = await editPost(postData, postId);
    expect(result).toEqual(mockResponse);
    expect(putApi).toHaveBeenCalledWith(url, expect.any(FormData));

    const formDataArg = (putApi as Mock).mock.calls[0][1] as FormData;
    expect(formDataArg.get('Title')).toBe(postData.title);
    expect(formDataArg.get('Subtitle')).toBe(postData.subtitle);
    expect(formDataArg.get('Content')).toBe(postData.content);
    expect(formDataArg.get('CoverImageData')).toEqual(expect.anything());
  });
});
