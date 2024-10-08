import UserMenu from '../UserMenu/UserMenu';

const NavBar: React.FC<{
  currentTab: string;
  onTabChange: (tab: string) => void;
}> = ({ currentTab, onTabChange }) => {
  const tabs = ['Dashboard', 'Team', 'Projects', 'Calendar', 'Reports'];

  return (
    <nav className='bg-gray-800'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <img
                className='h-8 w-8'
                src='https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500'
                alt='Your Company'
              />
            </div>
            <div className='hidden md:block'>
              <div className='ml-10 flex items-baseline space-x-4'>
                {tabs.map(tab => (
                  <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    className={`rounded-md px-3 py-2 text-sm font-medium ${
                      currentTab === tab
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <UserMenu />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
