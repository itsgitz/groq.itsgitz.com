import { z } from 'zod';

export const QuestionFormSchema = z.object({
  question: z.string().min(3, {
    message: 'Pertanyaan tidak boleh kosong',
  }),
});

export type QuestionForm = z.infer<typeof QuestionFormSchema>;
