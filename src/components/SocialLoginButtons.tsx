const SocialLoginButtons: React.FC = () => {
  return (
    <div className='flex flex-col space-y-4'>
      <button
        className='flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
        onClick={() => alert('Continue with Azure')}
      >
        Login with Azure
      </button>
      <button
        className='flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'
        onClick={() => alert('Continue with GitHub')}
      >
        Login with GitHub
      </button>
    </div>
  );
};

export default SocialLoginButtons;
