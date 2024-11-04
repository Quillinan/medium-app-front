import { render, screen, act } from '@testing-library/react';
import { useContext } from 'react';
import { AuthContext, AuthProvider } from './AuthContext';

const TestComponent: React.FC = () => {
  const authContext = useContext(AuthContext);

  return (
    <div>
      <button
        onClick={() =>
          authContext?.setAuth('mock-token', 'mock-unique-id', 'mock-name')
        }
      >
        Set Auth
      </button>
      <button onClick={() => authContext?.removeAuth()}>Remove Auth</button>
      <p>Token: {authContext?.token}</p>
      <p>UniqueId: {authContext?.uniqueId}</p>
      <p>Name: {authContext?.name}</p>
    </div>
  );
};

describe('AuthProvider', () => {
  afterEach(() => {
    sessionStorage.clear();
  });

  it('should set the auth token, uniqueId, and name, and store them in sessionStorage', async () => {
    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });

    const setAuthButton = screen.getByText(/Set Auth/i);

    await act(async () => {
      setAuthButton.click();
    });

    expect(screen.getByText(/Token: mock-token/i)).toBeInTheDocument();
    expect(screen.getByText(/UniqueId: mock-unique-id/i)).toBeInTheDocument();
    expect(screen.getByText(/Name: mock-name/i)).toBeInTheDocument();

    expect(sessionStorage.getItem('authToken')).toBe('mock-token');
    expect(sessionStorage.getItem('uniqueId')).toBe('mock-unique-id');
    expect(sessionStorage.getItem('name')).toBe('mock-name');
  });

  it('should remove the auth data from sessionStorage and context when removeAuth is called', async () => {
    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });

    const setAuthButton = screen.getByText(/Set Auth/i);
    const removeAuthButton = screen.getByText(/Remove Auth/i);

    await act(async () => {
      setAuthButton.click();
    });

    await act(async () => {
      removeAuthButton.click();
    });

    expect(screen.queryByText(/Token: mock-token/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/UniqueId: mock-unique-id/i)
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/Name: mock-name/i)).not.toBeInTheDocument();

    expect(sessionStorage.getItem('authToken')).toBeNull();
    expect(sessionStorage.getItem('uniqueId')).toBeNull();
    expect(sessionStorage.getItem('name')).toBeNull();
  });
});
