import { act, render, screen, waitFor } from '@testing-library/react';
import { Post } from '@utils/Types/Types';
import PostsContent from './PostsContent';
import { getPosts } from '@services/GetPosts/GetPosts';
import { showLoading } from '@utils/LoadingHelper/LoadingHelper';

vi.mock('@services/GetPosts/GetPosts', () => ({
  getPosts: vi.fn(),
}));

vi.mock('@utils/LoadingHelper/LoadingHelper', () => ({
  showLoading: vi.fn(),
}));

describe('PostsContent', () => {
  const mockPosts: Post[] = [
    {
      id: 1,
      title: 'First Post',
      subtitle: 'Subtitle of First Post',
      content: 'This is the content of the first post.',
      createdAt: new Date('2024-10-28T00:00:00Z'),
      updatedAt: new Date('2024-10-28T00:00:00Z'),
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

  it('should display generic error message if fetching data fails', async () => {
    const errorMessage = 'Erro ao carregar os dados da API';
    (getPosts as jest.Mock).mockRejectedValue(new Error('Erro no servidor'));

    render(<PostsContent />);

    expect(showLoading).toHaveBeenCalled();
    const error = await screen.findByText(errorMessage);
    expect(error).toBeInTheDocument();
  });

  it('should display error message if fetching data fails', async () => {
    const errorMessage = 'Erro ao carregar os dados da API';
    (getPosts as jest.Mock).mockRejectedValue(new Error(errorMessage));
    (showLoading as jest.Mock).mockRejectedValue(new Error(errorMessage));

    render(<PostsContent />);

    expect(showLoading).toHaveBeenCalled();
    const error = await screen.findByText(errorMessage);
    expect(error).toBeInTheDocument();
  });

  it('should display post data when fetching is successful', async () => {
    (getPosts as jest.Mock).mockResolvedValue(mockPosts);
    (showLoading as jest.Mock).mockImplementation(promise => promise);

    await act(async () => {
      render(<PostsContent />);
    });

    expect(showLoading).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByText('First Post')).toBeInTheDocument();
      expect(screen.getByText('Subtitle of First Post')).toBeInTheDocument();
      expect(screen.getByText('Autor: Author One')).toBeInTheDocument();

      expect(screen.getByText('Second Post')).toBeInTheDocument();
      expect(screen.getByText('Subtitle of Second Post')).toBeInTheDocument();
      expect(screen.getByText('Autor: Author Two')).toBeInTheDocument();
    });
  });

  it('should display posts data sorted by date with the most recent first', async () => {
    (getPosts as jest.Mock).mockResolvedValue(mockPosts);
    (showLoading as jest.Mock).mockImplementation(promise => promise);

    await act(async () => {
      render(<PostsContent />);
    });

    expect(showLoading).toHaveBeenCalled();

    await waitFor(() => {
      const recentPost = screen.getByText('Second Post');
      const olderPost = screen.getByText('First Post');

      expect(recentPost).toBeInTheDocument();
      expect(olderPost).toBeInTheDocument();

      const postsOrder = [recentPost, olderPost];
      expect(postsOrder[0]).toBe(recentPost);
      expect(postsOrder[1]).toBe(olderPost);
    });
  });

  it('should match snapshot', () => {
    const { asFragment } = render(<PostsContent />);
    expect(asFragment()).toMatchSnapshot();
  });
});