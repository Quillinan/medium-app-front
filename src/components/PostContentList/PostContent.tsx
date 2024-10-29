import { Post } from '@utils/Types/Types';

interface PostContentListProps {
  data: Post[];
}

const PostContentList: React.FC<PostContentListProps> = ({ data }) => {
  return (
    <div className='space-y-8'>
      {data.map(post => (
        <div
          key={post.id}
          className='flex flex-col border-b border-gray-200 pb-8'
        >
          <h2 className='mt-1 text-2xl font-semibold text-gray-900'>
            {post.title}
          </h2>
          <p className='mt-2 text-gray-700'>{post.subtitle}</p>
          <p className='mt-1 text-sm text-gray-500'>
            Criado em: {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <p className='mt-1 text-sm text-gray-500'>Autor: {post.authorName}</p>
        </div>
      ))}
    </div>
  );
};

export default PostContentList;
