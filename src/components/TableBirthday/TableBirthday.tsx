import React from 'react';
import { TableBirthdayProps } from '@utils/Types/Types';

const TableBirthday: React.FC<TableBirthdayProps> = ({ data }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
      {data.length > 0 ? (
        data.map((person, index) => (
          <div
            key={index}
            className='bg-white border border-gray-400 rounded-lg shadow-md p-4 flex items-center space-x-4'
          >
            {/* Renderizar a imagem se ela existir */}
            {person.IMAGEM && (
              <img
                src={`data:image/jpeg;base64,${person.IMAGEM}`}
                alt={`Foto de ${person.NOME}`}
                className='w-16 h-16 rounded-full object-cover'
              />
            )}
            <div>
              <h3 className='text-lg font-semibold text-gray-800'>
                {person.NOME}
              </h3>
              <p className='text-sm text-gray-600'>Setor: {person.DESCRICAO}</p>
              <p className='text-sm text-gray-600'>
                Aniversário: {person.DTNASCIMENTO}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className='text-center text-sm text-gray-500 col-span-full'>
          Nenhum aniversariante encontrado.
        </p>
      )}
    </div>
  );
};

export default TableBirthday;
