import { useMsal } from '@azure/msal-react';
import microsoft from '/microsoft.svg';
import { useAuth } from '@auth/useAuth';

const SocialLoginButtons: React.FC = () => {
  const { instance } = useMsal();
  const { setAuth } = useAuth();

  const handleAzureLogin = async () => {
    try {
      const response = await instance.loginPopup({
        scopes: ['user.read'],
      });

      const username = response?.account?.name ?? null;
      const userId = response?.uniqueId ?? null;
      const token = response?.accessToken ?? null;

      if (token) {
        setAuth(token, userId, username);
      } else {
        console.error('Falha ao obter o token de autenticação');
      }
    } catch (error) {
      console.error('Erro na autenticação');
    }
  };

  return (
    <div className='flex flex-col items-center space-y-4'>
      <button
        className='flex items-center w-1/2 justify-center rounded-md bg-white border border-black/20 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-md hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'
        onClick={handleAzureLogin}
      >
        <img src={microsoft} alt='microsoft icon' className='mr-4 h-5 w-5' />
        Microsoft
      </button>

      {/* <button
        className='flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'
        onClick={() => alert('Continue with GitHub')}
      >
        Login with GitHub
      </button> */}
    </div>
  );
};

export default SocialLoginButtons;
