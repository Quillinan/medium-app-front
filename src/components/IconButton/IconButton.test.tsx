import { render, screen, fireEvent } from '@testing-library/react';
import IconButton from './IconButton';

describe('IconButton', () => {
  it('should render the icon', () => {
    const mockIcon = <svg data-testid='mock-icon' />;
    render(<IconButton icon={mockIcon} />);

    const icon = screen.getByTestId('mock-icon');
    expect(icon).toBeInTheDocument();
  });

  it('should include accessible text', () => {
    render(<IconButton icon={<svg />} />);

    const button = screen.getByRole('button');
    expect(button).toHaveAccessibleName('Button');
  });

  it('should call onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<IconButton icon={<svg />} onClick={handleClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should render without crashing when no onClick is provided', () => {
    render(<IconButton icon={<svg />} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
