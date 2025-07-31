import type { EchoResponse, ApiError } from '../types/api';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { AlertCircle, CheckCircle, Loader2, MessageSquare } from 'lucide-react';

type ResponseDisplayProps = {
  response: EchoResponse | null;
  error: ApiError | null;
  isLoading: boolean;
};

const ResponseDisplay = ({
  response,
  error,
  isLoading,
}: ResponseDisplayProps) => {
  if (isLoading) {
    return (
      <Card className='w-full max-w-2xl mx-auto'>
        <CardContent className='flex items-center justify-center py-8'>
          <div className='flex flex-col items-center gap-4 text-center'>
            <Loader2 className='h-8 w-8 animate-spin text-primary' />
            <p className='text-muted-foreground'>Processing your message...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className='w-full max-w-2xl mx-auto border-destructive'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2 text-destructive'>
            <AlertCircle className='h-5 w-5' />
            Error
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-2'>
          <p className='font-medium text-destructive'>{error.error}</p>
          <p className='text-sm text-muted-foreground'>{error.message}</p>
          {error.status > 0 && (
            <p className='text-xs text-muted-foreground'>
              Status: {error.status}
            </p>
          )}
          <p className='text-xs text-muted-foreground'>
            {new Date(error.timestamp).toLocaleString()}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (response) {
    return (
      <Card className='w-full max-w-2xl mx-auto border-green-200 bg-green-50/50'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2 text-green-700'>
            <CheckCircle className='h-5 w-5' />
            Response
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='rounded-lg bg-white p-4 border'>
            <p className='text-lg font-medium'>{response.echo}</p>
          </div>
          <p className='text-xs text-muted-foreground'>
            Received at: {new Date(response.timestamp).toLocaleString()}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='w-full max-w-2xl mx-auto'>
      <CardContent className='flex items-center justify-center py-12'>
        <div className='flex flex-col items-center gap-4 text-center'>
          <MessageSquare className='h-12 w-12 text-muted-foreground/50' />
          <p className='text-muted-foreground'>
            Send a message to see the response here
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResponseDisplay;
