import BirthdayContent from '../BirthdayContent/BirthdayContent';
import CreatePostContent from '../CreatePostContent/CreatePostContent';
import PostsContent from '../PostsContent/PostsContent';

const MainContent: React.FC<{ currentTab: string }> = ({ currentTab }) => {
  const renderContent = () => {
    switch (currentTab) {
      case 'Criar Post':
        return <CreatePostContent />;
      case 'Aniversários':
        return <BirthdayContent />;
      default:
        return <PostsContent />;
    }
  };

  return (
    <main data-testid='main-content' className='flex-1 overflow-y-auto h-full'>
      {renderContent()}
    </main>
  );
};

export default MainContent;
