import React from 'react';
import { EchoResponse, ApiError } from '../types/api';
import './ResponseDisplay.css';

interface ResponseDisplayProps {
  response: EchoResponse | null;
  error: ApiError | null;
  isLoading: boolean;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ 
  response, 
  error, 
  isLoading 
}) => {
  if (isLoading) {
    return (
      <div className="response-display loading">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Processing your message...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="response-display error">
        <div className="error-container">
          <h3>Error</h3>
          <p className="error-title">{error.error}</p>
          <p className="error-message">{error.message}</p>
          {error.status > 0 && (
            <p className="error-status">Status: {error.status}</p>
          )}
          <p className="error-timestamp">
            {new Date(error.timestamp).toLocaleString()}
          </p>
        </div>
      </div>
    );
  }

  if (response) {
    return (
      <div className="response-display success">
        <div className="response-container">
          <h3>Response</h3>
          <div className="response-content">
            <p className="response-text">{response.echo}</p>
            <p className="response-timestamp">
              Received at: {new Date(response.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="response-display empty">
      <div className="empty-container">
        <p>Send a message to see the response here</p>
      </div>
    </div>
  );
};

export default ResponseDisplay; 