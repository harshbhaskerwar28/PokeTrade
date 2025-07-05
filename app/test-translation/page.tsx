"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSelector } from '@/components/language-selector';

export default function TestTranslationPage() {
  const { translateText, currentLanguage, t } = useLanguage();
  const [inputText, setInputText] = useState('NVIDIA Corporation shows strong bullish momentum with significant AI market growth potential.');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    setIsTranslating(true);
    setError('');
    
    try {
      console.log('🧪 Testing translation...');
      const result = await translateText(inputText);
      setTranslatedText(result);
      console.log('✅ Translation test complete');
    } catch (err) {
      console.error('❌ Translation test failed:', err);
      setError(err instanceof Error ? err.message : 'Translation failed');
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Translation Test</CardTitle>
            <LanguageSelector />
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-white mb-2">Current Language: {currentLanguage}</h3>
              <p className="text-slate-300">API Key Available: {process.env.NEXT_PUBLIC_GEMINI_API_KEY ? 'Yes' : 'No'}</p>
            </div>
            
            <div>
              <label className="text-white block mb-2">Input Text (English):</label>
              <Input 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Enter text to translate..."
              />
            </div>
            
            <Button 
              onClick={handleTranslate} 
              disabled={isTranslating || currentLanguage === 'en'}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isTranslating ? 'Translating...' : `Translate to ${currentLanguage}`}
            </Button>
            
            {error && (
              <div className="bg-red-900/20 border border-red-500 p-4 rounded">
                <p className="text-red-300">Error: {error}</p>
              </div>
            )}
            
            {translatedText && (
              <div className="space-y-2">
                <label className="text-white block">Translated Text:</label>
                <div className="bg-slate-700 border border-slate-600 p-4 rounded">
                  <p className="text-white">{translatedText}</p>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <h4 className="text-white">UI Translation Test:</h4>
              <div className="bg-slate-700 p-4 rounded space-y-2">
                <p className="text-white">Current Price: {t.chatbot.currentPrice}</p>
                <p className="text-white">Trading Insights: {t.chatbot.tradingInsights}</p>
                <p className="text-white">Market Intelligence: {t.chatbot.marketIntelligence}</p>
                <p className="text-white">Buy Recommendation: {t.chatbot.buyRecommendation}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 