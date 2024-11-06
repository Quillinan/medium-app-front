import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import TitleInput from '@components/forms/TitleInput/TitleInput';
import SubtitleInput from '@components/forms/SubtitleInput/SubtitleInput';
import ImageDropzone from '@components/forms/ImageDropzone/ImageDropzone';

interface CreatePostContentProps {
  setCoverImage: (file: File | null) => void;
  coverImage: File | null;
  initialPostData?: {
    title: string;
    subtitle: string;
    content: string;
    coverImageUrl?: string;
  };
  isEditing?: boolean;
  onTitleChange: (newTitle: string) => void; // Adicionado
  onSubtitleChange: (newSubtitle: string) => void; // Adicionado
  onContentChange: (newContent: string) => void; // Adicionado
}

const CreatePostContent: React.FC<CreatePostContentProps> = ({
  setCoverImage,
  coverImage,
  initialPostData,
  isEditing = false,
  onTitleChange,
  onSubtitleChange,
  onContentChange,
}) => {
  const [title, setTitle] = useState(initialPostData?.title || '');
  const [subtitle, setSubtitle] = useState(initialPostData?.subtitle || '');
  const [content, setContent] = useState(initialPostData?.content || '');
  const [initialCoverImageUrl, setInitialCoverImageUrl] = useState<
    string | undefined
  >(initialPostData?.coverImageUrl);

  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    if (!isEditing) {
      const draft = JSON.parse(localStorage.getItem('draftPost') || '{}');
      if (draft) {
        setTitle(draft.title || '');
        setSubtitle(draft.subtitle || '');
        setContent(draft.content || '');
      }
    }
  }, [isEditing]);

  useEffect(() => {
    if (!isEditing && (title || subtitle || content)) {
      const draft = { title, subtitle, content };
      localStorage.setItem('draftPost', JSON.stringify(draft));
    }
  }, [title, subtitle, content, isEditing]);

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      editor.root.style.minHeight = '200px';
    }
  }, []);

  const handleImageUpload = (image: File) => {
    setCoverImage(image);
    setInitialCoverImageUrl(undefined);
  };

  return (
    <div
      data-testid='create-post-content'
      className='flex flex-col h-full p-4 space-y-4 w-1/2 mt-6'
    >
      <TitleInput
        title={title}
        onTitleChange={newTitle => {
          setTitle(newTitle);
          onTitleChange(newTitle); // Chama a função passada por prop
        }}
      />
      <SubtitleInput
        subtitle={subtitle}
        onSubtitleChange={newSubtitle => {
          setSubtitle(newSubtitle);
          onSubtitleChange(newSubtitle); // Chama a função passada por prop
        }}
      />
      <ReactQuill
        ref={quillRef}
        value={content}
        onChange={newContent => {
          setContent(newContent);
          onContentChange(newContent); // Chama a função passada por prop
        }}
      />
      <ImageDropzone
        coverImage={coverImage}
        initialCoverImageUrl={initialCoverImageUrl}
        onImageUpload={handleImageUpload}
        onImageRemove={() => {
          setCoverImage(null);
          setInitialCoverImageUrl(undefined);
        }}
      />
    </div>
  );
};

export default CreatePostContent;
