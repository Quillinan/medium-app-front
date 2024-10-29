import { render, screen, waitFor } from '@testing-library/react';
import PostsContent from './PostsContent';
import { getPosts } from '@services/GetPosts/GetPosts';
import { showLoading } from '@utils/LoadingHelper/LoadingHelper';
import { Post } from '@utils/Types/Types';

vi.mock('@services/GetPosts/GetPosts', () => ({
  getPosts: vi.fn(),
}));

vi.mock('@utils/LoadingHelper/LoadingHelper', () => ({
  showLoading: vi.fn(),
}));

describe('PostsContent', () => {
  it('should display custom error message from API response', async () => {
    const apiErrorResponse = { message: 'Erro na requisição da API.' };

    (getPosts as jest.Mock).mockResolvedValue(apiErrorResponse);

    render(<PostsContent />);

    const error = await screen.findByText(
      content =>
        content.startsWith('Erro ao carregar posts:') &&
        content.includes('Erro na requisição da API.')
    );

    expect(error).toBeInTheDocument();
  });

  it('should display error message if fetching data fails', async () => {
    const errorMessage = 'Erro ao carregar os dados da API';

    (showLoading as jest.Mock).mockResolvedValue(undefined);

    (getPosts as jest.Mock).mockRejectedValue(new Error(errorMessage));

    render(<PostsContent />);

    const error = await screen.findByText(errorMessage);
    expect(error).toBeInTheDocument();
  });

  it('should display loading message while fetching data', () => {
    render(<PostsContent />);
    const loadingMessage = screen.getByText('Carregando...');
    expect(loadingMessage).toBeInTheDocument();
  });

  it('should display post data when fetching is successful', async () => {
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

    (showLoading as jest.Mock).mockResolvedValue(undefined);
    (getPosts as jest.Mock).mockResolvedValue(mockPosts);

    render(<PostsContent />);

    await waitFor(() => {
      expect(screen.getByText('First Post')).toBeInTheDocument();
      expect(screen.getByText('Subtitle of First Post')).toBeInTheDocument();
      expect(
        screen.getByText('This is the content of the first post.')
      ).toBeInTheDocument();

      expect(screen.getByText('Second Post')).toBeInTheDocument();
      expect(screen.getByText('Subtitle of Second Post')).toBeInTheDocument();
      expect(
        screen.getByText('This is the content of the second post.')
      ).toBeInTheDocument();
    });
  });

  it('should match snapshot', () => {
    const { asFragment } = render(<PostsContent />);
    expect(asFragment()).toMatchSnapshot();
  });
});
