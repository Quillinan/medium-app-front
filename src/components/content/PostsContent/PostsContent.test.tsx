import { act, render, screen, waitFor } from '@testing-library/react';
import { Post } from '@utils/Types/Types';
import { getPosts } from '@services/GetPosts/GetPosts';
import { showLoading } from '@utils/LoadingHelper/LoadingHelper';
import { Mock } from 'vitest';
import PostsContent from './PostsContent';

vi.mock('@services/GetPosts/GetPosts', () => ({
  getPosts: vi.fn(),
}));

vi.mock('@utils/LoadingHelper/LoadingHelper', () => ({
  showLoading: vi.fn(),
}));

describe('PostsContent', () => {
  const mockOnPostSelect = vi.fn();

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
      coverImageUrl: 'http://example.com/image1.jpg',
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
      coverImageUrl: 'http://example.com/image2.jpg',
    },
  ];

  it('should display a generic error message if fetching data fails', async () => {
    const errorMessage = 'Erro ao carregar os dados da API';
    (getPosts as Mock).mockRejectedValue(new Error('Erro no servidor'));

    render(<PostsContent onPostSelect={mockOnPostSelect} />);

    expect(showLoading).toHaveBeenCalled();
    const error = await screen.findByText(errorMessage);
    expect(error).toBeInTheDocument();
  });

  it('should display an error message if fetching data fails', async () => {
    const errorMessage = 'Erro ao carregar os dados da API';
    (getPosts as Mock).mockRejectedValue(new Error(errorMessage));
    (showLoading as Mock).mockRejectedValue(new Error(errorMessage));

    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(<PostsContent onPostSelect={mockOnPostSelect} />);

    expect(showLoading).toHaveBeenCalled();
    const error = await screen.findByText(errorMessage);
    expect(error).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });

  it('should display post data when fetching is successful', async () => {
    (getPosts as Mock).mockResolvedValue(mockPosts);
    (showLoading as Mock).mockImplementation(promise => promise);

    await act(async () => {
      render(<PostsContent onPostSelect={mockOnPostSelect} />);
    });

    expect(showLoading).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByText('First Post')).toBeInTheDocument();
      expect(screen.getByText('Subtitle of First Post')).toBeInTheDocument();
      expect(screen.getByText('Autor : Author One')).toBeInTheDocument();
      expect(screen.getByText('Second Post')).toBeInTheDocument();
      expect(screen.getByText('Subtitle of Second Post')).toBeInTheDocument();
      expect(screen.getByText('Autor : Author Two')).toBeInTheDocument();
    });
  });

  it('should display posts data sorted by date with the most recent first', async () => {
    (getPosts as Mock).mockResolvedValue(mockPosts);
    (showLoading as Mock).mockImplementation(promise => promise);

    await act(async () => {
      render(<PostsContent onPostSelect={mockOnPostSelect} />);
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

  it('should match snapshot', async () => {
    await act(async () => {
      const { asFragment } = render(
        <PostsContent onPostSelect={mockOnPostSelect} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
