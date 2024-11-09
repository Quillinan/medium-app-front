import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import CreatePostContent from './CreatePostContent';

describe('CreatePostContent', () => {
  const mockSetCoverImage = vi.fn();
  const mockOnTitleChange = vi.fn();
  const mockOnSubtitleChange = vi.fn();
  const mockOnContentChange = vi.fn();

  beforeAll(() => {
    global.URL.createObjectURL = vi.fn(() => 'mocked-url');
    global.URL.revokeObjectURL = vi.fn();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should load content into the editor when draft is present', async () => {
    localStorage.setItem(
      'draftPost',
      JSON.stringify({
        title: 'Draft Title',
        subtitle: 'Draft Subtitle',
        content: 'Draft Content',
      })
    );

    render(
      <CreatePostContent
        setCoverImage={mockSetCoverImage}
        coverImage={null}
        onTitleChange={mockOnTitleChange}
        onSubtitleChange={mockOnSubtitleChange}
        onContentChange={mockOnContentChange}
      />
    );

    await waitFor(() => {
      const editor = screen.getByTestId('create-post-content');
      expect(editor).toHaveTextContent('Draft Content');
      expect(screen.getByTestId('title-input')).toHaveValue('Draft Title');
      expect(screen.getByTestId('subtitle-input')).toHaveValue(
        'Draft Subtitle'
      );
    });
  });

  it('should save the post draft to localStorage when title or subtitle changes', async () => {
    render(
      <CreatePostContent
        setCoverImage={mockSetCoverImage}
        coverImage={null}
        onTitleChange={mockOnTitleChange}
        onSubtitleChange={mockOnSubtitleChange}
        onContentChange={mockOnContentChange}
      />
    );

    const titleInput = screen.getByTestId('title-input');
    const subtitleInput = screen.getByTestId('subtitle-input');

    await act(async () => {
      fireEvent.change(titleInput, { target: { value: 'New Title' } });
      fireEvent.change(subtitleInput, { target: { value: 'New Subtitle' } });
    });

    await waitFor(() => {
      const draft = JSON.parse(localStorage.getItem('draftPost') || '{}');
      expect(draft.title).toBe('New Title');
      expect(draft.subtitle).toBe('New Subtitle');
      expect(mockOnTitleChange).toHaveBeenCalledWith('New Title');
      expect(mockOnSubtitleChange).toHaveBeenCalledWith('New Subtitle');
    });
  });

  it('should call setCoverImage function when an image is uploaded', async () => {
    render(
      <CreatePostContent
        setCoverImage={mockSetCoverImage}
        coverImage={null}
        onTitleChange={mockOnTitleChange}
        onSubtitleChange={mockOnSubtitleChange}
        onContentChange={mockOnContentChange}
      />
    );

    const fileInput = screen.getByTestId('file-input');

    const file = new File(['image content'], 'test-image.png', {
      type: 'image/png',
    });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    await waitFor(() => {
      expect(mockSetCoverImage).toHaveBeenCalledWith(file);
    });
  });

  it('should remove the cover image when remove button is clicked', async () => {
    render(
      <CreatePostContent
        setCoverImage={mockSetCoverImage}
        coverImage={new File([], 'cover.png')}
        onTitleChange={mockOnTitleChange}
        onSubtitleChange={mockOnSubtitleChange}
        onContentChange={mockOnContentChange}
      />
    );

    const removeButton = screen.getByTestId('remove-image-button');

    await act(async () => {
      fireEvent.click(removeButton);
    });

    await waitFor(() => {
      expect(mockSetCoverImage).toHaveBeenCalledWith(null);
    });
  });

  it('should render the component correctly', () => {
    const { asFragment } = render(
      <CreatePostContent
        setCoverImage={mockSetCoverImage}
        coverImage={null}
        onTitleChange={mockOnTitleChange}
        onSubtitleChange={mockOnSubtitleChange}
        onContentChange={mockOnContentChange}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
