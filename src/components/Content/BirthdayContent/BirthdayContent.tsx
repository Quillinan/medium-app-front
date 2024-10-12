import { useEffect, useState, useCallback } from 'react';
import { Birthday, ErrorResponse } from '../../../utils/types';
import { getMonthlyBirthdays } from '../../../services/getMonthlyBirthdays';
import { showLoading } from '../../../utils/loadingHelper';
import TableBirthday from '../../TableBirthday/TableBirthday';

const BirthdayContent: React.FC = () => {
  const [data, setData] = useState<Birthday[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const sortData = useCallback((birthdays: Birthday[]) => {
    return birthdays.sort((a, b) => a.DTNASCIMENTO - b.DTNASCIMENTO);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await showLoading(
          getMonthlyBirthdays(new Date().getMonth() + 1)
        );

        if (Array.isArray(response)) {
          const sortedData = sortData(response);
          setData(sortedData);
        } else {
          const errorResponse = response as ErrorResponse;
          setError(errorResponse.message || 'Erro desconhecido');
        }
      } catch (error) {
        setError('Erro ao carregar os dados da API');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sortData]);

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
