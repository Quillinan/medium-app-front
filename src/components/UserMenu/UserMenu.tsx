import { useAuth } from '@auth/useAuth';
import IconButton from '@components/buttons/IconButton/IconButton';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FiLogOut } from 'react-icons/fi'; // Importa o ícone de logout

const UserMenu: React.FC = () => {
  const { removeAuth } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedName = sessionStorage.getItem('name');
    setUserName(storedName);
  }, []);

  const logout = () => {
    removeAuth();
    navigate('/login');
  };

  return (
    <div className='hidden md:block'>
      <div className='ml-4 flex items-center md:ml-6'>
        {userName ? (
          <span className='mr-4 text-gray-300 font-medium'>{userName}</span>
        ) : (
          <span className='mr-4 text-gray-300 italic'>Usuário</span>
        )}
        <IconButton
          onClick={logout}
          icon={<FiLogOut className='text-xl text-gray-300' />}
        />
      </div>
    </div>
  );
};

export default UserMenu;
