import BirthdayContent from '../BirthdayContent/BirthdayContent';
import CreatePostContent from '../CreatePostContent/CreatePostContent';
import PostsContent from '../PostsContent/PostsContent';
import PostInfoContent from '../PostInfoContent/PostInfoContent'; // Importe seu componente PostInfoContent
import { Post } from '@utils/Types/Types';

interface MainContentProps {
  currentTab: string;
  setCoverImage: (file: File | null) => void;
  coverImage: File | null;
  selectedPost: Post | null; // Prop para o post selecionado
  setSelectedPost: (post: Post | null) => void; // Função para atualizar o post selecionado
}

const MainContent: React.FC<MainContentProps> = ({
  currentTab,
  setCoverImage,
  coverImage,
  selectedPost,
  setSelectedPost,
}) => {
  const renderContent = () => {
    if (selectedPost) {
      return <PostInfoContent post={selectedPost} />; // Exibe PostInfoContent se houver um post selecionado
    }

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
        return (
          <PostsContent onPostSelect={setSelectedPost} /> // Passa a função para selecionar o post
        );
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
