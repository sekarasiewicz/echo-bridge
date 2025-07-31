import { useState, useId } from 'react';
import './InputForm.css';

type InputFormProps = {
  onSubmit: (message: string) => Promise<void>;
  isLoading: boolean;
};

const InputForm = ({ onSubmit, isLoading }: InputFormProps) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const messageId = useId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!message.trim()) {
      setError('Please enter a message');
      return;
    }

    if (message.length > 1000) {
      setError('Message cannot exceed 1000 characters');
      return;
    }

    try {
      await onSubmit(message.trim());
      setMessage(''); // Clear form on success
    } catch (err) {
      // Error handling is done in the parent component
      console.error('Form submission error:', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (error) {
      setError(''); // Clear error when user starts typing
    }
  };

  return (
    <form onSubmit={handleSubmit} className='input-form'>
      <div className='form-group'>
        <label htmlFor={messageId} className='form-label'>
          Enter your message:
        </label>
        <textarea
          id={messageId}
          value={message}
          onChange={handleInputChange}
          placeholder='Type your message here...'
          className={`form-input ${error ? 'error' : ''}`}
          rows={4}
          maxLength={1000}
          disabled={isLoading}
        />
        <div className='input-footer'>
          <span className='char-count'>{message.length}/1000 characters</span>
          {error && <span className='error-message'>{error}</span>}
        </div>
      </div>

      <button
        type='submit'
        className={`submit-button ${isLoading ? 'loading' : ''}`}
        disabled={isLoading || !message.trim()}
      >
        {isLoading ? (
          <>
            <span className='spinner'></span>
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
};

export default InputForm;
