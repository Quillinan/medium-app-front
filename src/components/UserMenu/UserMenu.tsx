import { useAuth } from '@auth/useAuth';
import IconButton from '@components/IconButton/IconButton';
import { useNavigate } from 'react-router-dom';

const UserMenu: React.FC = () => {
  const { removeAuth } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    removeAuth();
    navigate('/login');
  };

  return (
    <div className='hidden md:block'>
      <div className='ml-4 flex items-center md:ml-6'>
        <IconButton
          onClick={logout}
          icon={
            <img
              className='h-8 w-8 rounded-full'
              src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
              alt='User'
            />
          }
        />
      </div>
    </div>
  );
};

export default UserMenu;
