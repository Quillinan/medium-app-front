import { render, screen, act } from '@testing-library/react';
import { useContext } from 'react';
import { AuthContext, AuthProvider } from './AuthContext';

const TestComponent = () => {
  const authContext = useContext(AuthContext);
  return (
    <div>
      <button onClick={() => authContext?.setAuth('mock-token')}>
        Set Token
      </button>
      <p>Token: {authContext?.token}</p>
    </div>
  );
};

describe('AuthProvider', () => {
  it('should set the auth token and store it in sessionStorage', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const button = screen.getByText(/Set Token/i);
    act(() => {
      button.click();
    });

    const tokenElement = screen.getByText(/Token: mock-token/i);
    expect(tokenElement).toBeInTheDocument();
    expect(sessionStorage.getItem('authToken')).toBe('mock-token');
  });
});
