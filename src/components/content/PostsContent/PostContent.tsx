import React, { useEffect, useState } from 'react';
import { Post, ErrorResponse } from '@utils/Types/Types';
import { getPosts } from '@services/GetPosts/GetPosts';

const PostsContent: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<ErrorResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPosts();

      if ((data as ErrorResponse).code) {
        setError(data as ErrorResponse);
      } else {
        setPosts(data as Post[]);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Erro ao carregar posts: {error.message}</div>;
  }

  return (
    <div data-testid='posts-content' className='space-y-8'>
      {posts.map(post => (
        <div
          key={post.id}
          className='flex flex-col border-b border-gray-200 pb-8'
        >
          <h2 className='mt-1 text-2xl font-semibold text-gray-900'>
            {post.title}
          </h2>
          <p className='mt-2 text-gray-700'>{post.content.slice(0, 100)}...</p>
          <p className='mt-1 text-sm text-gray-500'>
            Criado em: {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <p className='mt-1 text-sm text-gray-500'>
            Autor ID: {post.authorId}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PostsContent;
