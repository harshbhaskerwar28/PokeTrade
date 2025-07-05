"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language, Translations } from '@/lib/translations';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: Translations;
  getLanguageInfo: () => { code: Language; name: string; flag: string };
  translateText: (text: string) => Promise<string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  // Load saved language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('poketrade-language') as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when changed
  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('poketrade-language', language);
    
    // Update document language attribute
    document.documentElement.lang = language;
  };

  // Get current translations
  const t = translations[currentLanguage];

  // Get language info for display
  const getLanguageInfo = () => {
    const languageMap = {
      en: { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
      hi: { code: 'hi' as Language, name: 'हिंदी', flag: '🇮🇳' },
      te: { code: 'te' as Language, name: 'తెలుగు', flag: '🇮🇳' },
    };
    return languageMap[currentLanguage];
  };

  // AI-powered translation for dynamic content like chatbot responses
  const translateText = async (text: string): Promise<string> => {
    if (currentLanguage === 'en') {
      return text; // No translation needed for English
    }

    if (!text || text.trim() === '') {
      return text; // Return empty text as-is
    }

    try {
      console.log(`🌐 Translating to ${currentLanguage}: "${text.substring(0, 100)}..."`);
      
      // Use Gemini AI for translation if available
      if (process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        const response = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text,
            targetLanguage: currentLanguage,
            context: 'financial_trading'
          })
        });

        if (response.ok) {
          const { translatedText } = await response.json();
          console.log(`✅ Translation result: "${translatedText.substring(0, 100)}..."`);
          return translatedText;
        } else {
          console.error(`❌ Translation API failed: ${response.status}`);
        }
      } else {
        console.warn('⚠️ No Gemini API key found for translation');
      }

      // Fallback: Return original text if translation fails
      return text;
    } catch (error) {
      console.error('❌ Translation failed, using original text:', error);
      return text;
    }
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setLanguage,
      t,
      getLanguageInfo,
      translateText
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Voice language mapping for speech recognition and synthesis
export function getVoiceLanguage(language: Language): string {
  const voiceLanguageMap = {
    en: 'en-US',
    hi: 'hi-IN',
    te: 'te-IN'
  };
  return voiceLanguageMap[language];
} 