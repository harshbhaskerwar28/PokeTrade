import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  let text = '';
  try {
    const requestData = await request.json();
    text = requestData.text;
    const targetLanguage = requestData.targetLanguage;
    const context = requestData.context;
    
    console.log(`🌐 Translation request: ${targetLanguage}, length: ${text.length}`);
    
    // Return original text if English or no API key
    if (targetLanguage === 'en' || !process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      return NextResponse.json({ translatedText: text }, { status: 200 });
    }

    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.1,
      }
    });

    const languageNames = {
      hi: 'Hindi (हिंदी)',
      te: 'Telugu (తెలుగు)',
      en: 'English'
    };

    // Split very long text into chunks if needed
    const maxChunkSize = 4000;
    if (text.length > maxChunkSize) {
      const chunks = [];
      for (let i = 0; i < text.length; i += maxChunkSize) {
        chunks.push(text.slice(i, i + maxChunkSize));
      }
      
      const translatedChunks = await Promise.all(
        chunks.map(async (chunk) => {
          const prompt = createTranslationPrompt(chunk, targetLanguage, languageNames[targetLanguage], context);
          const result = await model.generateContent(prompt);
          const response = await result.response;
          return response.text().trim();
        })
      );
      
      const translatedText = translatedChunks.join(' ');
      console.log(`✅ Translation complete: ${translatedText.length} characters`);
      return NextResponse.json({ translatedText });
    }

    const prompt = createTranslationPrompt(text, targetLanguage, languageNames[targetLanguage], context);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const translatedText = response.text().trim();
    
    console.log(`✅ Translation complete: ${translatedText.length} characters`);
    return NextResponse.json({ translatedText });
  } catch (error) {
    console.error('❌ Translation error:', error);
    return NextResponse.json({ translatedText: text }, { status: 200 });
  }
}

function createTranslationPrompt(text: string, targetLanguage: string, languageName: string, context: string) {
  return `You are an expert translator specializing in financial and trading content. Translate the following text to ${languageName} while preserving:

1. Financial terms and concepts accurately
2. Stock symbols (NVDA, AAPL, etc.) unchanged
3. Numbers, percentages, and currency values unchanged
4. Markdown formatting (**, *, \`\`\`, etc.)
5. Emojis and special characters
6. Professional trading terminology

Context: ${context}

Text to translate:
"${text}"

Requirements:
- Maintain the professional tone
- Keep all stock symbols, numbers, and percentages exactly as they are
- Preserve markdown formatting
- Use appropriate financial terminology in the target language
- Keep proper nouns (company names, API names) in English
- Translate technical analysis terms accurately
- Keep financial abbreviations (RSI, MACD, etc.) in English

Translate to ${languageName}:`;
} 