'use server';

import Groq from 'groq-sdk';

export async function groqApi(question: string) {
  if (!process.env.GROQ_API_KEY) {
    return undefined;
  }

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const completion = groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: `${question} in Indonesian`,
      },
    ],
    model: 'llama3-8b-8192',
  });

  if (!completion) {
    return undefined;
  }

  return completion;
}
