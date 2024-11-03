import { render, screen, fireEvent } from '@testing-library/react';
import ImageDropzone from './ImageDropzone';

describe('ImageDropzone', () => {
  const mockOnImageUpload = vi.fn();
  const mockOnImageRemove = vi.fn();

  beforeAll(() => {
    global.URL.createObjectURL = vi.fn(() => 'blob:http://localhost/test.png');

    global.URL.revokeObjectURL = vi.fn();
  });

  afterAll(() => {
    global.URL.createObjectURL =
      undefined as unknown as typeof global.URL.createObjectURL;
    global.URL.revokeObjectURL =
      undefined as unknown as typeof global.URL.revokeObjectURL;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should display message to add an image when no cover image is present', () => {
    render(
      <ImageDropzone
        coverImage={null}
        onImageUpload={mockOnImageUpload}
        onImageRemove={mockOnImageRemove}
      />
    );

    expect(
      screen.getByText(/Arraste ou clique para adicionar uma imagem de capa/i)
    ).toBeInTheDocument();
  });

  it('should display message to change the image when a cover image is present', () => {
    const mockFile = new File(['dummy content'], 'example.png', {
      type: 'image/png',
    });

    render(
      <ImageDropzone
        coverImage={mockFile}
        onImageUpload={mockOnImageUpload}
        onImageRemove={mockOnImageRemove}
      />
    );

    expect(
      screen.getByText(/Clique para alterar a imagem de capa/i)
    ).toBeInTheDocument();
  });

  //   it('should call onImageUpload when an image is dropped', async () => {
  //     const mockFile = new File(['dummy content'], 'example.png', {
  //       type: 'image/png',
  //     });

  //     render(
  //       <ImageDropzone
  //         coverImage={null}
  //         onImageUpload={mockOnImageUpload}
  //         onImageRemove={mockOnImageRemove}
  //       />
  //     );

  //     const dropzone = screen.getByText(
  //       /Arraste ou clique para adicionar uma imagem de capa/i
  //     );
  //     fireEvent.drop(dropzone, {
  //       dataTransfer: {
  //         files: [mockFile],
  //         items: [{ kind: 'file', type: 'image/png', getAsFile: () => mockFile }],
  //       },
  //     });

  //     await waitFor(() => {
  //       expect(mockOnImageUpload).toHaveBeenCalledWith(mockFile);
  //     });
  //   });

  it('should call onImageRemove when remove button is clicked', () => {
    const mockFile = new File(['dummy content'], 'example.png', {
      type: 'image/png',
    });

    render(
      <ImageDropzone
        coverImage={mockFile}
        onImageUpload={mockOnImageUpload}
        onImageRemove={mockOnImageRemove}
      />
    );

    const removeButton = screen.getByText(/Remover/i);
    fireEvent.click(removeButton);

    expect(mockOnImageRemove).toHaveBeenCalled();
  });

  it('should display the uploaded image', () => {
    const mockFile = new File(['dummy content'], 'example.png', {
      type: 'image/png',
    });

    render(
      <ImageDropzone
        coverImage={mockFile}
        onImageUpload={mockOnImageUpload}
        onImageRemove={mockOnImageRemove}
      />
    );

    const img = screen.getByRole('img') as HTMLImageElement;

    expect(img).toBeInTheDocument();
    expect(img.src).toContain('blob:');
  });

  it('should render the component correctly', () => {
    const { asFragment } = render(
      <ImageDropzone
        coverImage={null}
        onImageUpload={mockOnImageUpload}
        onImageRemove={mockOnImageRemove}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
