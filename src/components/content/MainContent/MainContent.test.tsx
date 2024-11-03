import { render, screen } from '@testing-library/react';
import MainContent from './MainContent';

describe('MainContent', () => {
  it('should render PostsContent by default when an unknown tab is provided', () => {
    render(
      <MainContent
        currentTab='UnknownTab'
        setCoverImage={() => {}}
        coverImage={null}
      />
    );
    const defaultContent = screen.getByTestId('posts-content');
    expect(defaultContent).toBeInTheDocument();
  });
  it('should render PostsContent by default when no currentTab is provided', () => {
    render(
      <MainContent currentTab='' setCoverImage={() => {}} coverImage={null} />
    );
    const defaultContent = screen.getByTestId('posts-content');
    expect(defaultContent).toBeInTheDocument();
  });
  it('should render CreatePostContent when currentTab is "Criar Post"', () => {
    render(
      <MainContent
        currentTab='Criar Post'
        setCoverImage={() => {}}
        coverImage={null}
      />
    );
    const createPostContent = screen.getByTestId('create-post-content');
    expect(createPostContent).toBeInTheDocument();
  });

  it('should render BirthdayContent when currentTab is "Aniversários"', () => {
    render(
      <MainContent
        currentTab='Aniversários'
        setCoverImage={() => {}}
        coverImage={null}
      />
    );
    const birthdayContent = screen.getByTestId('birthday-content');
    expect(birthdayContent).toBeInTheDocument();
  });

  it('should match snapshot for "UnknownTab" tab', () => {
    const { asFragment } = render(
      <MainContent
        currentTab='UnknownTab'
        setCoverImage={() => {}}
        coverImage={null}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
