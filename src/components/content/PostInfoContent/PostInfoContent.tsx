import React from 'react';
import { Post } from '@utils/Types/Types';

interface PostInfoContentProps {
  post: Post;
}

const PostInfoContent: React.FC<PostInfoContentProps> = ({ post }) => {
  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold'>{post.title}</h1>
      <h2 className='text-xl text-gray-700'>{post.subtitle}</h2>
      <p className='mt-2 text-sm text-gray-500'>
        Autor: {post.authorName} | Criado em:{' '}
        {new Date(post.createdAt).toLocaleDateString('pt-BR')}
      </p>
      {post.coverImageUrl && (
        <img
          src={post.coverImageUrl}
          alt={post.title}
          className='mt-4 w-full h-auto'
        />
      )}
      <div
        className='mt-4'
        dangerouslySetInnerHTML={{ __html: post.content }}
      />{' '}
    </div>
  );
};

export default PostInfoContent;
