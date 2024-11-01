import BirthdayContent from '../BirthdayContent/BirthdayContent';
import CreatePostContent from '../CreatePostContent/CreatePostContent';
import PostsContent from '../PostsContent/PostsContent';

interface MainContentProps {
  currentTab: string;
  setCoverImage: (file: File | null) => void; // Função para atualizar a imagem de capa
  coverImage: File | null; // Estado atual da imagem de capa
}

const MainContent: React.FC<MainContentProps> = ({
  currentTab,
  setCoverImage,
  coverImage, // Recebe a imagem de capa
}) => {
  const renderContent = () => {
    switch (currentTab) {
      case 'Criar Post':
        return (
          <CreatePostContent
            setCoverImage={setCoverImage} // Passa a função para atualizar a imagem
            coverImage={coverImage} // Passa a imagem de capa atual
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
