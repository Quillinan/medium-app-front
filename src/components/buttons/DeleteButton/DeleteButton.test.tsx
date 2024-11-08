import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DeleteButton from './DeleteButton';
import { deletePost } from '@services/DeletePost/DeletePost';
import Swal from 'sweetalert2';
import { Mock } from 'vitest';

vi.mock('@services/DeletePost/DeletePost');
vi.mock('sweetalert2');

describe('DeleteButton', () => {
  const mockOnDeleteSuccess = vi.fn();

  beforeEach(() => {
    mockOnDeleteSuccess.mockClear();
    (Swal.fire as Mock).mockClear();
    (deletePost as Mock).mockClear();
    (Swal.fire as Mock).mockResolvedValue({ isConfirmed: true });
  });

  beforeAll(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    (console.error as Mock).mockRestore();
  });

  it('should not call deletePost if cancellation is confirmed', async () => {
    (Swal.fire as Mock).mockResolvedValueOnce({ isConfirmed: false });

    render(<DeleteButton postId='1' onDeleteSuccess={mockOnDeleteSuccess} />);

    fireEvent.click(screen.getByText(/Apagar/i));

    await waitFor(() =>
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Tem certeza?',
          text: 'Você realmente quer deletar este post?',
        })
      )
    );

    expect(deletePost).not.toHaveBeenCalled();
    expect(mockOnDeleteSuccess).not.toHaveBeenCalled();
  });

  it('should show error alert if deletePost fails', async () => {
    (deletePost as Mock).mockResolvedValue({ message: 'Erro de rede' });

    render(<DeleteButton postId='1' onDeleteSuccess={mockOnDeleteSuccess} />);

    fireEvent.click(screen.getByText(/Apagar/i));

    await waitFor(() =>
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Tem certeza?',
          text: 'Você realmente quer deletar este post?',
        })
      )
    );

    (Swal.fire as Mock).mockResolvedValueOnce({ isConfirmed: true });

    await waitFor(() => expect(deletePost).toHaveBeenCalledWith('1'));
    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Erro',
      text: 'Erro de rede',
      icon: 'error',
    });
    expect(mockOnDeleteSuccess).not.toHaveBeenCalled();
  });

  it('should show success alert and call onDeleteSuccess when post is deleted', async () => {
    (deletePost as Mock).mockResolvedValue(null);

    render(<DeleteButton postId='1' onDeleteSuccess={mockOnDeleteSuccess} />);

    fireEvent.click(screen.getByText(/Apagar/i));

    await waitFor(() =>
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Tem certeza?',
          text: 'Você realmente quer deletar este post?',
        })
      )
    );

    (Swal.fire as Mock).mockResolvedValueOnce({ isConfirmed: true });

    await waitFor(() => expect(deletePost).toHaveBeenCalledWith('1'));
    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Sucesso',
      text: 'Post deletado com sucesso!',
      icon: 'success',
    });
    expect(mockOnDeleteSuccess).toHaveBeenCalled();
  });

  it('should match snapshot', () => {
    const { asFragment } = render(
      <DeleteButton postId='1' onDeleteSuccess={mockOnDeleteSuccess} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
