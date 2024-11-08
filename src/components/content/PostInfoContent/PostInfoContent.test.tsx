import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostInfoContent from './PostInfoContent';
import { editPost } from '@services/EditPost/EditPost';
import { AuthContext } from '@context/AuthContext/AuthContext';
import { Post } from '@utils/Types/Types';
import { Mock, vi } from 'vitest';

vi.mock('@services/EditPost/EditPost', () => ({
  editPost: vi.fn(),
}));

const mockPost: Post = {
  id: 1,
  title: 'Test Title',
  subtitle: 'Test Subtitle',
  content: '<p>Test Content</p>',
  createdAt: new Date(),
  updatedAt: new Date(),
  authorId: '12345',
  authorName: 'Test Author',
  coverImageUrl: '',
};

const mockAuthContext = {
  setAuth: vi.fn(),
  removeAuth: vi.fn(),
  token: 'mockToken',
  uniqueId: '12345',
  name: 'Mock User',
};

describe('PostInfoContent Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeAll(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    (console.error as Mock).mockRestore();
  });

  it('displays error message if editPost fails', async () => {
    const mockError = new Error('Network Error');
    (editPost as Mock).mockRejectedValueOnce(mockError);

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <PostInfoContent post={mockPost} />
      </AuthContext.Provider>
    );

    const editButton = screen.getByRole('button', { name: /Editar/i });
    fireEvent.click(editButton);

    const saveButton = screen.getByRole('button', { name: /Salvar/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Erro ao atualizar o post:/i)
      ).toBeInTheDocument();
    });
  });

  it('renders post content in view mode', () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <PostInfoContent post={mockPost} />
      </AuthContext.Provider>
    );

    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockPost.subtitle)).toBeInTheDocument();

    expect(
      screen.getByText(
        new RegExp(`Autor: ${mockPost.authorName} \\| Criado em:.*`)
      )
    ).toBeInTheDocument();
  });

  it('allows the author to switch to edit mode', () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <PostInfoContent post={mockPost} />
      </AuthContext.Provider>
    );

    const editButton = screen.getByRole('button', { name: /Editar/i });
    fireEvent.click(editButton);

    expect(screen.getByDisplayValue(mockPost.title)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockPost.subtitle)).toBeInTheDocument();
  });

  it('calls editPost and saves changes when the save button is clicked', async () => {
    const mockUpdatedTitle = 'Updated Title';
    (editPost as jest.Mock).mockResolvedValue({
      ...mockPost,
      title: mockUpdatedTitle,
    });

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <PostInfoContent post={mockPost} />
      </AuthContext.Provider>
    );

    const editButton = screen.getByRole('button', { name: /Editar/i });
    fireEvent.click(editButton);

    const titleInput = screen.getByDisplayValue(mockPost.title);
    fireEvent.change(titleInput, { target: { value: mockUpdatedTitle } });

    const saveButton = screen.getByRole('button', { name: /Salvar/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(editPost).toHaveBeenCalledWith(
        expect.objectContaining({ title: mockUpdatedTitle }),
        String(mockPost.id)
      );
    });
  });

  it('should match snapshot', () => {
    const { asFragment } = render(
      <AuthContext.Provider value={mockAuthContext}>
        <PostInfoContent post={mockPost} />
      </AuthContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
