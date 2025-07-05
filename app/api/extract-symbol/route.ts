import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { input } = await request.json();
    
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      return NextResponse.json({ symbol: null }, { status: 200 });
    }

    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
You are a stock symbol extraction expert. Extract the most likely stock ticker symbol from the user's input.

Rules:
1. Look for company names (even with spelling mistakes)
2. Look for ticker symbols
3. Consider context and intent
4. Handle common misspellings
5. Return ONLY the ticker symbol in uppercase, or null if no valid stock is mentioned

Common mappings:
- nvidia/nvida/nvidea → NVDA
- apple/aple → AAPL  
- tesla/teslla → TSLA
- microsoft/microsft → MSFT
- google/gogle/alphabet → GOOGL
- amazon/amazn → AMZN
- meta/facebook → META
- netflix/netlix → NFLX

User input: "${input}"

Response format: Just the ticker symbol (e.g., "NVDA") or "null" if no stock is mentioned.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim().toUpperCase();
    
    // Validate the response
    const symbol = text === "NULL" || text === "NONE" ? null : text.match(/^[A-Z]{1,5}$/)?.[0] || null;
    
    return NextResponse.json({ symbol });
  } catch (error) {
    console.error('Error in symbol extraction:', error);
    return NextResponse.json({ symbol: null }, { status: 200 });
  }
} 