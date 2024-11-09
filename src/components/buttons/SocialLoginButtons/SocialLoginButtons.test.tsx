import { render, screen, fireEvent } from '@testing-library/react';
import SocialLoginButtons from './SocialLoginButtons';
import { useMsal } from '@azure/msal-react';
import { useAuth } from '@auth/useAuth';
import { Mock } from 'vitest';

vi.mock('@azure/msal-react', () => ({
  useMsal: vi.fn(),
}));

vi.mock('@auth/useAuth', () => ({
  useAuth: vi.fn(),
}));

describe('SocialLoginButtons', () => {
  const mockLoginPopup = vi.fn();
  const mockSetAuth = vi.fn();

  beforeAll(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  beforeEach(() => {
    vi.clearAllMocks();

    (useMsal as Mock).mockReturnValue({
      instance: {
        loginPopup: mockLoginPopup,
      },
    });

    (useAuth as Mock).mockReturnValue({
      setAuth: mockSetAuth,
    });
  });

  it('should handle login errors', async () => {
    const error = new Error('Erro de autenticação');
    mockLoginPopup.mockRejectedValueOnce(error);

    render(<SocialLoginButtons />);

    const microsoftButton = screen.getByRole('button', { name: /Microsoft/i });
    fireEvent.click(microsoftButton);

    expect(mockLoginPopup).toHaveBeenCalled();

    expect(mockSetAuth).not.toHaveBeenCalled();
  });

  it('should render the Microsoft login button', () => {
    render(<SocialLoginButtons />);

    const microsoftButton = screen.getByRole('button', { name: /Microsoft/i });
    expect(microsoftButton).toBeInTheDocument();
  });

  it('should call loginPopup and setAuth on successful login', async () => {
    mockLoginPopup.mockResolvedValueOnce({
      account: { name: 'mock-username' },
      uniqueId: 'mock-userId',
      accessToken: 'mock-token',
    });

    render(<SocialLoginButtons />);

    const microsoftButton = screen.getByRole('button', { name: /Microsoft/i });
    fireEvent.click(microsoftButton);

    expect(mockLoginPopup).toHaveBeenCalledWith({
      scopes: ['user.read'],
    });

    await screen.findByRole('button', { name: /Microsoft/i });

    expect(mockSetAuth).toHaveBeenCalledWith(
      'mock-token',
      'mock-userId',
      'mock-username'
    );
  });

  it('should match snapshot', () => {
    const { asFragment } = render(<SocialLoginButtons />);

    expect(asFragment()).toMatchSnapshot();
  });
});
