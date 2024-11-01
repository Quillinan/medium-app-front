import Swal from 'sweetalert2';
import { CreatePostData } from '@utils/Types/Types';
import { createPost } from '@services/CreatePost/CreatePost';

interface HeaderProps {
  title: string;
  coverImage: File | null;
  setCoverImage: (file: File | null) => void;
  onTabChange: (tab: string) => void; // Adiciona a função onTabChange como prop
}

const Header: React.FC<HeaderProps> = ({
  title,
  coverImage,
  setCoverImage,
  onTabChange,
}) => {
  const createPostHandler = async () => {
    const draft = localStorage.getItem('draftPost');
    if (!draft) {
      console.error('Nenhum rascunho encontrado.');
      return;
    }

    const { title, subtitle, content } = JSON.parse(draft);
    const userId = sessionStorage.getItem('uniqueId') ?? 'erro';
    const username = sessionStorage.getItem('name') ?? 'erro';

    if (!userId || !username) {
      Swal.fire({
        title: 'Erro',
        text: 'UserId ou Username não encontrados.',
        icon: 'error',
      });
      return;
    }

    const postData: CreatePostData = {
      title,
      subtitle,
      content,
      authorId: userId,
      authorName: username,
      coverImage,
    };

    // Chama a função createPost do serviço
    const result = await createPost(postData);

    if (result) {
      Swal.fire({
        title: 'Sucesso',
        text: 'Post criado com sucesso!',
        icon: 'success',
      });
      localStorage.removeItem('draftPost'); // Limpa o rascunho
      setCoverImage(null); // Reseta a imagem de capa

      // Força a navegação para a aba 'Posts'
      onTabChange('Posts');
    } else {
      Swal.fire({
        title: 'Erro',
        text: 'Não foi possível criar o post. Tente novamente.',
        icon: 'error',
      });
    }
  };

  return (
    <header data-testid='header' className='bg-white shadow'>
      <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center'>
        <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
          {title}
        </h1>
        {title === 'Criar Post' && (
          <button
            onClick={createPostHandler}
            className='bg-blue-500 text-white rounded px-4 py-1'
          >
            Publicar Post
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
