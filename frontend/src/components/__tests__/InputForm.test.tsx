import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import InputForm from '../InputForm'

describe('InputForm', () => {
  const mockOnSubmit = vi.fn()

  const defaultProps = {
    onSubmit: mockOnSubmit,
    isLoading: false,
  }

  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  it('renders input field and submit button', () => {
    render(<InputForm {...defaultProps} />)
    
    expect(screen.getByLabelText(/enter your message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('shows character count', () => {
    render(<InputForm {...defaultProps} />)
    
    expect(screen.getByText('0/1000 characters')).toBeInTheDocument()
  })

  it('updates character count when typing', () => {
    render(<InputForm {...defaultProps} />)
    
    const input = screen.getByLabelText(/enter your message/i)
    fireEvent.change(input, { target: { value: 'Hello' } })
    
    expect(screen.getByText('5/1000 characters')).toBeInTheDocument()
  })

  it('calls onSubmit when form is submitted with valid input', async () => {
    render(<InputForm {...defaultProps} />)
    
    const input = screen.getByLabelText(/enter your message/i)
    const submitButton = screen.getByRole('button', { name: /send message/i })
    
    fireEvent.change(input, { target: { value: 'Test message' } })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith('Test message')
    })
  })

  it('shows error for empty message', async () => {
    render(<InputForm {...defaultProps} />)
    
    const submitButton = screen.getByRole('button', { name: /send message/i })
    fireEvent.click(submitButton)
    
    expect(screen.getByText(/please enter a message/i)).toBeInTheDocument()
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('shows error for message too long', async () => {
    render(<InputForm {...defaultProps} />)
    
    const input = screen.getByLabelText(/enter your message/i)
    const longMessage = 'a'.repeat(1001)
    
    fireEvent.change(input, { target: { value: longMessage } })
    
    expect(screen.getByText(/message cannot exceed 1000 characters/i)).toBeInTheDocument()
  })

  it('disables submit button when loading', () => {
    render(<InputForm {...defaultProps} isLoading={true} />)
    
    const submitButton = screen.getByRole('button', { name: /sending/i })
    expect(submitButton).toBeDisabled()
  })

  it('shows loading state', () => {
    render(<InputForm {...defaultProps} isLoading={true} />)
    
    expect(screen.getByText(/sending/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sending/i })).toBeInTheDocument()
  })
}) 