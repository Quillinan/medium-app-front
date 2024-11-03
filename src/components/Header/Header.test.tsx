import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';
import Swal from 'sweetalert2';
import { createPost } from '@services/CreatePost/CreatePost';

vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn(),
  },
}));

vi.mock('@services/CreatePost/CreatePost', () => ({
  createPost: vi.fn(),
}));

describe('Header Component', () => {
  const mockSetCoverImage = vi.fn();
  const mockOnTabChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    sessionStorage.clear();
  });

  it('should handle post creation and change tab after user confirms success', async () => {
    localStorage.setItem(
      'draftPost',
      JSON.stringify({
        title: 'Test Title',
        subtitle: 'Test Subtitle',
        content: 'Test Content',
      })
    );
    sessionStorage.setItem('uniqueId', 'mock-userId');
    sessionStorage.setItem('name', 'mock-username');
    (createPost as jest.Mock).mockResolvedValue(true);
    (Swal.fire as jest.Mock).mockResolvedValue({ isConfirmed: true });

    render(
      <Header
        title='Criar Post'
        coverImage={null}
        setCoverImage={mockSetCoverImage}
        onTabChange={mockOnTabChange}
      />
    );

    const buttonElement = screen.getByRole('button', {
      name: /Publicar Post/i,
    });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        title: 'Sucesso',
        text: 'Post criado com sucesso!',
        icon: 'success',
      });
    });

    expect(localStorage.getItem('draftPost')).toBeNull();
    expect(mockSetCoverImage).toHaveBeenCalledWith(null);
    expect(mockOnTabChange).toHaveBeenCalledWith('Posts');
  });

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Header
        title='Criar Post'
        coverImage={null}
        setCoverImage={mockSetCoverImage}
        onTabChange={mockOnTabChange}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
