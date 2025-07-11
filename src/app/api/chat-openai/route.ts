// src/app/api/chat-openai/route.ts
import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

// Message interface (yeh yahan bhi define kar lete hain)
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(request: NextRequest) {
  try {
    const { message, history = [] } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured. Please set OPENAI_API_KEY environment variable.' },
        { status: 500 }
      );
    }

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: 'You are a helpful AI assistant. Provide clear, accurate, and helpful responses to user questions.'
      }
    ];

    if (history && history.length > 0) {
      // Yahan 'msg: any' ko theek kiya
      const recentHistory = (history as Message[]).slice(-10);
      for (const msg of recentHistory) {
        messages.push({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content
        });
      }
    }

    messages.push({
      role: 'user',
      content: message
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 1000,
      temperature: 0.7,
      stream: false,
    });

    const responseMessage = completion.choices[0]?.message?.content;

    if (!responseMessage) {
      throw new Error('No response generated');
    }

    return NextResponse.json({
      message: responseMessage,
      timestamp: new Date().toISOString(),
    });

  } catch (error: unknown) { // 'any' ko 'unknown' kiya
    console.error('Error in OpenAI chat API:', error);

    let errorMessage = 'An unknown error occurred.';
    let status = 500;

    if (error instanceof OpenAI.APIError) {
      errorMessage = error.message;
      status = error.status || 500;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'object' && error !== null && 'error' in error && typeof (error as any).error === 'string') {
      errorMessage = (error as any).error;
    }

    if (errorMessage.includes('Invalid API key')) {
      status = 401;
    } else if (errorMessage.includes('quota exceeded') || errorMessage.includes('rate limit')) {
      status = 429;
    } else if (errorMessage.includes('content_policy')) {
      status = 400;
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: status }
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
