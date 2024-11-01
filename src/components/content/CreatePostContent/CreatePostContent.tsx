import ImageDropzone from '@components/ImageDropzone/ImageDropzone';
import SubtitleInput from '@components/SubtitleInput/SubtitleInput';
import TitleInput from '@components/TitleInput/TitleInput';
import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface CreatePostContentProps {
  setCoverImage: (file: File | null) => void; // Função para atualizar a imagem de capa
  coverImage: File | null; // Estado atual da imagem de capa
}

const CreatePostContent: React.FC<CreatePostContentProps> = ({
  setCoverImage,
  coverImage,
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const quillRef = useRef<ReactQuill>(null);

  const saveDraft = () => {
    const draft = { title, subtitle, content };
    localStorage.setItem('draftPost', JSON.stringify(draft));
  };

  const loadDraft = () => {
    const draft = localStorage.getItem('draftPost');
    if (draft) {
      const { title, subtitle, content } = JSON.parse(draft);
      setTitle(title);
      setSubtitle(subtitle);
      setContent(content);
    }
    setIsLoaded(true);
  };

  useEffect(() => {
    loadDraft();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveDraft();
    }
  }, [title, subtitle, content, isLoaded]);

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      editor.root.style.minHeight = '200px'; // Define a altura mínima
    }
  }, [quillRef.current]);

  const handleImageUpload = (image: File) => {
    setCoverImage(image); // Atualiza a imagem de capa
  };

  return (
    <div
      data-testid='create-post-content'
      className='flex flex-col h-full p-4 space-y-4 w-1/2'
    >
      <TitleInput title={title} onTitleChange={setTitle} />
      <SubtitleInput subtitle={subtitle} onSubtitleChange={setSubtitle} />
      <ReactQuill ref={quillRef} value={content} onChange={setContent} />
      <ImageDropzone
        coverImage={coverImage} // Passa a imagem de capa atual
        onImageUpload={handleImageUpload} // Passa a função de upload
        onImageRemove={() => setCoverImage(null)} // Função para remover a imagem
      />
    </div>
  );
};

export default CreatePostContent;
