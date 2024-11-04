import { render, screen, waitFor, act } from '@testing-library/react';
import BirthdayContent from './BirthdayContent';
import { getMonthlyBirthdays } from '@services/GetMonthlyBirthdays/GetMonthlyBirthdays';
import { showLoading } from '@utils/LoadingHelper/LoadingHelper';
import { Mock } from 'vitest';

vi.mock('@services/GetMonthlyBirthdays/GetMonthlyBirthdays', () => ({
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
    (getMonthlyBirthdays as Mock).mockResolvedValue(apiErrorResponse);
    (showLoading as Mock).mockResolvedValue(apiErrorResponse);

    await act(async () => {
      render(<BirthdayContent />);
    });

    expect(showLoading).toHaveBeenCalled();

    const error = await screen.findByText('Erro no servidor');
    expect(error).toBeInTheDocument();
  });

  it('should display error message if fetching data fails', async () => {
    const errorMessage = 'Erro ao carregar os dados da API';

    (getMonthlyBirthdays as Mock).mockRejectedValue(new Error(errorMessage));
    (showLoading as Mock).mockRejectedValue(new Error(errorMessage));

    await act(async () => {
      render(<BirthdayContent />);
    });

    expect(showLoading).toHaveBeenCalled();

    const error = await screen.findByText('Erro ao carregar os dados da API');
    expect(error).toBeInTheDocument();
  });

  it('should display birthday data when fetching is successful', async () => {
    (getMonthlyBirthdays as Mock).mockResolvedValue(mockBirthdays);
    (showLoading as Mock).mockResolvedValue(mockBirthdays);

    await act(async () => {
      render(<BirthdayContent />);
    });

    expect(showLoading).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });
  });

  it('should sort the birthdays by date', async () => {
    (getMonthlyBirthdays as Mock).mockResolvedValue(mockBirthdays);
    (showLoading as Mock).mockResolvedValue(mockBirthdays);

    await act(async () => {
      render(<BirthdayContent />);
    });

    expect(showLoading).toHaveBeenCalled();

    await waitFor(() => {
      const aliceName = screen.getByText('Alice');
      const bobName = screen.getByText('Bob');

      expect(aliceName).toBeInTheDocument();
      expect(bobName).toBeInTheDocument();

      const names = [aliceName.textContent, bobName.textContent];
      expect(names).toEqual(['Alice', 'Bob']);
    });
  });

  it('should match snapshot', async () => {
    await act(async () => {
      const { asFragment } = render(<BirthdayContent />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
