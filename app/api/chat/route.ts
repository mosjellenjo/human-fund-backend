import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: message }],
    }),
  });

  let data;
  try {
    data = await response.json();
  } catch (e) {
    return NextResponse.json({ reply: "Sorry, I couldn't understand the response from the server." }, { status: 500 });
  }

  if (!data.choices || !data.choices[0]) {
    return NextResponse.json({ reply: data.error?.message || "Sorry, I couldn't get a response from the AI." }, { status: 500 });
  }

  return NextResponse.json({ reply: data.choices[0].message.content });
}