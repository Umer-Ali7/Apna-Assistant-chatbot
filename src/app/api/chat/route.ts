import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const { message, history = [] } = await request.json();

    // Validate the message
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured. Please set GEMINI_API_KEY environment variable.' },
        { status: 500 }
      );
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    interface Message {
      role: string;
      content: string;
    }

    // Prepare the conversation history for context
    let conversationContext = '';
    if (history && history.length > 0) {
      conversationContext = (history as Message[])
        .slice(-10) // Keep only the last 10 messages for context
        .map((msg) => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n');
      conversationContext += '\n';
    }

    // Create the prompt with context
    const prompt = conversationContext + `User: ${message}\nAssistant:`;

    // Generate response
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Return the response
    return NextResponse.json({
      message: text,
      timestamp: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error('Error in chat API:', error);

    // error.message ko type-safe banayein
    const errorMessage = (error as Error).message || "Unknown error";

    // Handle specific error types
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

    // Generic error response
    return NextResponse.json(
      { error: 'An error occurred while processing your request. Please try again.' },
      { status: 500 }
    );
  }
}

// Handle CORS for development
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

