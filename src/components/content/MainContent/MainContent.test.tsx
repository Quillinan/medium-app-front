import { render, screen } from '@testing-library/react';
import MainContent from './MainContent';
import { Mock } from 'vitest';

describe('MainContent', () => {
  beforeAll(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    (console.error as Mock).mockRestore();
  });

  it('should render PostsContent by default when an unknown tab is provided', () => {
    render(
      <MainContent
        currentTab='UnknownTab'
        setCoverImage={() => {}}
        coverImage={null}
        selectedPost={null}
        setSelectedPost={() => {}}
      />
    );
    const defaultContent = screen.getByTestId('posts-content');
    expect(defaultContent).toBeInTheDocument();
  });
  it('should render PostsContent by default when no currentTab is provided', () => {
    render(
      <MainContent
        currentTab=''
        setCoverImage={() => {}}
        coverImage={null}
        selectedPost={null}
        setSelectedPost={() => {}}
      />
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
        selectedPost={null}
        setSelectedPost={() => {}}
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
        selectedPost={null}
        setSelectedPost={() => {}}
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
        selectedPost={null}
        setSelectedPost={() => {}}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
