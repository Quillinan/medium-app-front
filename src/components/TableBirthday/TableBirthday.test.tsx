import { TableBirthdayProps } from '@utils/types';
import TableBirthday from './TableBirthday';
import { render, screen } from '@testing-library/react';

describe('TableBirthday', () => {
  const mockData: TableBirthdayProps['data'] = [
    { NOME: 'João', DTNASCIMENTO: 1 },
    { NOME: 'Maria', DTNASCIMENTO: 17 },
  ];
  it('should render a message when no data is provided', () => {
    render(<TableBirthday data={[]} />);

    const noDataMessage = screen.getByText(
      /Nenhum aniversariante encontrado./i
    );
    expect(noDataMessage).toBeInTheDocument;
  });
  it('should render the table header correctly', () => {
    render(<TableBirthday data={[]} />);

    const nomeHeader = screen.getByText(/Nome/i);
    const diaHeader = screen.getByText(/Dia/i);

    expect(nomeHeader).toBeInTheDocument;
    expect(diaHeader).toBeInTheDocument;
  });

  it('should render the data rows when data is provided', () => {
    render(<TableBirthday data={mockData} />);

    expect(screen.getByText('João')).toBeInTheDocument;
    expect(screen.getByText('Maria')).toBeInTheDocument;
    expect(screen.getByText('1')).toBeInTheDocument;
    expect(screen.getByText('17')).toBeInTheDocument;
  });

  it('should match snapshot', () => {
    const { asFragment } = render(<TableBirthday data={[]} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
