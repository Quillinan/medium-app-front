import { fireEvent, render, screen } from '@testing-library/react';
import HomePage from './HomePage';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@auth/useAuth';
import { Mock } from 'vitest';

vi.mock('@auth/useAuth');
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('HomePage', () => {
  const mockRemoveAuth = vi.fn();
  const mockNavigate = vi.fn();

  beforeAll(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    (console.error as Mock).mockRestore();
  });

  beforeEach(() => {
    (useAuth as Mock).mockReturnValue({ removeAuth: mockRemoveAuth });
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    sessionStorage.setItem('isAuthenticated', 'true');
  });

  afterEach(() => {
    sessionStorage.clear();
    vi.clearAllMocks();
  });

  it('should logout and navigate to login when not authenticated', () => {
    sessionStorage.removeItem('isAuthenticated');
    render(<HomePage />);

    expect(mockRemoveAuth).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('should render the login page with navbar, header, and main content', () => {
    render(<HomePage />);

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('main-content')).toBeInTheDocument();
  });

  it('should change the current tab when a new tab is clicked', () => {
    render(<HomePage />);

    const birthdaysTab = screen.getByText(/Aniversários/i);
    fireEvent.click(birthdaysTab);

    const header = screen.getByText(/Aniversários do mês/i);
    expect(header).toBeInTheDocument();

    expect(screen.getByTestId('birthday-content')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { asFragment } = render(<HomePage />);

    expect(asFragment()).toMatchSnapshot();
  });
});
