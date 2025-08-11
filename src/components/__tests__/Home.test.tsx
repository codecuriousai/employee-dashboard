import React from 'react';
import { render, screen, fireEvent, waitFor, within, waitForElementToBeRemoved } from '@testing-library/react';
import Home from '../Home';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

// Mock window.confirm for delete
beforeEach(() => {
  jest.spyOn(window, 'confirm').mockImplementation(() => true);
});
afterEach(() => {
  jest.restoreAllMocks();
});

describe('Home Component', () => {
  test('renders Home component', () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText('User Management System')).toBeInTheDocument();
  });

  test('renders initial users', () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
  });

  test('shows add user form when Add New User is clicked', () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Home />
      </MemoryRouter>
    );
    // Click the button (not the heading)
    const addBtn = screen.getByRole('button', { name: 'Add New User' });
    fireEvent.click(addBtn);
    // The form heading
    expect(screen.getByRole('heading', { name: 'Add New User' })).toBeInTheDocument();
    expect(screen.getByLabelText('Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone:')).toBeInTheDocument();
  });

  test('adds a new user', async () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Home />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Add New User' }));
    fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'alice@example.com' } });
    fireEvent.change(screen.getByLabelText('Phone:'), { target: { value: '111-222-3333' } });
    fireEvent.click(screen.getByRole('button', { name: /Add User/i }));
    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
    });
  });

  test('edits an existing user', async () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Home />
      </MemoryRouter>
    );
    fireEvent.click(screen.getAllByRole('button', { name: 'Edit' })[0]);
    expect(screen.getByRole('heading', { name: 'Edit User' })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'John Updated' } });
    fireEvent.click(screen.getByRole('button', { name: /Update User/i }));
    await waitFor(() => {
      expect(screen.getByText('John Updated')).toBeInTheDocument();
    });
  });

  test('deletes a user', async () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Home />
      </MemoryRouter>
    );
    
    // Verify Jane Smith exists initially
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    
    // Find the user card for Jane Smith and its delete button
    const janeCard = screen.getByText('Jane Smith').closest('.user-card') as HTMLElement;
    expect(janeCard).toBeInTheDocument();
    const deleteBtn = within(janeCard).getByRole('button', { name: 'Delete' });

    // Click delete button
    fireEvent.click(deleteBtn);
    // Wait for the element to be removed (only if it still exists)
    await waitFor(() => {
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });
  });
}); 