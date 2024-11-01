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
          className='flex flex-col md:flex-row border-b border-gray-200 pb-8'
        >
          <div className='flex-1 pr-4'>
            <h2 className='mt-1 text-2xl font-semibold text-gray-900'>
              {post.title}
            </h2>
            <p className='mt-2 text-gray-700'>{post.subtitle}</p>
            <p className='mt-1 text-sm text-gray-500'>
              Criado em:{' '}
              {new Date(post.createdAt).toLocaleDateString('pt-BR', {
                timeZone: 'UTC',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })}{' '}
            </p>
            <p className='mt-1 text-sm text-gray-500'>
              Autor: {post.authorName}
            </p>
          </div>
          {post.coverImageUrl && (
            <div className='flex-shrink-0 mt-4 md:mt-0'>
              <img
                src={post.coverImageUrl}
                alt={post.title}
                className='h-40 object-cover'
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostContentList;
