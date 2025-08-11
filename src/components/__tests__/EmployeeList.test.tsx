import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import EmployeeList from '../EmployeeList';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

describe('EmployeeList Component', () => {
  beforeEach(() => {
    jest.spyOn(window, 'confirm').mockImplementation(() => true);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  function renderWithRouter() {
    return render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <EmployeeList />
      </MemoryRouter>
    );
  }

  test('renders EmployeeList component', () => {
    renderWithRouter();
    expect(screen.getByText('Employee List')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  test('adds a new employee', async () => {
    renderWithRouter();
    fireEvent.click(screen.getByRole('button', { name: 'Add Employee' }));
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Dave' } });
    fireEvent.change(screen.getByLabelText('Department'), { target: { value: 'Sales' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'dave@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    await waitFor(() => {
      expect(screen.getByText('Dave')).toBeInTheDocument();
      expect(screen.getByText('Sales')).toBeInTheDocument();
    });
  });

  test('deletes an employee', async () => {
    renderWithRouter();
    // pick a known employee
    const targetCell = screen.getByText('Bob Smith');
    const row = targetCell.closest('tr') as HTMLElement;
    const deleteBtn = within(row).getByRole('button', { name: 'Delete' });
    fireEvent.click(deleteBtn);
    await waitFor(() => {
      expect(screen.queryByText('Bob Smith')).not.toBeInTheDocument();
    });
  });
});
