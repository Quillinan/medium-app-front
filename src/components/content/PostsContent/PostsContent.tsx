import React, { useEffect, useState, useCallback } from 'react';
import { Post, ErrorResponse } from '@utils/Types/Types';
import { getPosts } from '@services/GetPosts/GetPosts';
import PostContentList from '@components/PostContentList/PostContent';
import { showLoading } from '@utils/LoadingHelper/LoadingHelper';

const PostsContent: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await showLoading(getPosts());

      if ((response as ErrorResponse).code) {
        setError((response as ErrorResponse).message || 'Erro desconhecido');
      } else {
        setData(response as Post[]);
      }
    } catch (error) {
      setError('Erro ao carregar os dados da API');
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div
      data-testid='posts-content'
      className='flex items-center justify-center h-full mt-4'
    >
      {error ? <p>{error}</p> : <PostContentList data={data} />}
    </div>
  );
};

export default PostsContent;
