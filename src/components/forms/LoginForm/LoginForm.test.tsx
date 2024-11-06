import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@auth/useAuth';
import LoginForm from './LoginForm';
import { Mock } from 'vitest';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('@auth/useAuth', () => ({
  useAuth: vi.fn(),
}));

describe('LoginForm', () => {
  const mockNavigate = vi.fn();
  const mockSetAuth = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (useAuth as Mock).mockReturnValue({
      setAuth: mockSetAuth,
    });
  });

  it('should render the login form with email and password fields', () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign in/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should display error message for invalid login', async () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/Email address/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(emailInput, { target: { value: 'wrong@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });

    expect(
      screen.queryByText('Usuário ou senha incorretos')
    ).not.toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: /Sign in/i });
    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText('Usuário ou senha incorretos');
    expect(errorMessage).toBeInTheDocument();
  });

  it('should update the email and password state on input change', () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(emailInput, { target: { value: 'teste@test.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234' } });

    expect(emailInput).toHaveValue('teste@test.com');
    expect(passwordInput).toHaveValue('1234');
  });

  it('should call setAuth and navigate to /home on successful login', async () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/Email address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign in/i });

    fireEvent.change(emailInput, { target: { value: 'teste@test.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSetAuth).toHaveBeenCalledWith(null, null, null);
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });

  it('should match snapshot', () => {
    const { asFragment } = render(<LoginForm />);
    expect(asFragment()).toMatchSnapshot();
  });
});
