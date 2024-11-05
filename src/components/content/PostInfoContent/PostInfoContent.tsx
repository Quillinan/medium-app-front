import React, { useState, useContext } from 'react';
import { Post, EditPostData } from '@utils/Types/Types';
import { AuthContext } from '@context/AuthContext/AuthContext';
import CreatePostContent from '../CreatePostContent/CreatePostContent';
import EditDeleteButtons from '@components/buttons/EditDeleteButtons/EditDeleteButtons';
import { editPost } from '@services/EditPost/EditPost';

interface PostInfoContentProps {
  post: Post;
}

const PostInfoContent: React.FC<PostInfoContentProps> = ({ post }) => {
  const authContext = useContext(AuthContext);
  const userId = authContext?.uniqueId;
  const [isEditing, setIsEditing] = useState(false);
  const [postData, setPostData] = useState<EditPostData>({
    title: post.title,
    subtitle: post.subtitle,
    content: post.content,
    coverImage: null,
  });

  const handleSave = async () => {
    console.log('Salvei!');
    try {
      const response = await editPost(postData, String(post.id));
      if (response) {
        console.log('Post atualizado com sucesso:', response);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Erro ao atualizar o post:', error);
    }
  };

  return (
    <div className='flex flex-col items-center w-full'>
      {userId === post.authorId && (
        <EditDeleteButtons
          isEditing={isEditing}
          onToggleEdit={() => setIsEditing(!isEditing)}
          onSave={handleSave}
          postId={String(post.id)}
        />
      )}

      {isEditing ? (
        <CreatePostContent
          setCoverImage={image =>
            setPostData(prevData => ({ ...prevData, coverImage: image }))
          }
          coverImage={postData.coverImage || null}
          initialPostData={{
            title: postData.title || '',
            subtitle: postData.subtitle || '',
            content: postData.content || '',
            coverImageUrl: post.coverImageUrl,
          }}
          isEditing={true}
        />
      ) : (
        <div className='flex flex-col h-full p-4 space-y-4 w-1/3 mt-6'>
          <h1 className='font-bold mb-3' style={{ fontSize: '42px' }}>
            {post.title}
          </h1>
          <h2 className='text-gray-700 mb-2' style={{ fontSize: '22px' }}>
            {post.subtitle}
          </h2>
          <p className='mt-4 text-gray-500' style={{ fontSize: '16px' }}>
            Autor: {post.authorName} | Criado em:{' '}
            {new Date(post.createdAt).toLocaleDateString('pt-BR')}
          </p>
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
            className='mt-4 w-full'
            style={{ fontSize: '20px' }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      )}
    </div>
  );
};

export default PostInfoContent;
