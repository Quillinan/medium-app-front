import { useEffect, useState } from 'react';
import { getBirthdays } from '../../../services/getBirthdays';
import TableBirthday from '../../TableBirthday/TableBirthday';

const BirthdayContent: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBirthdays(new Date().getMonth() + 1); // Pega o mês atual
        const sortedData = response.sort(
          (a: any, b: any) => a.DTNASCIMENTO - b.DTNASCIMENTO
        ); // Ordena pelo dia
        setData(sortedData);
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
        <TableBirthday data={data} />
      )}
    </div>
  );
};

export default BirthdayContent;
