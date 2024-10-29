import { render, screen } from '@testing-library/react';
import MainContent from './MainContent';

describe('MainContent', () => {
  it('should render Post content when no currentTab is provided', () => {
    render(<MainContent currentTab='' />);
    const defaultContent = screen.getByTestId('posts-content');
    expect(defaultContent).toBeInTheDocument();
  });

  it('should render Post content by default when no matching tab is provided', () => {
    render(<MainContent currentTab='UnknownTab' />);
    const defaultContent = screen.getByTestId('posts-content');
    expect(defaultContent).toBeInTheDocument();
  });

  it('should render the correct content based on currentTab prop', () => {
    const { rerender } = render(<MainContent currentTab='Criar Post' />);
    expect(screen.getByText(/Conteúdo da aba Criar Post/i)).toBeInTheDocument();

    rerender(<MainContent currentTab='Aniversários' />);
    expect(screen.getByTestId('birthday-content')).toBeInTheDocument();

    rerender(<MainContent currentTab='UnknownTab' />);
    expect(screen.getByTestId('posts-content')).toBeInTheDocument();
  });

  it('should render createPostContent content when currentTab is Criar Post', () => {
    render(<MainContent currentTab='Criar Post' />);
    const createPostContent = screen.getByText(/Conteúdo da aba Criar Post/i);
    expect(createPostContent).toBeInTheDocument();
  });

  it('should render BirthdayContent component when currentTab is Aniversários', () => {
    render(<MainContent currentTab='Aniversários' />);
    const birthdayContent = screen.getByTestId('birthday-content');
    expect(birthdayContent).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { asFragment } = render(<MainContent currentTab='Criar Post' />);
    expect(asFragment()).toMatchSnapshot();
  });
});
