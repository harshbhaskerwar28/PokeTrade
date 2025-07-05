"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Globe } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Language } from '@/lib/translations';

export function LanguageSelector() {
  const { currentLanguage, setLanguage, getLanguageInfo } = useLanguage();
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en' as Language, name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'hi' as Language, name: 'Hindi', flag: '🇮🇳', nativeName: 'हिंदी' },
    { code: 'te' as Language, name: 'Telugu', flag: '🇮🇳', nativeName: 'తెలుగు' },
  ];

  const currentLangInfo = getLanguageInfo();

  const handleLanguageChange = (language: Language) => {
    setLanguage(language);
    setIsOpen(false);
    
    // Optional: Show a brief success message
    console.log(`Language changed to ${languages.find(l => l.code === language)?.nativeName}`);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`gap-2 backdrop-blur-sm border ${
            isDark 
              ? 'text-white hover:text-yellow-300 bg-white/10 hover:bg-white/20 border-white/20' 
              : 'text-slate-900 hover:text-blue-600 bg-black/10 hover:bg-black/20 border-black/20'
          }`}
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLangInfo.flag}</span>
          <span className="hidden md:inline">{currentLangInfo.name}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={`w-48 backdrop-blur-sm ${
        isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
      }`}>
        {languages.map((language) => (
                      <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`flex items-center gap-3 cursor-pointer ${
                isDark ? 'text-white hover:bg-white/10' : 'text-slate-900 hover:bg-slate-100'
              } ${
                currentLanguage === language.code 
                  ? isDark 
                    ? 'bg-yellow-500/20 text-yellow-300 border-l-2 border-yellow-400' 
                    : 'bg-blue-50 text-blue-600 border-l-2 border-blue-400'
                  : ''
              }`}
            >
            <span className="text-lg">{language.flag}</span>
            <div className="flex flex-col">
              <span className="font-medium">{language.nativeName}</span>
                              <span className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                  {language.name}
                </span>
            </div>
                          {currentLanguage === language.code && (
                <div className="ml-auto">
                  <div className={`h-2 w-2 rounded-full ${
                    isDark ? 'bg-yellow-400' : 'bg-blue-600'
                  }`}></div>
                </div>
              )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 