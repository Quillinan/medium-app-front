import React, { useEffect, useState, useCallback } from 'react';
import { Post, ErrorResponse } from '@utils/Types/Types';
import { getPosts } from '@services/GetPosts/GetPosts';
import PostContentList from '@components/PostContentList/PostContent';

const PostsContent: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await getPosts();

      if ((response as ErrorResponse).code) {
        setError((response as ErrorResponse).message || 'Erro desconhecido');
      } else {
        setData(response as Post[]);
      }
    } catch (err) {
      setError('Erro ao carregar os dados da API');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div
      data-testid='posts-content'
      className='flex items-center justify-center h-full'
    >
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <PostContentList data={data} />
      )}
    </div>
  );
};

export default PostsContent;
