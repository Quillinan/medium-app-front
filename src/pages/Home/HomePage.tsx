import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import NavBar from '../../components/NavBar/NavBar';
import Header from '../../components/Header/Header';
import MainContent from '../../components/MainContent/MainContent';

const HomePage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('Dashboard');
  const auth = sessionStorage.getItem('isAuthenticated');
  const navigate = useNavigate();
  const { removeAuth } = useAuth();

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
    <div className='min-h-full'>
      <NavBar currentTab={currentTab} onTabChange={setCurrentTab} />
      <Header title={currentTab} />
      <MainContent currentTab={currentTab} />
    </div>
  );
};

export default HomePage;
