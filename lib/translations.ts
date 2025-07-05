export interface Translations {
  // Navigation
  nav: {
    dashboard: string;
    market: string;
    portfolio: string;
    assistant: string;
  };
  
  // Dashboard
  dashboard: {
    welcome: string;
    overview: string;
    holdings: string;
    performance: string;
    recentTrades: string;
    trending: string;
    insights: string;
    watchlist: string;
  };
  
  // Chatbot
  chatbot: {
    title: string;
    welcome: string;
    placeholder: string;
    voiceMode: string;
    stopSpeaking: string;
    listening: string;
    processing: string;
    send: string;
    refresh: string;
    maximize: string;
    minimize: string;
    lineChart: string;
    candlestick: string;
    currentPrice: string;
    tradingInsights: string;
    confidence: string;
    priceTarget: string;
    marketIntelligence: string;
    keyMetrics: string;
    latestNews: string;
    volume: string;
    high: string;
    low: string;
    open: string;
    close: string;
    recommendation: string;
    buyRecommendation: string;
    sellRecommendation: string;
    holdRecommendation: string;
    errorMessage: string;
    noData: string;
    setupRequired: string;
    tryAgain: string;
    realTimeData: string;
    freeData: string;
    premiumFeatures: string;
  };
  
  // Voice
  voice: {
    startListening: string;
    stopListening: string;
    speaking: string;
    notSupported: string;
    permissionDenied: string;
  };
  
  // Common
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    save: string;
    delete: string;
    edit: string;
    view: string;
    close: string;
    back: string;
    next: string;
    previous: string;
    yes: string;
    no: string;
    ok: string;
  };
}

export const translations: Record<string, Translations> = {
  en: {
    nav: {
      dashboard: "Dashboard",
      market: "Market",
      portfolio: "Portfolio", 
      assistant: "AI Assistant",
    },
    dashboard: {
      welcome: "Welcome to PokéTrade",
      overview: "Portfolio Overview",
      holdings: "Holdings",
      performance: "Performance",
      recentTrades: "Recent Trades",
      trending: "Trending Cards",
      insights: "AI Insights",
      watchlist: "Watch List",
    },
    chatbot: {
      title: "AI Trading Assistant",
      welcome: "🚀 **Welcome to PokéTrade AI Trading Assistant!**\n\nI provide **REAL-TIME** market analysis using:\n✅ **Yahoo Finance** - FREE live stock quotes (always available)\n🔹 **Finnhub API** - Premium stock data & news (optional)\n🔹 **Perplexity AI** - Real-time market insights\n🔹 **Gemini AI** - Advanced AI trading analysis\n\n**Stock data always available** via free Yahoo Finance!\n**For full features**, add Perplexity & Gemini API keys.\n\nTry: \"**analyze NVDA**\" or \"**tesla stock analysis**\"",
      placeholder: "Ask about stocks, market trends, or trading strategies...",
      voiceMode: "Voice Mode",
      stopSpeaking: "Stop Speaking",
      listening: "Listening...",
      processing: "Processing...",
      send: "Send",
      refresh: "Refresh",
      maximize: "Maximize",
      minimize: "Minimize",
      lineChart: "Line",
      candlestick: "OHLC",
      currentPrice: "Current Price",
      tradingInsights: "AI Trading Insights",
      confidence: "confidence",
      priceTarget: "Price Target",
      marketIntelligence: "Market Intelligence",
      keyMetrics: "Key Metrics",
      latestNews: "Latest News",
      volume: "Volume",
      high: "High",
      low: "Low",
      open: "Open",
      close: "Close",
      recommendation: "AI Trading Recommendation",
      buyRecommendation: "BUY",
      sellRecommendation: "SELL", 
      holdRecommendation: "HOLD",
      errorMessage: "Sorry, I encountered an error while processing your request. Please try again.",
      noData: "No data available",
      setupRequired: "API Setup Required",
      tryAgain: "Try Again",
      realTimeData: "Real-time data",
      freeData: "Free data available",
      premiumFeatures: "Premium features",
    },
    voice: {
      startListening: "Start Voice Input",
      stopListening: "Stop Listening",
      speaking: "Speaking...",
      notSupported: "Voice not supported in this browser",
      permissionDenied: "Microphone permission denied",
    },
    common: {
      loading: "Loading...",
      error: "Error",
      success: "Success",
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      view: "View",
      close: "Close",
      back: "Back",
      next: "Next",
      previous: "Previous",
      yes: "Yes",
      no: "No",
      ok: "OK",
    },
  },
  
  hi: {
    nav: {
      dashboard: "डैशबोर्ड",
      market: "बाज़ार",
      portfolio: "पोर्टफोलियो",
      assistant: "AI सहायक",
    },
    dashboard: {
      welcome: "PokéTrade में आपका स्वागत है",
      overview: "पोर्टफोलियो अवलोकन",
      holdings: "होल्डिंग्स",
      performance: "प्रदर्शन",
      recentTrades: "हाल के ट्रेड",
      trending: "ट्रेंडिंग कार्ड",
      insights: "AI अंतर्दृष्टि",
      watchlist: "वॉच लिस्ट",
    },
    chatbot: {
      title: "AI ट्रेडिंग सहायक",
      welcome: "🚀 **PokéTrade AI ट्रेडिंग सहायक में आपका स्वागत है!**\n\nमैं इनका उपयोग करके **रियल-टाइम** मार्केट विश्लेषण प्रदान करता हूं:\n✅ **Yahoo Finance** - मुफ्त लाइव स्टॉक कोट्स (हमेशा उपलब्ध)\n🔹 **Finnhub API** - प्रीमियम स्टॉक डेटा और समाचार (वैकल्पिक)\n🔹 **Perplexity AI** - रियल-टाइम मार्केट अंतर्दृष्टि\n🔹 **Gemini AI** - उन्नत AI ट्रेडिंग विश्लेषण\n\n**स्टॉक डेटा हमेशा उपलब्ध** मुफ्त Yahoo Finance के माध्यम से!\n**पूर्ण सुविधाओं के लिए**, Perplexity और Gemini API keys जोड़ें।\n\nकोशिश करें: \"**NVDA का विश्लेषण करें**\" या \"**tesla स्टॉक विश्लेषण**\"",
      placeholder: "स्टॉक, मार्केट ट्रेंड्स, या ट्रेडिंग रणनीतियों के बारे में पूछें...",
      voiceMode: "वॉयस मोड",
      stopSpeaking: "बोलना बंद करें",
      listening: "सुन रहा हूं...",
      processing: "प्रोसेसिंग...",
      send: "भेजें",
      refresh: "रिफ्रेश",
      maximize: "बड़ा करें",
      minimize: "छोटा करें",
      lineChart: "लाइन",
      candlestick: "OHLC",
      currentPrice: "वर्तमान मूल्य",
      tradingInsights: "AI ट्रेडिंग अंतर्दृष्टि",
      confidence: "विश्वास",
      priceTarget: "मूल्य लक्ष्य",
      marketIntelligence: "मार्केट इंटेलिजेंस",
      keyMetrics: "मुख्य मेट्रिक्स",
      latestNews: "नवीनतम समाचार",
      volume: "वॉल्यूम",
      high: "उच्च",
      low: "निम्न",
      open: "खुला",
      close: "बंद",
      recommendation: "AI ट्रेडिंग सिफारिश",
      buyRecommendation: "खरीदें",
      sellRecommendation: "बेचें",
      holdRecommendation: "रोकें",
      errorMessage: "माफ करें, आपके अनुरोध को संसाधित करते समय मुझे एक त्रुटि आई। कृपया पुनः प्रयास करें।",
      noData: "कोई डेटा उपलब्ध नहीं",
      setupRequired: "API सेटअप आवश्यक",
      tryAgain: "पुनः प्रयास करें",
      realTimeData: "रियल-टाइम डेटा",
      freeData: "मुफ्त डेटा उपलब्ध",
      premiumFeatures: "प्रीमियम सुविधाएं",
    },
    voice: {
      startListening: "वॉयस इनपुट शुरू करें",
      stopListening: "सुनना बंद करें",
      speaking: "बोल रहा हूं...",
      notSupported: "इस ब्राउज़र में वॉयस समर्थित नहीं है",
      permissionDenied: "माइक्रोफोन अनुमति अस्वीकृत",
    },
    common: {
      loading: "लोड हो रहा है...",
      error: "त्रुटि",
      success: "सफलता",
      cancel: "रद्द करें",
      save: "सेव करें",
      delete: "हटाएं",
      edit: "संपादित करें",
      view: "देखें",
      close: "बंद करें",
      back: "वापस",
      next: "अगला",
      previous: "पिछला",
      yes: "हां",
      no: "नहीं",
      ok: "ठीक है",
    },
  },
  
  te: {
    nav: {
      dashboard: "డాష్‌బోర్డ్",
      market: "మార్కెట్",
      portfolio: "పోర్ట్‌ఫోలియో",
      assistant: "AI అసిస్టెంట్",
    },
    dashboard: {
      welcome: "PokéTrade కు స్వాగతం",
      overview: "పోర్ట్‌ఫోలియో ఓవర్‌వ్యూ",
      holdings: "హోల్డింగ్స్",
      performance: "పనితీరు",
      recentTrades: "ఇటీవలి ట్రేడ్స్",
      trending: "ట్రెండింగ్ కార్డ్స్",
      insights: "AI ఇన్‌సైట్స్",
      watchlist: "వాచ్ లిస్ట్",
    },
    chatbot: {
      title: "AI ట్రేడింగ్ అసిస్టెంట్",
      welcome: "🚀 **PokéTrade AI ట్రేడింగ్ అసిస్టెంట్ కు స్వాగతం!**\n\nనేను ఈ వాటిని ఉపయోగించి **రియల్-టైమ్** మార్కెట్ విశ్లేషణ అందిస్తాను:\n✅ **Yahoo Finance** - ఉచిత లైవ్ స్టాక్ కోట్స్ (ఎల్లప్పుడూ అందుబాటులో)\n🔹 **Finnhub API** - ప్రీమియం స్టాక్ డేటా & న్యూస్ (ఐచ్ఛికం)\n🔹 **Perplexity AI** - రియల్-టైమ్ మార్కెట్ ఇన్‌సైట్స్\n🔹 **Gemini AI** - అధునాతన AI ట్రేడింగ్ విశ్లేషణ\n\n**స్టాక్ డేటా ఎల్లప్పుడూ అందుబాటులో** ఉచిత Yahoo Finance ద్వారా!\n**పూర్తి ఫీచర్‌ల కోసం**, Perplexity & Gemini API కీలను జోడించండి.\n\nప్రయత్నించండి: \"**NVDA విశ్లేషించు**\" లేదా \"**tesla స్టాక్ విశ్లేషణ**\"",
      placeholder: "స్టాక్స్, మార్కెట్ ట్రెండ్స్, లేదా ట్రేడింగ్ వ్యూహాల గురించి అడగండి...",
      voiceMode: "వాయిస్ మోడ్",
      stopSpeaking: "మాట్లాడడం ఆపు",
      listening: "వింటున్నాను...",
      processing: "ప్రాసెసింగ్...",
      send: "పంపు",
      refresh: "రిఫ్రెష్",
      maximize: "పెద్దది చేయి",
      minimize: "చిన్నది చేయి",
      lineChart: "లైన్",
      candlestick: "OHLC",
      currentPrice: "ప్రస్తుత ధర",
      tradingInsights: "AI ట్రేడింగ్ ఇన్‌సైట్స్",
      confidence: "విశ్వాసం",
      priceTarget: "ధర లక్ష్యం",
      marketIntelligence: "మార్కెట్ ఇంటెలిజెన్స్",
      keyMetrics: "కీలక మెట్రిక్స్",
      latestNews: "తాజా వార్తలు",
      volume: "వాల్యూమ్",
      high: "అధిక",
      low: "తక్కువ",
      open: "తెరవు",
      close: "మూసివేయి",
      recommendation: "AI ట్రేడింగ్ సిఫార్సు",
      buyRecommendation: "కొనుగోలు",
      sellRecommendation: "అమ్మకం",
      holdRecommendation: "పట్టుకో",
      errorMessage: "క్షమించండి, మీ అభ్యర్థనను ప్రాసెస్ చేస్తున్నప్పుడు నాకు లోపం వచ్చింది. దయచేసి మళ్లీ ప్రయత్నించండి.",
      noData: "డేటా అందుబాటులో లేదు",
      setupRequired: "API సెటప్ అవసరం",
      tryAgain: "మళ్లీ ప్రయత్నించు",
      realTimeData: "రియల్-టైమ్ డేటా",
      freeData: "ఉచిత డేటా అందుబాటులో",
      premiumFeatures: "ప్రీమియం ఫీచర్స్",
    },
    voice: {
      startListening: "వాయిస్ ఇన్‌పుట్ మొదలుపెట్టు",
      stopListening: "వినడం ఆపు",
      speaking: "మాట్లాడుతున్నాను...",
      notSupported: "ఈ బ్రౌజర్‌లో వాయిస్ మద్దతు లేదు",
      permissionDenied: "మైక్రోఫోన్ అనుమతి తిరస్కరించబడింది",
    },
    common: {
      loading: "లోడవుతోంది...",
      error: "లోపం",
      success: "విజయం",
      cancel: "రద్దుచేయి",
      save: "సేవ్ చేయి",
      delete: "తొలగించు",
      edit: "సవరించు",
      view: "చూడు",
      close: "మూసివేయి",
      back: "వెనుకకు",
      next: "తదుపరి",
      previous: "మునుపటి",
      yes: "అవును",
      no: "లేదు",
      ok: "సరేగా",
    },
  },
};

export type Language = keyof typeof translations; 