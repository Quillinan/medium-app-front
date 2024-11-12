import { TableBirthdayProps } from '@utils/Types/Types';
import TableBirthday from './TableBirthday';
import { render, screen } from '@testing-library/react';

describe('TableBirthday', () => {
  const mockData: TableBirthdayProps['data'] = [
    { NOME: 'João', DTNASCIMENTO: 1, DESCRICAO: 'Financeiro', IMAGEM: '' },
    { NOME: 'Maria', DTNASCIMENTO: 17, DESCRICAO: 'RH', IMAGEM: '' },
  ];

  it('should render a message when no data is provided', () => {
    render(<TableBirthday data={[]} />);

    const noDataMessage = screen.getByText(
      /Nenhum aniversariante encontrado./i
    );
    expect(noDataMessage).toBeInTheDocument();
  });

  it('should render the data cards when data is provided', () => {
    render(<TableBirthday data={mockData} />);

    expect(screen.getByText('João')).toBeInTheDocument();
    expect(screen.getByText('Maria')).toBeInTheDocument();
    expect(screen.getByText('Aniversário: 1')).toBeInTheDocument();
    expect(screen.getByText('Aniversário: 17')).toBeInTheDocument();

    expect(screen.getByText('Setor: Financeiro')).toBeInTheDocument();
    expect(screen.getByText('Setor: RH')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { asFragment } = render(<TableBirthday data={mockData} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
