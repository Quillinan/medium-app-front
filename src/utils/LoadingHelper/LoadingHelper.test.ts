import Swal from 'sweetalert2';
import { showLoading } from './LoadingHelper';
import { Mock } from 'vitest';

vi.mock('sweetalert2', async () => {
  const original =
    await vi.importActual<typeof import('sweetalert2')>('sweetalert2');
  return {
    ...original,
    default: {
      fire: vi.fn(),
      close: vi.fn(),
      showLoading: vi.fn(),
    },
  };
});

describe('showLoading', () => {
  it('should close the modal and throw an error when the promise rejects', async () => {
    const mockPromise = Promise.reject(new Error('Test error'));

    await expect(showLoading(mockPromise)).rejects.toThrow('Test error');

    expect(Swal.close).toHaveBeenCalled();
  });

  it('should display the loading modal and close it when the promise resolves', async () => {
    const mockShowLoading = vi.fn();

    (Swal.fire as Mock).mockImplementation(({ didOpen }) => {
      if (didOpen) didOpen();
      return { showLoading: mockShowLoading };
    });

    const mockPromise = Promise.resolve('success');

    const result = await showLoading(mockPromise);

    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Carregando...',
      html: 'Aguarde enquanto os dados são carregados.',
      allowOutsideClick: false,
      didOpen: expect.any(Function),
    });

    expect(Swal.showLoading).toHaveBeenCalled();

    expect(Swal.close).toHaveBeenCalled();

    expect(result).toBe('success');
  });
});
