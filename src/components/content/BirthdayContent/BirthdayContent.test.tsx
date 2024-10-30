import { render, screen, waitFor } from '@testing-library/react';
import BirthdayContent from './BirthdayContent';
import { getMonthlyBirthdays } from '@services/GetMonthlyBirthdays/GetMonthlyBirthdays';
import { showLoading } from '@utils/LoadingHelper/LoadingHelper';

vi.mock('@services/GetMonthlyBirthdays/getMonthlyBirthdays', () => ({
  getMonthlyBirthdays: vi.fn(),
}));
vi.mock('@utils/LoadingHelper/LoadingHelper', () => ({
  showLoading: vi.fn(),
}));

describe('BirthdayContent', () => {
  const mockBirthdays = [
    { NOME: 'Alice', DTNASCIMENTO: 1 },
    { NOME: 'Bob', DTNASCIMENTO: 2 },
  ];

  it('should display custom error message from API response', async () => {
    const apiErrorResponse = { message: 'Erro no servidor' };
    (getMonthlyBirthdays as jest.Mock).mockResolvedValue(apiErrorResponse);
    (showLoading as jest.Mock).mockResolvedValue(apiErrorResponse);

    render(<BirthdayContent />);

    expect(showLoading).toHaveBeenCalled();
    const error = await screen.findByText('Erro no servidor');
    expect(error).toBeInTheDocument();
  });

  it('should display error message if fetching data fails', async () => {
    const errorMessage = 'Erro ao carregar os dados da API';
    (getMonthlyBirthdays as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );
    (showLoading as jest.Mock).mockRejectedValue(new Error(errorMessage));

    render(<BirthdayContent />);

    expect(showLoading).toHaveBeenCalled();
    const error = await screen.findByText(errorMessage);
    expect(error).toBeInTheDocument();
  });

  it('should display birthday data when fetching is successful', async () => {
    (getMonthlyBirthdays as jest.Mock).mockResolvedValue(mockBirthdays);
    (showLoading as jest.Mock).mockResolvedValue(mockBirthdays);

    render(<BirthdayContent />);

    expect(showLoading).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });
  });

  it('should sort the birthdays by date', async () => {
    (getMonthlyBirthdays as jest.Mock).mockResolvedValue(mockBirthdays);
    (showLoading as jest.Mock).mockResolvedValue(mockBirthdays);

    render(<BirthdayContent />);

    expect(showLoading).toHaveBeenCalled();

    await waitFor(() => {
      const aliceName = screen.getByTestId('name-Alice');
      const bobName = screen.getByTestId('name-Bob');

      expect(aliceName).toBeInTheDocument();
      expect(bobName).toBeInTheDocument();

      const names = [aliceName.textContent, bobName.textContent];
      expect(names).toEqual(['Alice', 'Bob']);
    });
  });

  it('should match snapshot', () => {
    const { asFragment } = render(<BirthdayContent />);
    expect(asFragment()).toMatchSnapshot();
  });
});
