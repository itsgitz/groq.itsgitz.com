'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { groqApi } from '@/lib/groq';
import {QuestionForm, QuestionFormSchema} from '@/lib/types/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Home() {
  const { toast } = useToast();
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const form = useForm<QuestionForm>({
    resolver: zodResolver(QuestionFormSchema),
  });

  async function onSubmit(data: QuestionForm) {
    const question = data.question;
    setLoading(true);

    toast({
      title: 'You submitted the question!',
    });

    console.log('my question is', question);

    const result = await groqApi(question);

    const answer = result?.choices[0].message.content;
    if (!answer) {
      setAnswer(`Sorry, I couldn't understand your question 😔`);
    }
    setAnswer(answer!);

    setLoading(false);
    form.reset({ question: '' });
  }

  return (
    <div className='container mx-auto'>
      <div className='py-3'>
        <h1 className='text-4xl font-bold'>
          Ask Gitz (AI) - Powered by{' '}
          <a href='https://groq.com/' target='_blank'>
            Groq
          </a>
        </h1>
      </div>
      <div className='py-3'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-2/3 space-y-6'
          >
            <FormField
              control={form.control}
              name='question'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apa yang ingin kau tanyakan?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Tanya aku apa saja ...'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Aku akan berusaha sebisa mungkin untuk menjawabmu dengan
                    Bahasa Indonesia
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Submit</Button>
          </form>
        </Form>
      </div>

      <div className='py-3'>
        <p className='antialiased font-light'>
          {loading === true ? 'Sebentar, aku sedang mikir ...' : answer}
        </p>
      </div>
    </div>
  );
}
