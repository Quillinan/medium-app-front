import { useEffect, useState, useCallback } from 'react';
import { Birthday, ErrorResponse } from '@utils/Types/Types';
import { showLoading } from '@utils/LoadingHelper/LoadingHelper';
import { getMonthlyBirthdays } from '@services/GetMonthlyBirthdays/GetMonthlyBirthdays';
import TableBirthday from '@components/TableBirthday/TableBirthday';

const BirthdayContent: React.FC = () => {
  const [data, setData] = useState<Birthday[]>([]);
  const [error, setError] = useState<string | null>(null);

  const sortData = useCallback((birthdays: Birthday[]) => {
    return birthdays.sort((a, b) => a.DTNASCIMENTO - b.DTNASCIMENTO);
  }, []);

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
    }
  };

  useEffect(() => {
    fetchData();
  }, [sortData]);

  return (
    <div
      data-testid='birthday-content'
      className='flex items-center justify-center h-full mt-5 mb-5'
    >
      {error ? <p>{error}</p> : <TableBirthday data={data} />}
    </div>
  );
};

export default BirthdayContent;
