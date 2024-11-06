import { act, render, screen } from '@testing-library/react';
import LoginPage from './LoginPage';
import { AuthProvider } from '@context/AuthContext/AuthContext';
import { MemoryRouter } from 'react-router-dom';

describe('LoginPage', () => {
  it('should render the login page with logo, title, and form', async () => {
    await act(async () => {
      render(
        <AuthProvider>
          <MemoryRouter initialEntries={['/login']}>
            <LoginPage />
          </MemoryRouter>
        </AuthProvider>
      );
    });

    const logo = screen.getByAltText('Your Company');
    expect(logo).toBeInTheDocument();

    const title = screen.getByText(/Sign in to your account/i);
    expect(title).toBeInTheDocument();
  });

  it('should match snapshot', async () => {
    let tree;
    await act(async () => {
      const { asFragment } = render(
        <AuthProvider>
          <MemoryRouter initialEntries={['/login']}>
            <LoginPage />
          </MemoryRouter>
        </AuthProvider>
      );
      tree = asFragment();
    });

    expect(tree).toMatchSnapshot();
  });
});
