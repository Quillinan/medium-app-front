import { useDropzone } from 'react-dropzone';

interface ImageDropzoneProps {
  coverImage: File | null; // Espera um arquivo ou null
  onImageUpload: (file: File) => void; // Função chamada quando uma imagem é carregada
  onImageRemove: () => void; // Função chamada quando a imagem é removida
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  coverImage,
  onImageUpload,
  onImageRemove,
}) => {
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]; // Pega o primeiro arquivo aceito
    if (file) {
      onImageUpload(file); // Chama a função de upload se um arquivo for selecionado
    }
  };

  // Configuração do dropzone
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] }, // Aceita qualquer tipo de imagem
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className='border-dashed border-2 border-gray-400 p-4 mb-4 text-center'
    >
      <input {...getInputProps()} />
      <p>
        {coverImage
          ? 'Clique para alterar a imagem de capa' // Mensagem se já houver uma imagem
          : 'Arraste ou clique para adicionar uma imagem de capa'}{' '}
        // Mensagem se não houver imagem
      </p>
      {coverImage && (
        <div className='relative mb-4'>
          <img
            src={URL.createObjectURL(coverImage)} // Cria URL para visualizar a imagem
            alt='Capa do post'
            className='w-full h-auto'
          />
          <button
            onClick={e => {
              e.stopPropagation(); // Evita que o clique no botão ative o dropzone
              onImageRemove(); // Chama a função para remover a imagem
            }}
            className='absolute top-2 right-2 bg-red-500 text-white p-1 rounded'
          >
            Remover
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageDropzone;
