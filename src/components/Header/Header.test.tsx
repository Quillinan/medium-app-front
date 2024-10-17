import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

it('Should render header name', () => {
  const tabName = 'test';

  render(<Header title={tabName} />);

  const headerElement = screen.getByText(tabName);
  expect(headerElement).toBeInTheDocument();

  expect(headerElement).toMatchSnapshot();
});
