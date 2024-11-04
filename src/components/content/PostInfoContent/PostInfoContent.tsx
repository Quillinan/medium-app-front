import React from 'react';
import { Post } from '@utils/Types/Types';

interface PostInfoContentProps {
  post: Post;
}

const PostInfoContent: React.FC<PostInfoContentProps> = ({ post }) => {
  return (
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 mb-8 flex flex-col items-center'>
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
        className='mt-4 text-center w-2/4'
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};

export default PostInfoContent;
