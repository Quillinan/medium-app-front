import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import ResetStyle from './styles/ResetStyle';
import './styles/tailwind.css';
import HomePage from './pages/Home/HomePage';

export default function App() {
  return (
    <>
      <ResetStyle />
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/home' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
