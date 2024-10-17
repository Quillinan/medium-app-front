import { render, screen } from '@testing-library/react';
import MainContent from './MainContent';

describe('MainContent', () => {
  it('should render Menu content when no currentTab is provided', () => {
    render(<MainContent currentTab='' />);
    const defaultContent = screen.getByText(/Conteúdo da aba Menu/i);
    expect(defaultContent).toBeInTheDocument();
  });

  it('should render Menu content by default when no matching tab is provided', () => {
    render(<MainContent currentTab='UnknownTab' />);
    const defaultContent = screen.getByText(/Conteúdo da aba Menu/i);
    expect(defaultContent).toBeInTheDocument();
  });

  it('should render the correct content based on currentTab prop', () => {
    const { rerender } = render(<MainContent currentTab='Dashboard' />);
    expect(screen.getByText(/Conteúdo da aba Dashboard/i)).toBeInTheDocument();

    rerender(<MainContent currentTab='Aniversários' />);
    expect(screen.getByTestId('birthday-content')).toBeInTheDocument();

    rerender(<MainContent currentTab='UnknownTab' />);
    expect(screen.getByText(/Conteúdo da aba Menu/i)).toBeInTheDocument();
  });

  it('should render Dashboard content when currentTab is Dashboard', () => {
    render(<MainContent currentTab='Dashboard' />);
    const dashboardContent = screen.getByText(/Conteúdo da aba Dashboard/i);
    expect(dashboardContent).toBeInTheDocument();
  });

  it('should render BirthdayContent component when currentTab is Aniversários', () => {
    render(<MainContent currentTab='Aniversários' />);
    const birthdayContent = screen.getByTestId('birthday-content');
    expect(birthdayContent).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { asFragment } = render(<MainContent currentTab='Dashboard' />);
    expect(asFragment()).toMatchSnapshot();
  });
});
