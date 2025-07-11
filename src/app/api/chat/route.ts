// src/app/api/chat/route.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// Message interface (yeh yahan bhi define kar lete hain taaki type safety rahe)
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { message, history = [] } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured. Please set GEMINI_API_KEY environment variable.' },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    let conversationContext = '';
    if (history && history.length > 0) {
      // Yahan 'msg: any' ko theek kiya
      conversationContext = (history as Message[])
        .slice(-10)
        .map((msg: Message) => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n');
      conversationContext += '\n';
    }

    const prompt = conversationContext + `User: ${message}\nAssistant:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      message: text,
      timestamp: new Date().toISOString(),
    });

  } catch (error: unknown) { // 'any' ko 'unknown' kiya
    console.error('Error in chat API:', error);

    let errorMessage = 'An unknown error occurred.';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'object' && error !== null && 'error' in error && typeof (error as any).error === 'string') {
      errorMessage = (error as any).error; // Agar error object mein 'error' property hai
    }

    if (errorMessage.includes('API_KEY_INVALID')) {
      return NextResponse.json(
        { error: 'Invalid API key. Please check your Gemini API key configuration.' },
        { status: 401 }
      );
    }

    if (errorMessage.includes('QUOTA_EXCEEDED')) {
      return NextResponse.json(
        { error: 'API quota exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    if (errorMessage.includes('SAFETY')) {
      return NextResponse.json(
        { error: 'Content was blocked due to safety concerns. Please rephrase your message.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: errorMessage }, // Ab errorMessage use kiya
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
