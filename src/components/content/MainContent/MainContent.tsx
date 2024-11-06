import { Post } from '@utils/Types/Types';
import { useMemo, useState } from 'react';
import PostInfoContent from '../PostInfoContent/PostInfoContent';
import CreatePostContent from '../CreatePostContent/CreatePostContent';
import BirthdayContent from '../BirthdayContent/BirthdayContent';
import PostsContent from '../PostsContent/PostsContent';

interface MainContentProps {
  currentTab: string;
  setCoverImage: (file: File | null) => void;
  coverImage: File | null;
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
}

const MainContent: React.FC<MainContentProps> = ({
  currentTab,
  setCoverImage,
  coverImage,
  selectedPost,
  setSelectedPost,
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');

  const coverImageUrl = useMemo(() => {
    return coverImage ? URL.createObjectURL(coverImage) : undefined;
  }, [coverImage]);

  const renderContent = () => {
    if (selectedPost) {
      return <PostInfoContent post={selectedPost} />;
    }

    switch (currentTab) {
      case 'Criar Post':
        return (
          <CreatePostContent
            setCoverImage={setCoverImage}
            coverImage={coverImage}
            initialPostData={{
              title,
              subtitle,
              content,
              coverImageUrl,
            }}
            isEditing={false}
            onTitleChange={setTitle}
            onSubtitleChange={setSubtitle}
            onContentChange={setContent}
          />
        );
      case 'Aniversários':
        return <BirthdayContent />;
      default:
        return <PostsContent onPostSelect={setSelectedPost} />;
    }
  };

  return (
    <main
      data-testid='main-content'
      className='flex justify-center items-center h-full'
    >
      {renderContent()}
    </main>
  );
};

export default MainContent;
