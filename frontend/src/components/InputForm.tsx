import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { EchoRequest } from '../types/api';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { echoFormSchema, type EchoFormData } from '../lib/schemas';

type InputFormProps = {
  onSubmit: (data: EchoRequest) => void;
  isLoading: boolean;
};

const InputForm = ({ onSubmit, isLoading }: InputFormProps) => {
  const form = useForm<EchoFormData>({
    resolver: zodResolver(echoFormSchema),
    defaultValues: {
      message: '',
    },
  });

  const handleSubmit = (data: EchoFormData) => {
    onSubmit({ message: data.message.trim() });
    form.reset();
  };

  return (
    <Card className='w-full max-w-2xl mx-auto'>
      <CardHeader>
        <CardTitle>Echo Bridge</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='message'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter your message here...'
                      disabled={isLoading}
                      className='min-h-[120px] resize-none'
                      {...field}
                    />
                  </FormControl>
                  <div className='flex justify-between items-center text-sm text-muted-foreground'>
                    <FormMessage />
                    <span>{field.value?.length || 0}/1000</span>
                  </div>
                </FormItem>
              )}
            />
            <Button
              type='submit'
              disabled={isLoading || !form.watch('message')?.trim()}
              className='w-full'
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default InputForm;
