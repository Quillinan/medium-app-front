import { render, screen, fireEvent } from '@testing-library/react';
import TitleInput from './TitleInput';
import { useState } from 'react';

describe('TitleInput', () => {
  it('should render the component with the initial value', () => {
    render(<TitleInput title='Initial Title' onTitleChange={vi.fn()} />);

    const input = screen.getByTestId('title-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Initial Title');
  });

  it('should update the input value when typing', () => {
    const WrapperComponent = () => {
      const [title, setTitle] = useState('');
      return <TitleInput title={title} onTitleChange={setTitle} />;
    };

    render(<WrapperComponent />);

    const input = screen.getByTestId('title-input');
    fireEvent.change(input, { target: { value: 'New Title' } });

    expect(input).toHaveValue('New Title');
  });

  it('should call onTitleChange with the correct value when changing the input', () => {
    const mockOnTitleChange = vi.fn();
    render(<TitleInput title='' onTitleChange={mockOnTitleChange} />);

    const input = screen.getByTestId('title-input');
    fireEvent.change(input, { target: { value: 'Change Test' } });

    expect(mockOnTitleChange).toHaveBeenCalledWith('Change Test');
  });

  it('should render the component correctly', () => {
    const { asFragment } = render(
      <TitleInput title='' onTitleChange={() => {}} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
