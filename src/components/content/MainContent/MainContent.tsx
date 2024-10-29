import BirthdayContent from '../BirthdayContent/BirthdayContent';
import PostsContent from '../PostsContent/PostContent';

const MainContent: React.FC<{ currentTab: string }> = ({ currentTab }) => {
  const renderContent = () => {
    switch (currentTab) {
      case 'Criar Post':
        return <div>Conteúdo da aba Criar Post</div>;
      case 'Aniversários':
        return <BirthdayContent />;
      default:
        return <PostsContent />;
    }
  };

  return (
    <main data-testid='main-content'>
      <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
        {renderContent()}
      </div>
    </main>
  );
};

export default MainContent;
