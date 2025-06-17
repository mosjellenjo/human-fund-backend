import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  // Add a system message to instruct the AI to use markdown
  const messagesWithMarkdownInstruction = [
    { role: "system", content: "You are KrugerGPT, a helpful assistant. Please format your responses using markdown, including bolding, italics, headings, and lists where appropriate." },
    ...messages,
  ];

  // Request the OpenAI API for the response based on the message
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    stream: true,
    messages: messagesWithMarkdownInstruction,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response as any);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}