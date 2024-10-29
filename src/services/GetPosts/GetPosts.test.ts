import { get } from '@services/Api/Api';
import { ErrorResponse, Post } from '@utils/Types/Types';
import { getPosts } from './GetPosts';

vi.mock('@services/Api/Api', () => ({
  apiUrl: 'https://api.mock.com/',
  get: vi.fn(),
}));

describe('getPosts', () => {
  it('should return an error response when API call fails', async () => {
    const mockErrorResponse: ErrorResponse = {
      code: '404',
      message: 'Dado não encontrado.',
      detailedMessage: 'Data not found',
      helpUrl: '',
      details: null,
    };

    vi.mocked(get).mockRejectedValueOnce({
      response: {
        status: 404,
        data: mockErrorResponse,
      },
      message: 'Data not found',
    });

    const result = await getPosts();

    expect(result).toEqual(mockErrorResponse);
    expect(get).toHaveBeenCalledWith('https://api.mock.com/api/Post');
  });

  it('should return post data when API call is successful', async () => {
    const mockPosts: Post[] = [
      {
        id: 1,
        title: 'Understanding TypeScript',
        content:
          'This is a post about TypeScript basics and advanced concepts.',
        createdAt: new Date('2023-05-15T08:30:00Z'),
        updatedAt: new Date('2023-06-01T12:00:00Z'),
        authorId: 'author123',
      },
      {
        id: 2,
        title: 'Exploring Node.js',
        content:
          'This post dives into Node.js and its applications in server-side development.',
        createdAt: new Date('2023-07-10T10:00:00Z'),
        updatedAt: new Date('2023-07-20T15:45:00Z'),
        authorId: 'author456',
      },
    ];

    vi.mocked(get).mockResolvedValue(mockPosts);

    const result = await getPosts();

    expect(result).toEqual(mockPosts);
    expect(get).toHaveBeenCalledWith('https://api.mock.com/api/Post');
  });
});
