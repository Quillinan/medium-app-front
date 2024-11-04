import { useAuth } from '@auth/useAuth';
import MainContent from '@components/content/MainContent/MainContent';
import Header from '@components/Header/Header';
import NavBar from '@components/NavBar/NavBar';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Post } from '@utils/Types/Types';

const HomePage: React.FC = () => {
  const { removeAuth } = useAuth();
  const navigate = useNavigate();
  const auth = sessionStorage.getItem('isAuthenticated');
  const [currentTab, setCurrentTab] = useState('Posts');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const logout = () => {
    removeAuth();
    navigate('/login');
  };

  useEffect(() => {
    if (!auth) {
      logout();
    }
  }, [auth]);

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    setSelectedPost(null);
  };

  return (
    <div id='app' className='flex flex-col min-h-screen'>
      <NavBar currentTab={currentTab} onTabChange={handleTabChange} />
      <Header
        title={
          currentTab === 'Aniversários' ? 'Aniversários do mês' : currentTab
        }
        onTabChange={setCurrentTab}
        coverImage={coverImage}
        setCoverImage={setCoverImage}
      />
      <MainContent
        currentTab={currentTab}
        setCoverImage={setCoverImage}
        coverImage={coverImage}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
      />
    </div>
  );
};

export default HomePage;
