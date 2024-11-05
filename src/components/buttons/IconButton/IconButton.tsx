const IconButton: React.FC<{ onClick?: () => void; icon: React.ReactNode }> = ({
  onClick,
  icon,
}) => (
  <button
    onClick={onClick}
    type='button'
    className='relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
  >
    <span className='sr-only'>Button</span>
    {icon}
  </button>
);

export default IconButton;
