import React, { useContext } from 'react';
import { Post } from '@utils/Types/Types';
import { AuthContext } from '@context/AuthContext/AuthContext';
import DeleteButton from '@components/buttons/DeleteButton/DeleteButton';

interface PostInfoContentProps {
  post: Post;
}

const PostInfoContent: React.FC<PostInfoContentProps> = ({ post }) => {
  const authContext = useContext(AuthContext);
  const userId = authContext?.uniqueId;
  return (
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 mb-8 flex flex-col items-center'>
      {userId === post.authorId && (
        <div className='w-full flex justify-end space-x-4'>
          <button className='bg-yellow-500 text-white rounded px-4 py-1'>
            Editar
          </button>
          <DeleteButton postId={String(post.id)} onDeleteSuccess={() => {}} />
        </div>
      )}
      <div className='w-2/4'>
        <h1 className='text-3xl font-bold mb-3'>{post.title}</h1>
        <h2 className='text-xl text-gray-700 mb-2'>{post.subtitle}</h2>
        <p className='mt-4 text-sm text-gray-500'>
          Autor : {post.authorName} | Criado em :{' '}
          {new Date(post.createdAt).toLocaleDateString('pt-BR')}
        </p>
      </div>
      {post.coverImageUrl && (
        <div className='flex justify-center mt-4'>
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className='w-full h-auto m-5'
          />
        </div>
      )}
      <div
        className='mt-4  w-2/4'
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};

export default PostInfoContent;
