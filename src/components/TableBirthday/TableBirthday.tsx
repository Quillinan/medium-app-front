import { TableBirthdayProps } from '@utils/types';

const TableBirthday: React.FC<TableBirthdayProps> = ({ data }) => {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full bg-white border border-gray-400 rounded-lg shadow-md'>
        <thead>
          <tr>
            <th className='px-4 py-2 border-b-2 border-gray-400 bg-gray-200 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider'>
              Nome
            </th>
            <th className='px-4 py-2 border-b-2 border-gray-400 bg-gray-200 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider'>
              Dia do Aniversário
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((person, index) => (
              <tr key={index} className='border-b border-gray-300'>
                <td className='px-4 py-2 text-sm text-gray-800'>
                  {person.NOME}
                </td>
                <td className='px-4 py-2 text-sm text-gray-800 text-center'>
                  {person.DTNASCIMENTO}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={2}
                className='px-4 py-2 text-center text-sm text-gray-500'
              >
                Nenhum aniversariante encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableBirthday;
