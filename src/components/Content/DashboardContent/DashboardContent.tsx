import { useEffect, useState } from 'react';
import { getCloudTotvs } from '../../../services/getCloudTotvs';

const DashboardContent: React.FC = () => {
  //const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCloudTotvs();
        console.log('API Response:', response);
      } catch (error) {
        setError('Erro ao carregar os dados da API');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='flex items-center justify-center h-full'>
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        //<pre>{JSON.stringify(data, null, 2)}</pre> // Renderiza os dados na página
        <p>Feito</p>
      )}
    </div>
  );
};

export default DashboardContent;
