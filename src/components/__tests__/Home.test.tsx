import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../Home';
import '@testing-library/jest-dom';

describe('Home Component', () => {
  test('renders Home component', () => {
    render(<Home />);
    expect(screen.getByText('User Management System')).toBeInTheDocument();
  });

  // Add more test cases here as needed
});