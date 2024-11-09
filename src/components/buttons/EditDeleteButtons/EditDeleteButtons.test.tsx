import { render, screen, fireEvent } from '@testing-library/react';
import EditDeleteButtons from '@components/buttons/EditDeleteButtons/EditDeleteButtons';
import DeleteButton from '@components/buttons/DeleteButton/DeleteButton';
import { vi, Mock } from 'vitest';

vi.mock('@components/buttons/DeleteButton/DeleteButton');

describe('EditDeleteButtons', () => {
  const mockOnToggleEdit = vi.fn();
  const mockOnSave = vi.fn();

  beforeEach(() => {
    mockOnToggleEdit.mockClear();
    mockOnSave.mockClear();
  });

  it('renders Edit and Delete buttons when not in editing mode', () => {
    (DeleteButton as Mock).mockImplementation(({ onDeleteSuccess }) => (
      <button onClick={onDeleteSuccess}>Mocked DeleteButton</button>
    ));

    render(
      <EditDeleteButtons
        isEditing={false}
        onToggleEdit={mockOnToggleEdit}
        onSave={mockOnSave}
        postId='1'
      />
    );

    expect(screen.getByText('Editar')).toBeInTheDocument();
    expect(screen.getByText('Mocked DeleteButton')).toBeInTheDocument();
  });

  it('renders Cancelar and Salvar buttons when in editing mode', () => {
    render(
      <EditDeleteButtons
        isEditing={true}
        onToggleEdit={mockOnToggleEdit}
        onSave={mockOnSave}
        postId='1'
      />
    );

    expect(screen.getByText('Cancelar')).toBeInTheDocument();
    expect(screen.getByText('Salvar')).toBeInTheDocument();
  });

  it('calls onToggleEdit when Edit button is clicked', () => {
    render(
      <EditDeleteButtons
        isEditing={false}
        onToggleEdit={mockOnToggleEdit}
        onSave={mockOnSave}
        postId='1'
      />
    );

    fireEvent.click(screen.getByText('Editar'));
    expect(mockOnToggleEdit).toHaveBeenCalledTimes(1);
  });

  it('calls onToggleEdit when Cancelar button is clicked', () => {
    render(
      <EditDeleteButtons
        isEditing={true}
        onToggleEdit={mockOnToggleEdit}
        onSave={mockOnSave}
        postId='1'
      />
    );

    fireEvent.click(screen.getByText('Cancelar'));
    expect(mockOnToggleEdit).toHaveBeenCalledTimes(1);
  });

  it('calls onSave when Salvar button is clicked', () => {
    render(
      <EditDeleteButtons
        isEditing={true}
        onToggleEdit={mockOnToggleEdit}
        onSave={mockOnSave}
        postId='1'
      />
    );

    fireEvent.click(screen.getByText('Salvar'));
    expect(mockOnSave).toHaveBeenCalledTimes(1);
  });

  it('should match snapshot', () => {
    const { asFragment } = render(
      <EditDeleteButtons
        isEditing={true}
        onToggleEdit={mockOnToggleEdit}
        onSave={mockOnSave}
        postId='1'
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
