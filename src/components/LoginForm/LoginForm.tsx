import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const auth = sessionStorage.getItem('isAuthenticated');

  const login = (auth: string | null) => {
    console.log(auth);
    if (auth) {
      setError('');
      navigate('/home');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const validEmail = 'teste@test.com';
    const validPassword = '1234';

    if (email === validEmail && password === validPassword) {
      setAuth(null);
      login('true');
    } else {
      setError('Usuário ou senha incorretos');
    }
  };

  useEffect(() => {
    login(auth);
  }, [auth, login]);

  return (
    <form action='#' method='POST' onSubmit={handleLogin} className='space-y-6'>
      <div>
        <label
          htmlFor='email'
          className='block text-sm font-medium leading-6 text-gray-900'
        >
          Email address
        </label>
        <div className='mt-2'>
          <input
            id='email'
            name='email'
            type='email'
            required
            autoComplete='email'
            onChange={e => setEmail(e.target.value)}
            className='block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          />
        </div>
      </div>

      <div>
        <label
          htmlFor='password'
          className='block text-sm font-medium leading-6 text-gray-900'
        >
          Password
        </label>
        <div className='mt-2'>
          <input
            id='password'
            name='password'
            type='password'
            required
            autoComplete='current-password'
            onChange={e => setPassword(e.target.value)}
            className='block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          />
        </div>
      </div>

      {error && <p className='text-red-500 text-sm'>{error}</p>}

      <div className='flex flex-col items-center space-y-4'>
        <button
          type='submit'
          className='flex w-1/2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          Sign in
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
