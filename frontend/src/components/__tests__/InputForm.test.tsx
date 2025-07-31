import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import InputForm from '../InputForm';

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

    expect(screen.getByLabelText(/enter your message/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /send message/i })
    ).toBeInTheDocument();
  });

  it('shows character count', () => {
    render(<InputForm {...defaultProps} />);

    expect(screen.getByText('0/1000 characters')).toBeInTheDocument();
  });

  it('updates character count when typing', () => {
    render(<InputForm {...defaultProps} />);

    const input = screen.getByLabelText(/enter your message/i);
    fireEvent.change(input, { target: { value: 'Hello' } });

    expect(screen.getByText('5/1000 characters')).toBeInTheDocument();
  });

  it('calls onSubmit when form is submitted with valid input', async () => {
    render(<InputForm {...defaultProps} />);

    const input = screen.getByLabelText(/enter your message/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });

    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith('Test message');
    });
  });

  it('shows error for empty message when form is submitted', async () => {
    render(<InputForm {...defaultProps} />);

    const input = screen.getByLabelText(/enter your message/i);

    // Type something then clear it to enable the button
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.change(input, { target: { value: '' } });

    // Submit the form directly
    const form = input.closest('form')!;
    fireEvent.submit(form);

    expect(screen.getByText(/please enter a message/i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('shows error for message too long when form is submitted', async () => {
    render(<InputForm {...defaultProps} />);

    const input = screen.getByLabelText(/enter your message/i);
    const longMessage = 'a'.repeat(1001);

    fireEvent.change(input, { target: { value: longMessage } });

    // Submit the form directly
    const form = input.closest('form')!;
    fireEvent.submit(form);

    expect(
      screen.getByText(/message cannot exceed 1000 characters/i)
    ).toBeInTheDocument();
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

  it('clears error when user starts typing', () => {
    render(<InputForm {...defaultProps} />);

    const input = screen.getByLabelText(/enter your message/i);

    // Create an error first
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.change(input, { target: { value: '' } });
    const form = input.closest('form')!;
    fireEvent.submit(form);

    expect(screen.getByText(/please enter a message/i)).toBeInTheDocument();

    // Start typing to clear error
    fireEvent.change(input, { target: { value: 'new message' } });

    expect(
      screen.queryByText(/please enter a message/i)
    ).not.toBeInTheDocument();
  });

  it('disables submit button when message is empty', () => {
    render(<InputForm {...defaultProps} />);

    const submitButton = screen.getByRole('button', { name: /send message/i });
    expect(submitButton).toBeDisabled();

    // Type something to enable button
    const input = screen.getByLabelText(/enter your message/i);
    fireEvent.change(input, { target: { value: 'test' } });

    expect(submitButton).not.toBeDisabled();
  });
});
