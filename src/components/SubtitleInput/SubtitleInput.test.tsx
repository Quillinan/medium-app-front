import { render, screen, fireEvent } from '@testing-library/react';
import SubtitleInput from './SubtitleInput';
import { useState } from 'react';

describe('SubtitleInput', () => {
  it('should render the component with the initial value', () => {
    render(
      <SubtitleInput subtitle='Initial Title' onSubtitleChange={vi.fn()} />
    );

    const input = screen.getByTestId('subtitle-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Initial Title');
  });

  it('should update the input value when typing', () => {
    const WrapperComponent = () => {
      const [subtitle, setSubtitle] = useState('');
      return (
        <SubtitleInput subtitle={subtitle} onSubtitleChange={setSubtitle} />
      );
    };

    render(<WrapperComponent />);

    const input = screen.getByTestId('subtitle-input');
    fireEvent.change(input, { target: { value: 'New Subtitle' } });

    expect(input).toHaveValue('New Subtitle');
  });

  it('should call onSubtitleChange with the correct value when changing the input', () => {
    const mockOnSubtitleChange = vi.fn();
    render(
      <SubtitleInput subtitle='' onSubtitleChange={mockOnSubtitleChange} />
    );

    const input = screen.getByTestId('subtitle-input');
    fireEvent.change(input, { target: { value: 'Change Test' } });

    expect(mockOnSubtitleChange).toHaveBeenCalledWith('Change Test');
  });

  it('should render the component correctly', () => {
    const { asFragment } = render(
      <SubtitleInput subtitle='' onSubtitleChange={() => {}} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
