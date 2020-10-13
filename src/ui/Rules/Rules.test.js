import React from 'react';
import {render} from '@testing-library/react';
import Rules from './Rules';

test('renders Rules', () => {
  const {getByText} = render(<Rules />);
  const linkElement = getByText(/Rest of the rules/i);
  expect(linkElement).toBeInTheDocument();
});
