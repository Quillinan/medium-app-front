import { fireEvent, render, screen } from '@testing-library/react';
import UserMenu from './UserMenu';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@auth/useAuth';

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

    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useAuth as jest.Mock).mockReturnValue({
      removeAuth: mockRemoveAuth,
    });
  });

  it('should render UserMenu with IconButton', () => {
    render(<UserMenu />);

    const iconButton = screen.getByAltText('User');
    expect(iconButton).toBeInTheDocument();
  });

  it('should call removeAuth on successful logout', async () => {
    render(<UserMenu />);

    const iconButton = screen.getByAltText('User');
    fireEvent.click(iconButton);

    expect(mockRemoveAuth).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('should match snapshot', () => {
    const { asFragment } = render(<UserMenu />);
    expect(asFragment()).toMatchSnapshot();
  });
});
