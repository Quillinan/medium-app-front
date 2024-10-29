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
        title: 'First Post',
        subtitle: 'Subtitle of First Post',
        content: 'This is the content of the first post.',
        createdAt: new Date('2024-10-29T00:00:00Z'),
        updatedAt: new Date('2024-10-29T00:00:00Z'),
        authorId: '123',
        authorName: 'Author One',
      },
      {
        id: 2,
        title: 'Second Post',
        subtitle: 'Subtitle of Second Post',
        content: 'This is the content of the second post.',
        createdAt: new Date('2024-10-29T00:00:00Z'),
        updatedAt: new Date('2024-10-29T00:00:00Z'),
        authorId: '456',
        authorName: 'Author Two',
      },
    ];

    vi.mocked(get).mockResolvedValue(mockPosts);

    const result = await getPosts();

    expect(result).toEqual(mockPosts);
    expect(get).toHaveBeenCalledWith('https://api.mock.com/api/Post');
  });
});
