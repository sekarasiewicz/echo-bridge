import { z } from 'zod';

export const echoFormSchema = z.object({
  message: z
    .string()
    .min(1, 'Please enter a message')
    .max(1000, 'Message must be 1000 characters or less'),
});

export type EchoFormData = z.infer<typeof echoFormSchema>;
