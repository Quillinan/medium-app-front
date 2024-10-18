import Swal from 'sweetalert2';

export const showLoading = async <T>(promise: Promise<T>): Promise<T> => {
  Swal.fire({
    title: 'Carregando...',
    html: 'Aguarde enquanto os dados são carregados.',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    const result = await promise;
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    Swal.close();
  }
};
