import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreatePostContent from './CreatePostContent';

vi.mock('@components/TitleInput/TitleInput', () => ({
  default: vi.fn(({ onTitleChange }) => (
    <input
      data-testid='title-input'
      onChange={e => onTitleChange(e.target.value)}
      placeholder='Título'
    />
  )),
}));

vi.mock('@components/SubtitleInput/SubtitleInput', () => ({
  default: vi.fn(({ onSubtitleChange }) => (
    <input
      data-testid='subtitle-input'
      onChange={e => onSubtitleChange(e.target.value)}
      placeholder='Subtítulo'
    />
  )),
}));

vi.mock('@components/ImageDropzone/ImageDropzone', () => ({
  default: vi.fn(({ coverImage, onImageUpload, onImageRemove }) => (
    <div>
      <button
        data-testid='upload-image'
        onClick={() => onImageUpload(new File([], 'test-image.png'))}
      >
        Upload
      </button>
      {coverImage && (
        <div>
          <img src='mocked-url' alt='Capa do post' />
          <button data-testid='remove-image' onClick={onImageRemove}>
            Remove
          </button>
        </div>
      )}
    </div>
  )),
}));

describe('CreatePostContent', () => {
  const mockSetCoverImage = vi.fn();

  beforeAll(() => {
    global.URL.createObjectURL = vi.fn(() => 'mocked-url');
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

    const { container } = render(
      <CreatePostContent setCoverImage={mockSetCoverImage} coverImage={null} />
    );

    await waitFor(() => {
      const editor = container.querySelector('.ql-editor');
      expect(editor).toHaveTextContent('Draft Content');
    });
  });

  it('should save the draft to localStorage when title, subtitle, or content changes', async () => {
    render(
      <CreatePostContent setCoverImage={mockSetCoverImage} coverImage={null} />
    );

    const titleInput = screen.getByTestId('title-input');
    const subtitleInput = screen.getByTestId('subtitle-input');

    fireEvent.change(titleInput, { target: { value: 'New Title' } });
    fireEvent.change(subtitleInput, { target: { value: 'New Subtitle' } });

    await waitFor(() => {
      const draft = JSON.parse(localStorage.getItem('draftPost') || '{}');
      expect(draft.title).toBe('New Title');
      expect(draft.subtitle).toBe('New Subtitle');
    });
  });

  it('should call setCoverImage function when an image is uploaded', async () => {
    render(
      <CreatePostContent setCoverImage={mockSetCoverImage} coverImage={null} />
    );

    const uploadButton = screen.getByTestId('upload-image');
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(mockSetCoverImage).toHaveBeenCalledWith(expect.any(File));
    });
  });

  it('should remove the cover image when remove button is clicked', async () => {
    render(
      <CreatePostContent
        setCoverImage={mockSetCoverImage}
        coverImage={new File([], 'cover.png')}
      />
    );

    const removeButton = screen.getByTestId('remove-image');
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(mockSetCoverImage).toHaveBeenCalledWith(null);
    });
  });

  it('should render the component correctly', () => {
    const { asFragment } = render(
      <CreatePostContent setCoverImage={mockSetCoverImage} coverImage={null} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
