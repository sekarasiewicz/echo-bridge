import { useState } from 'react';
import InputForm from './components/InputForm';
import ResponseDisplay from './components/ResponseDisplay';
import { echoService } from './services/api';
import type { EchoResponse, ApiError, EchoRequest } from './types/api';

function App() {
  const [response, setResponse] = useState<EchoResponse | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: EchoRequest) => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await echoService.echoMessage(data.message);
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
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-8'>
        <header className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-foreground mb-2'>
            Echo Bridge
          </h1>
          <p className='text-muted-foreground'>
            Send a message and see it echoed back from the server
          </p>
        </header>

        <main className='space-y-6'>
          <InputForm onSubmit={handleSubmit} isLoading={isLoading} />
          <ResponseDisplay
            response={response}
            error={error}
            isLoading={isLoading}
          />
        </main>

        <footer className='text-center mt-12 pt-8 border-t'>
          <p className='text-sm text-muted-foreground'>
            Built with React, TypeScript, and Vite
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
