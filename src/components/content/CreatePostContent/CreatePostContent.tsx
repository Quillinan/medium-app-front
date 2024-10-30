import ImageDropzone from '@components/ImageDropzone/ImageDropzone';
import SubtitleInput from '@components/SubtitleInput/SubtitleInput';
import TitleInput from '@components/TitleInput/TitleInput';
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePostContent: React.FC = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState<string | null>(null);

  const saveDraft = () => {
    const draft = { title, subtitle, content, coverImage };
    localStorage.setItem('draftPost', JSON.stringify(draft));
  };

  useEffect(() => {
    const draft = localStorage.getItem('draftPost');
    if (draft) {
      const { title, subtitle, content, coverImage } = JSON.parse(draft);
      setTitle(title);
      setSubtitle(subtitle);
      setContent(content);
      setCoverImage(coverImage);
    }

    return () => {
      if (coverImage) URL.revokeObjectURL(coverImage);
    };
  }, [coverImage]);

  return (
    <div data-testId='create-post-content' className='flex flex-col h-full p-4'>
      <TitleInput title={title} onTitleChange={setTitle} />
      <SubtitleInput subtitle={subtitle} onSubtitleChange={setSubtitle} />
      <ImageDropzone
        coverImage={coverImage}
        onImageUpload={setCoverImage}
        onImageRemove={() => setCoverImage(null)}
      />
      <ReactQuill
        value={content}
        onChange={setContent}
        className='mb-6'
        style={{ height: '15em', overflowY: 'auto' }} // O ReactQuill deve ter um comportamento correto aqui
      />
      <div className='flex justify-center'>
        <button
          onClick={saveDraft}
          className='mt-4 bg-blue-500 text-white rounded px-2 py-1'
        >
          Publicar Post
        </button>
      </div>
    </div>
  );
};

export default CreatePostContent;
