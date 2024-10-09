import DashboardContent from '../DashboardContent/DashboardContent';

const MainContent: React.FC<{ currentTab: string }> = ({ currentTab }) => {
  const renderContent = () => {
    switch (currentTab) {
      case 'Dashboard':
        return <DashboardContent />;
      case 'Calendar':
        return <div>Conteúdo da aba Calendar</div>;
      default:
        return <div>Conteúdo da aba Menu</div>;
    }
  };

  return (
    <main>
      <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
        {renderContent()}
      </div>
    </main>
  );
};

export default MainContent;
