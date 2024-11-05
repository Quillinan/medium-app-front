import React, { useEffect, useState, useCallback } from 'react';
import { Post, ErrorResponse } from '@utils/Types/Types';
import { getPosts } from '@services/GetPosts/GetPosts';
import { showLoading } from '@utils/LoadingHelper/LoadingHelper';
import PostListContent from '@components/PostListContent/PostListContent';
import Swal from 'sweetalert2';

interface PostsContentProps {
  onPostSelect: (post: Post) => void;
}

const PostsContent: React.FC<PostsContentProps> = ({ onPostSelect }) => {
  const [data, setData] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [alertShown, setAlertShown] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await showLoading(getPosts());

      if ((response as ErrorResponse).code) {
        setError((response as ErrorResponse).message || 'Erro desconhecido');
        if (!alertShown) {
          Swal.fire({
            title: 'Erro',
            text: (response as ErrorResponse).message || 'Erro desconhecido',
            icon: 'error',
          });
          setAlertShown(true);
        }
      } else {
        setData(response as Post[]);
        setAlertShown(false);
      }
    } catch (error) {
      setError('Erro ao carregar os dados da API');
      console.error(error);
    }
  }, [alertShown]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div
      data-testid='posts-content'
      className='flex items-center justify-center h-full mt-9'
    >
      {error ? (
        <p>{error}</p>
      ) : (
        <PostListContent data={data} onPostSelect={onPostSelect} />
      )}
    </div>
  );
};

export default PostsContent;
