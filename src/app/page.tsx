import Groq from "groq-sdk";

async function groqApi() {
  'use server'

  if (!process.env.GROQ_API_KEY) {
    return undefined
  }

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

  const completion = groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: 'Explain Indonesia dalam bahasa Indonesia'
      }
    ],
    model: 'llama3-8b-8192'
  })

  if (!completion) {
    return undefined
  }

  return completion
}

export default async function Home() {
  const chatCompletion = await groqApi()
  const result = chatCompletion?.choices[0].message.content

  if (!result) {
    return (
      <div className="container mx-auto">
        <div className="py-3">
          <h1 className="text-4xl">groq!</h1>
        </div>
        <div className="py-3">
          unable to proceed your request right now 😔
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto"> 
      <div className="py-3">
        <h1 className="text-4xl">groq!</h1>
      </div>
      <div className="py-3">
        {result}
      </div>
    </div> 
  );
}
