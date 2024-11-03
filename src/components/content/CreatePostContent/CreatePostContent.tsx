import ImageDropzone from '@components/ImageDropzone/ImageDropzone';
import SubtitleInput from '@components/SubtitleInput/SubtitleInput';
import TitleInput from '@components/TitleInput/TitleInput';
import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface CreatePostContentProps {
  setCoverImage: (file: File | null) => void;
  coverImage: File | null;
}

const CreatePostContent: React.FC<CreatePostContentProps> = ({
  setCoverImage,
  coverImage,
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const quillRef = useRef<ReactQuill>(null);

  const saveDraft = () => {
    const draft = { title, subtitle, content };
    localStorage.setItem('draftPost', JSON.stringify(draft));
  };

  const loadDraft = () => {
    const draft = JSON.parse(localStorage.getItem('draftPost') || '{}');
    if (draft) {
      setTitle(draft.title || '');
      setSubtitle(draft.subtitle || '');
      setContent(draft.content || '');
    }
  };

  useEffect(() => {
    loadDraft();
  }, []);

  useEffect(() => {
    if (title || subtitle || content) {
      saveDraft();
    }
  }, [title, subtitle, content]);

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      editor.root.style.minHeight = '200px';
    }
  }, [quillRef.current]);

  const handleImageUpload = (image: File) => {
    setCoverImage(image);
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
        coverImage={coverImage}
        onImageUpload={handleImageUpload}
        onImageRemove={() => setCoverImage(null)}
      />
    </div>
  );
};

export default CreatePostContent;
