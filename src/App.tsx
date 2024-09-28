import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ResetStyle from './styles/ResetStyle';
import './styles/tailwind.css';

export default function App() {
  return (
    <>
      <ResetStyle />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
