import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import InputForm from './InputForm';

describe('InputForm', () => {
  const mockOnSubmit = vi.fn();

  const defaultProps = {
    onSubmit: mockOnSubmit,
    isLoading: false,
  };

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders input field and submit button', () => {
    render(<InputForm {...defaultProps} />);

    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /send message/i })
    ).toBeInTheDocument();
  });

  it('shows character count', () => {
    render(<InputForm {...defaultProps} />);

    expect(screen.getByText('0/1000')).toBeInTheDocument();
  });

  it('updates character count when typing', () => {
    render(<InputForm {...defaultProps} />);

    const input = screen.getByLabelText(/message/i);
    fireEvent.change(input, { target: { value: 'Hello' } });

    expect(screen.getByText('5/1000')).toBeInTheDocument();
  });

  it('calls onSubmit when form is submitted with valid input', async () => {
    render(<InputForm {...defaultProps} />);

    const input = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });

    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({ message: 'Test message' });
    });
  });

  it('prevents submission when message is empty', async () => {
    render(<InputForm {...defaultProps} />);

    const input = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Button should be disabled when message is empty
    expect(submitButton).toBeDisabled();

    // Try to submit the form directly
    const form = input.closest('form')!;
    fireEvent.submit(form);

    // onSubmit should not be called
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('prevents submission when message is too long', async () => {
    render(<InputForm {...defaultProps} />);

    const input = screen.getByLabelText(/message/i);
    const longMessage = 'a'.repeat(1001);

    fireEvent.change(input, { target: { value: longMessage } });

    // Submit the form directly
    const form = input.closest('form')!;
    fireEvent.submit(form);

    // onSubmit should not be called due to validation
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('disables submit button when loading', () => {
    render(<InputForm {...defaultProps} isLoading={true} />);

    const submitButton = screen.getByRole('button', { name: /sending/i });
    expect(submitButton).toBeDisabled();
  });

  it('shows loading state', () => {
    render(<InputForm {...defaultProps} isLoading={true} />);

    expect(screen.getByText(/sending/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sending/i })
    ).toBeInTheDocument();
  });

  it('enables button when user types valid message', () => {
    render(<InputForm {...defaultProps} />);

    const input = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Button should be disabled initially
    expect(submitButton).toBeDisabled();

    // Type a valid message
    fireEvent.change(input, { target: { value: 'valid message' } });

    // Button should be enabled
    expect(submitButton).not.toBeDisabled();
  });

  it('disables submit button when message is empty', () => {
    render(<InputForm {...defaultProps} />);

    const submitButton = screen.getByRole('button', { name: /send message/i });
    expect(submitButton).toBeDisabled();

    // Type something to enable button
    const input = screen.getByLabelText(/message/i);
    fireEvent.change(input, { target: { value: 'test' } });

    expect(submitButton).not.toBeDisabled();
  });
});
