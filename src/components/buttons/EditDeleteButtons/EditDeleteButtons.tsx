import DeleteButton from '@components/buttons/DeleteButton/DeleteButton';

interface EditDeleteButtonsProps {
  isEditing: boolean;
  onToggleEdit: () => void;
  onSave: () => void;
  postId: string;
}

const EditDeleteButtons: React.FC<EditDeleteButtonsProps> = ({
  isEditing,
  onToggleEdit,
  onSave,
  postId,
}) => {
  return (
    <div className='w-1/2 flex justify-end space-x-4 mt-6'>
      {isEditing ? (
        <>
          <button
            className='bg-red-500 text-white rounded px-4 py-1'
            onClick={onToggleEdit}
          >
            Cancelar
          </button>
          <button
            className='bg-blue-500 text-white rounded px-4 py-1'
            onClick={onSave}
          >
            Salvar
          </button>
        </>
      ) : (
        <>
          <button
            className='bg-yellow-500 text-white rounded px-4 py-1'
            onClick={onToggleEdit}
          >
            Editar
          </button>
          <DeleteButton postId={postId} onDeleteSuccess={() => {}} />
        </>
      )}
    </div>
  );
};

export default EditDeleteButtons;
