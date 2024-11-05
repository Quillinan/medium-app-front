import { deletePost } from '@services/DeletePost/DeletePost';
import React from 'react';
import Swal from 'sweetalert2';

interface DeleteButtonProps {
  postId: string;
  onDeleteSuccess: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  postId,
  onDeleteSuccess,
}) => {
  const handleDelete = async () => {
    const confirmation = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Você realmente quer deletar este post?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, deletar',
      cancelButtonText: 'Cancelar',
    });

    if (confirmation.isConfirmed) {
      const result = await deletePost(postId);

      if (!result) {
        Swal.fire({
          title: 'Sucesso',
          text: 'Post deletado com sucesso!',
          icon: 'success',
        }).then(() => {
          onDeleteSuccess();
          window.location.reload();
        });
      } else {
        console.error('Erro ao excluir o post:', result);
        Swal.fire({
          title: 'Erro',
          text: result.message || 'Não foi possível excluir o post.',
          icon: 'error',
        });
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className='bg-red-500 text-white rounded px-4 py-1'
    >
      Apagar
    </button>
  );
};

export default DeleteButton;
