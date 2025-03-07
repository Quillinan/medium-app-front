import { fireEvent, render, screen } from '@testing-library/react';
import UserMenu from './UserMenu';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@auth/useAuth';
import { Mock } from 'vitest';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('@auth/useAuth', () => ({
  useAuth: vi.fn(),
}));

describe('UserMenu', () => {
  const mockNavigate = vi.fn();
  const mockRemoveAuth = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (useAuth as Mock).mockReturnValue({
      removeAuth: mockRemoveAuth,
    });

    sessionStorage.clear();
  });

  it('should render UserMenu with user name if name is stored in sessionStorage', () => {
    sessionStorage.setItem('name', 'João');

    render(<UserMenu />);

    const userNameElement = screen.getByText('João');
    expect(userNameElement).toBeInTheDocument();

    const logoutButton = screen.getByRole('button');
    expect(logoutButton).toBeInTheDocument();
  });

  it('should render UserMenu with default text if no name is stored', () => {
    render(<UserMenu />);

    const defaultTextElement = screen.getByText('Usuário');
    expect(defaultTextElement).toBeInTheDocument();

    const logoutButton = screen.getByRole('button');
    expect(logoutButton).toBeInTheDocument();
  });

  it('should call removeAuth on successful logout', () => {
    sessionStorage.setItem('name', 'João');

    render(<UserMenu />);

    const logoutButton = screen.getByRole('button');

    fireEvent.click(logoutButton);

    expect(mockRemoveAuth).toHaveBeenCalledTimes(1);

    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('should match snapshot', () => {
    render(<UserMenu />);

    const { asFragment } = render(<UserMenu />);
    expect(asFragment()).toMatchSnapshot();
  });
});
