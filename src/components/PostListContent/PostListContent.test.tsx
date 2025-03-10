import { render, screen } from '@testing-library/react';
import { Post } from '@utils/Types/Types';
import PostListContent from './PostListContent';

describe('PostContentList', () => {
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
      coverImageUrl: 'http://example.com/image1.jpg',
    },
    {
      id: 2,
      title: 'Second Post',
      subtitle: 'Subtitle of Second Post',
      content: 'This is the content of the second post.',
      createdAt: new Date('2024-10-28T00:00:00Z'),
      updatedAt: new Date('2024-10-28T00:00:00Z'),
      authorId: '456',
      authorName: 'Author Two',
      coverImageUrl: 'http://example.com/image2.jpg',
    },
  ];

  const mockOnPostSelect = vi.fn();

  it('should render nothing if there are no posts', () => {
    render(<PostListContent data={[]} onPostSelect={mockOnPostSelect} />);

    expect(screen.queryByText('First Post')).not.toBeInTheDocument();
    expect(screen.queryByText('Second Post')).not.toBeInTheDocument();
  });

  it('should render the list of posts', () => {
    render(
      <PostListContent data={mockPosts} onPostSelect={mockOnPostSelect} />
    );

    expect(screen.getByText('First Post')).toBeInTheDocument();
    expect(screen.getByText('Subtitle of First Post')).toBeInTheDocument();
    expect(screen.getByText('Criado em: 29/10/2024')).toBeInTheDocument();
    expect(screen.getByText('Autor : Author One')).toBeInTheDocument();

    expect(screen.getByText('Second Post')).toBeInTheDocument();
    expect(screen.getByText('Subtitle of Second Post')).toBeInTheDocument();
    expect(screen.getByText('Criado em: 28/10/2024')).toBeInTheDocument();
    expect(screen.getByText('Autor : Author Two')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { asFragment } = render(
      <PostListContent data={mockPosts} onPostSelect={mockOnPostSelect} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
