import { z } from 'zod';

export const QuestionFormSchema = z.object({
  question: z.string().min(3, {
    message: 'Question must be at least 3 characters.',
  }),
});

export type QuestionForm = z.infer<typeof QuestionFormSchema>;
