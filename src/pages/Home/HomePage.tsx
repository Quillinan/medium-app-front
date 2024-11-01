import { useAuth } from '@auth/useAuth';
import MainContent from '@components/content/MainContent/MainContent';
import Header from '@components/Header/Header';
import NavBar from '@components/NavBar/NavBar';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { removeAuth } = useAuth();
  const navigate = useNavigate();
  const auth = sessionStorage.getItem('isAuthenticated');
  const [currentTab, setCurrentTab] = useState('Posts');
  const [coverImage, setCoverImage] = useState<File | null>(null); // Estado para a imagem de capa

  const logout = () => {
    removeAuth();
    navigate('/login');
  };

  useEffect(() => {
    if (!auth) {
      logout();
    }
  }, [auth]);

  return (
    <div id='app' className='flex flex-col min-h-screen'>
      <NavBar currentTab={currentTab} onTabChange={setCurrentTab} />
      <Header
        title={
          currentTab === 'Aniversários' ? 'Aniversários do mês' : currentTab
        }
        onTabChange={setCurrentTab} // Passa a função onTabChange para o Header
        coverImage={coverImage} // Passa a imagem de capa para o Header
        setCoverImage={setCoverImage} // Passa a função para atualizar a imagem
      />
      <MainContent
        currentTab={currentTab}
        setCoverImage={setCoverImage} // Passa a função para atualizar a imagem
        coverImage={coverImage} // Passa a imagem de capa atual
      />
    </div>
  );
};

export default HomePage;
