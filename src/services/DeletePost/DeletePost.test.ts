import { apiUrl, deleteApi } from '@services/Api/Api';
import handleError from '@errors/HandleError/HandleError';
import { ErrorResponse } from '@utils/Types/Types';
import { deletePost } from './DeletePost';
import { Mock } from 'vitest';

vi.mock('@services/Api/Api', () => ({
  apiUrl: 'https://api.mock.com/',
  deleteApi: vi.fn(),
}));

vi.mock('@errors/HandleError/HandleError', () => ({
  default: vi.fn(),
}));

describe('deletePost', () => {
  const authorId = '12345';
  const url = `${apiUrl}api/Post/${authorId}`;

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should call deleteApi with correct URL and return void on successful deletion', async () => {
    (deleteApi as Mock).mockResolvedValueOnce(undefined);

    const result = await deletePost(authorId);
    expect(result).toBeUndefined();
    expect(deleteApi).toHaveBeenCalledWith(url);
  });

  it('should return ErrorResponse on error', async () => {
    const mockError = new Error('Network Error');
    const mockErrorResponse: ErrorResponse = {
      message: 'Network Error',
      code: 'ERR_NETWORK',
      detailedMessage: 'A network error occurred',
      helpUrl: 'http://example.com/help',
      details: null,
    };

    (deleteApi as Mock).mockRejectedValueOnce(mockError);
    (handleError as Mock).mockReturnValueOnce(mockErrorResponse);

    const result = await deletePost(authorId);
    expect(result).toEqual(mockErrorResponse);
    expect(handleError).toHaveBeenCalledWith(mockError);
  });

  it('should return ErrorResponse if deleteApi returns an error response', async () => {
    const mockErrorResponse: ErrorResponse = {
      message: 'Unauthorized',
      code: '401',
      detailedMessage: 'User is not authorized to delete this post',
      helpUrl: '',
      details: null,
    };

    (deleteApi as Mock).mockResolvedValueOnce(mockErrorResponse);

    const result = await deletePost(authorId);
    expect(result).toEqual(mockErrorResponse);
    expect(deleteApi).toHaveBeenCalledWith(url);
  });
});
