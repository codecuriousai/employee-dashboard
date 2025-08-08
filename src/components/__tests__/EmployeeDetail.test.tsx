import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import EmployeeDetail from '../EmployeeDetail';

function renderWithRoutes(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<div data-testid="home-page">Home Page</div>} />
        <Route path="/employees" element={<div data-testid="employees-page">Employees Page</div>} />
        <Route path="/employees/:id" element={<EmployeeDetail />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('EmployeeDetail', () => {
  beforeEach(() => {
    jest.spyOn(window, 'confirm').mockImplementation(() => true);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders details for existing employee', () => {
    renderWithRoutes('/employees/1');
    expect(screen.getByText('Employee Details')).toBeInTheDocument();
    expect(screen.getByText('ID:')).toBeInTheDocument();
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
  });

  test('enters edit mode and cancels', () => {
    renderWithRoutes('/employees/1');
    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByLabelText('Name')).not.toBeInTheDocument();
  });

  test('deletes and navigates back to list', () => {
    renderWithRoutes('/employees/2');
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(screen.getByTestId('employees-page')).toBeInTheDocument();
  });
});
