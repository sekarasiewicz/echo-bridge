import { z } from 'zod';

export const echoFormSchema = z.object({
  message: z
    .string()
    .min(1, 'Please enter a message')
    .max(1000, 'Message cannot exceed 1000 characters'),
});

export type EchoFormData = z.infer<typeof echoFormSchema>;
