import LoginForm from '@components/forms/LoginForm/LoginForm';
import SocialLoginButtons from '@components/buttons/SocialLoginButtons/SocialLoginButtons';

const LoginPage: React.FC = () => {
  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <img
        className='mx-auto h-10 w-auto'
        src='https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600'
        alt='Your Company'
      />

      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Sign in to your account
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <LoginForm />
        <div className='mt-6'>
          <SocialLoginButtons />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
