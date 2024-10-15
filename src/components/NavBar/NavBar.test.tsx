import { fireEvent, render, screen } from '@testing-library/react';
import NavBar from './NavBar';

vi.mock('@components/UserMenu/UserMenu', () => {
  return {
    default: () => <div>UserMenu</div>,
  };
});

describe('NavBar Component', () => {
  const onTabChangeMock = vi.fn();

  beforeEach(() => {
    onTabChangeMock.mockClear();
  });

  it('should render the logo', () => {
    render(<NavBar currentTab='Menu' onTabChange={onTabChangeMock} />);

    const logo = screen.getByAltText('Your Company');
    expect(logo).toBeInTheDocument();
  });
  it('should render the tabs', () => {
    render(<NavBar currentTab='Menu' onTabChange={onTabChangeMock} />);

    const tabs = ['Menu', 'Dashboard', 'Aniversários'];
    tabs.forEach(tab => {
      expect(screen.getByText(tab)).toBeInTheDocument();
    });
  });
  it('should render the UserMenu', () => {
    render(<NavBar currentTab='Menu' onTabChange={onTabChangeMock} />);

    const UserMenu = screen.getByText('UserMenu');
    expect(UserMenu).toBeInTheDocument();
  });
  it('should trigger onTabChange when a tab is clicked', () => {
    render(<NavBar currentTab='Menu' onTabChange={onTabChangeMock} />);

    const dashboardTab = screen.getByText('Dashboard');
    fireEvent.click(dashboardTab);
    expect(onTabChangeMock).toHaveBeenCalledWith('Dashboard');
  });
  it('should apply active class to the current tab', () => {
    render(<NavBar currentTab='Aniversários' onTabChange={onTabChangeMock} />);

    const activeTab = screen.getByText('Aniversários');
    expect(activeTab).toHaveClass('bg-gray-900 text-white');

    const inactiveTab = screen.getByText('Menu');
    expect(inactiveTab).toHaveClass(
      'text-gray-300 hover:bg-gray-700 hover:text-white'
    );
  });
  it('should match snapshot', () => {
    const { asFragment } = render(
      <NavBar currentTab='Menu' onTabChange={onTabChangeMock} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
