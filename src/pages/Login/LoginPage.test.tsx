import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage';
import LoginForm from '@components/LoginForm/LoginForm';
import SocialLoginButtons from '@components/SocialLoginButtons/SocialLoginButtons';

vi.mock('@components/LoginForm/LoginForm', () => ({
  default: vi.fn(() => <div>Mocked LoginForm</div>),
}));

vi.mock('@components/SocialLoginButtons/SocialLoginButtons', () => ({
  default: vi.fn(() => <div>Mocked SocialLoginButtons</div>),
}));

describe('LoginPage', () => {
  it('should render the login page with logo, title, and form', () => {
    render(<LoginPage />);

    const logo = screen.getByAltText('Your Company');
    expect(logo).toBeInTheDocument();

    const title = screen.getByText(/Sign in to your account/i);
    expect(title).toBeInTheDocument();

    expect(LoginForm).toHaveBeenCalled();

    expect(SocialLoginButtons).toHaveBeenCalled();
  });
  it('should match snapshot', () => {
    const { asFragment } = render(<LoginPage />);

    expect(asFragment()).toMatchSnapshot();
  });
});
