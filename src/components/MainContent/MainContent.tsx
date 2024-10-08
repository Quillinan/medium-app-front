const MainContent: React.FC<{ currentTab: string }> = ({ currentTab }) => (
  <main>
    <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
      <h2 className='text-2xl'>{currentTab} Content</h2>
      {/* Aqui você pode adicionar conteúdo específico para cada aba */}
    </div>
  </main>
);

export default MainContent;
