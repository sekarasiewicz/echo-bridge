import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ResponseDisplay from './components/ResponseDisplay';
import { echoService } from './services/api';
import { EchoResponse, ApiError } from './types/api';
import './App.css';

function App() {
  const [response, setResponse] = useState<EchoResponse | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (message: string) => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await echoService.echoMessage(message);
      setResponse(result);
    } catch (err) {
      if (err && typeof err === 'object' && 'error' in err) {
        setError(err as ApiError);
      } else {
        setError({
          error: 'Unknown Error',
          message:
            err instanceof Error ? err.message : 'An unexpected error occurred',
          status: 0,
          timestamp: new Date().toISOString(),
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Echo Bridge</h1>
        <p>Send a message and see it echoed back from the server</p>
      </header>

      <main className="App-main">
        <InputForm onSubmit={handleSubmit} isLoading={isLoading} />
        <ResponseDisplay
          response={response}
          error={error}
          isLoading={isLoading}
        />
      </main>

      <footer className="App-footer">
        <p>Built with React, TypeScript, and Vite</p>
      </footer>
    </div>
  );
}

export default App;
