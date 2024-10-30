import { useDropzone } from 'react-dropzone';

interface ImageDropzoneProps {
  coverImage: string | null;
  onImageUpload: (imageUrl: string) => void;
  onImageRemove: () => void;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  coverImage,
  onImageUpload,
  onImageRemove,
}) => {
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onImageUpload(imageUrl);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
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
          ? 'Clique para alterar a imagem de capa'
          : 'Arraste ou clique para adicionar uma imagem de capa'}
      </p>
      {coverImage && (
        <div className='relative mb-4'>
          <img src={coverImage} alt='Capa do post' className='w-full h-auto' />
          <button
            onClick={e => {
              e.stopPropagation();
              onImageRemove();
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
