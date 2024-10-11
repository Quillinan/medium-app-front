import { useEffect, useState } from 'react';
import { Birthday, ErrorResponse } from '../../../utils/types';
import { getMonthlyBirthdays } from '../../../services/getMonthlyBirthdays';
import Swal from 'sweetalert2';
import TableBirthday from '../../TableBirthday/TableBirthday';

const BirthdayContent: React.FC = () => {
  const [data, setData] = useState<Birthday[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        Swal.fire({
          title: 'Carregando...',
          html: 'Aguarde enquanto os dados são carregados.',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const response = await getMonthlyBirthdays(new Date().getMonth() + 1);

        if (Array.isArray(response)) {
          const sortedData = response.sort(
            (a: Birthday, b: Birthday) => a.DTNASCIMENTO - b.DTNASCIMENTO
          );
          setData(sortedData);
        } else {
          const errorResponse = response as ErrorResponse;
          setError(errorResponse.message || 'Erro desconhecido');
        }
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar os dados da API');
      } finally {
        setLoading(false);
        Swal.close();
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
