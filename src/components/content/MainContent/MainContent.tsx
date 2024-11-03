import BirthdayContent from '../BirthdayContent/BirthdayContent';
import CreatePostContent from '../CreatePostContent/CreatePostContent';
import PostsContent from '../PostsContent/PostsContent';

interface MainContentProps {
  currentTab: string;
  setCoverImage: (file: File | null) => void;
  coverImage: File | null;
}

const MainContent: React.FC<MainContentProps> = ({
  currentTab,
  setCoverImage,
  coverImage,
}) => {
  const renderContent = () => {
    switch (currentTab) {
      case 'Criar Post':
        return (
          <CreatePostContent
            setCoverImage={setCoverImage}
            coverImage={coverImage}
          />
        );
      case 'Aniversários':
        return <BirthdayContent />;
      default:
        return <PostsContent />;
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
