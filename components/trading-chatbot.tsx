"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  LineChart,
  Line,
  CandlestickChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import Draggable from "react-draggable";
import {
  Send,
  Maximize2,
  Minimize2,
  Move,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  BarChart3,
  Mic,
  MicOff,
  Volume2,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  ExternalLink,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { marketAPIService, StockQuote, CandlestickData, MarketNews, TradingInsight } from "@/lib/market-api-service";
import { useLanguage, getVoiceLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  data?: {
    quote?: StockQuote;
    charts?: {
      candlestick?: CandlestickData[];
      line?: { timestamp: number; price: number }[];
    };
    news?: MarketNews[];
    insights?: TradingInsight;
    perplexityInsights?: string;
  };
}

interface CustomCandlestick {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export function TradingChatbot() {
  const { t, currentLanguage, translateText } = useLanguage();
  const { isDark } = useTheme();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "assistant",
      content: t.chatbot.welcome,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedChart, setSelectedChart] = useState<"line" | "candlestick">("line");
  const [refreshing, setRefreshing] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Update welcome message when language changes
  useEffect(() => {
    setMessages(prev => prev.map(msg => 
      msg.id === "welcome" 
        ? { ...msg, content: t.chatbot.welcome }
        : msg
    ));
  }, [t.chatbot.welcome]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize speech recognition with language support
  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = getVoiceLanguage(currentLanguage);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [currentLanguage]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      // Update language for voice recognition
      recognitionRef.current.lang = getVoiceLanguage(currentLanguage);
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const speak = async (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      
      // Translate text if needed
      const translatedText = await translateText(text);
      
      const utterance = new SpeechSynthesisUtterance(translatedText);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.lang = getVoiceLanguage(currentLanguage);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const extractStockSymbol = async (input: string): Promise<string | null> => {
    const lowerInput = input.toLowerCase().trim();
    
    // Common greetings and non-stock phrases to ignore
    const greetings = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'];
    if (greetings.some(greeting => lowerInput.startsWith(greeting) && lowerInput.length < 20)) {
      return null;
    }
    
    // Extended company name to ticker mappings with common misspellings
    const companyMappings: Record<string, string> = {
      'nvidia': 'NVDA', 'nvida': 'NVDA', 'nvidea': 'NVDA', 'nviadia': 'NVDA',
      'apple': 'AAPL', 'aple': 'AAPL', 'appl': 'AAPL',
      'tesla': 'TSLA', 'teslla': 'TSLA', 'teslaa': 'TSLA',
      'microsoft': 'MSFT', 'microsft': 'MSFT', 'mircosoft': 'MSFT',
      'google': 'GOOGL', 'gogle': 'GOOGL', 'googel': 'GOOGL',
      'alphabet': 'GOOGL',
      'amazon': 'AMZN', 'amazn': 'AMZN', 'amazom': 'AMZN',
      'meta': 'META', 'facebook': 'META', 'facbook': 'META',
      'netflix': 'NFLX', 'netlix': 'NFLX',
      'amd': 'AMD',
      'intel': 'INTC', 'intle': 'INTC',
      'salesforce': 'CRM',
      'oracle': 'ORCL',
      'uber': 'UBER',
      'zoom': 'ZM',
      'palantir': 'PLTR',
      'paypal': 'PYPL',
      'square': 'SQ',
      'coinbase': 'COIN',
      'robinhood': 'HOOD'
    };

    // First check for company name mappings (including misspellings)
    for (const [company, ticker] of Object.entries(companyMappings)) {
      if (lowerInput.includes(company)) {
        console.log(`🎯 Detected company: "${company}" → ${ticker}`);
        return ticker;
      }
    }

    // Check for direct ticker symbols (1-5 uppercase letters)
    const symbolPattern = /\b([A-Z]{1,5})\b/g;
    const matches = input.match(symbolPattern);
    
    // Filter out common words that aren't stock symbols
    const excludeWords = ['GET', 'ALL', 'FOR', 'THE', 'AND', 'BUT', 'NOT', 'YOU', 'CAN', 'NEW', 'NOW', 'OLD', 'WAY', 'WHO', 'ITS', 'DID', 'YES', 'HIS', 'HER', 'HIM', 'SHE', 'HAS', 'HAD', 'HOW', 'WHY', 'PUT', 'TOO', 'TWO', 'USE', 'OUR', 'OUT', 'DAY', 'MAY', 'SAY', 'SIR', 'TOP', 'TRY', 'ASK', 'OWN', 'SEE', 'BIG', 'BOY', 'END', 'FEW', 'GOT', 'LET', 'MAN', 'RUN', 'SET', 'SIT', 'WIN', 'YET', 'HI', 'GIVE', 'SOME', 'NEWS', 'SHOW', 'TELL'];
    
    if (matches) {
      const validTickers = matches.filter(match => !excludeWords.includes(match));
      if (validTickers.length > 0) {
        console.log(`📊 Direct ticker detected: ${validTickers[0]}`);
        return validTickers[0];
      }
    }

    // Use AI to extract stock symbol from context if available
    try {
      if (process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        const aiSymbol = await extractSymbolWithAI(input);
        if (aiSymbol) {
          console.log(`🤖 AI detected symbol: ${aiSymbol}`);
          return aiSymbol;
        }
      }
    } catch (error) {
      console.warn("AI symbol extraction failed:", error);
    }
    
    return null;
  };

  const extractSymbolWithAI = async (input: string): Promise<string | null> => {
    try {
      const response = await fetch('/api/extract-symbol', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input })
      });
      
      if (response.ok) {
        const { symbol } = await response.json();
        return symbol;
      }
    } catch (error) {
      console.warn("AI symbol extraction API failed:", error);
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Check if user is asking for stock analysis
      const stockSymbol = await extractStockSymbol(input);
      console.log("🔍 Processing user input:", input);
      console.log("📊 Extracted stock symbol:", stockSymbol);
      
      if (stockSymbol) {
        console.log(`🚀 Getting comprehensive analysis for ${stockSymbol}...`);
        // Get comprehensive market analysis
        const analysis = await marketAPIService.getComprehensiveAnalysis(stockSymbol);
        console.log("📈 Analysis complete:", analysis);
        
        // Translate individual content pieces for better accuracy
        console.log('🌐 Starting translation process...');
        const translatedAnalysis = await translateText(analysis.tradingInsights.analysis || '');
        const translatedPerplexityInsights = await translateText(analysis.perplexityInsights || '');
        const translatedNewsHeadlines = await Promise.all(
          analysis.news.slice(0, 2).map(news => translateText(news.headline || ''))
        );
        console.log('✅ Translation process complete');
        
        // Create response content with translated pieces
        const responseContent = `📊 **${stockSymbol} Market Analysis** (${currentLanguage})

**${t.chatbot.currentPrice}**: $${analysis.quote?.price?.toFixed(2) || 'N/A'} 
${analysis.quote ? (analysis.quote.change >= 0 ? '📈' : '📉') : ''} ${analysis.quote?.change?.toFixed(2) || 'N/A'} (${analysis.quote?.changePercent?.toFixed(2) || 'N/A'}%)

**${t.chatbot.tradingInsights}**: ${analysis.tradingInsights.recommendation === "BUY" ? t.chatbot.buyRecommendation : analysis.tradingInsights.recommendation === "SELL" ? t.chatbot.sellRecommendation : t.chatbot.holdRecommendation} - ${analysis.tradingInsights.confidence}% ${t.chatbot.confidence}
💡 ${translatedAnalysis}

**${t.chatbot.marketIntelligence}** (via Perplexity):
${translatedPerplexityInsights}

**${t.chatbot.keyMetrics}**:
• ${t.chatbot.high}: $${analysis.quote?.high?.toFixed(2) || 'N/A'}
• ${t.chatbot.low}: $${analysis.quote?.low?.toFixed(2) || 'N/A'}
• ${t.chatbot.volume}: ${analysis.quote?.volume?.toLocaleString() || 'N/A'}
• ${t.chatbot.priceTarget}: $${analysis.tradingInsights.priceTarget?.toFixed(2) || 'N/A'}

📰 **${t.chatbot.latestNews}**: ${analysis.news.length} recent articles analyzed
${translatedNewsHeadlines.map(headline => `• ${headline}`).join('\n')}`;
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "assistant",
          content: responseContent,
          timestamp: new Date(),
          data: {
            quote: analysis.quote,
            charts: {
              candlestick: analysis.candlestickData,
              line: analysis.lineData
            },
            news: analysis.news,
            insights: analysis.tradingInsights,
            perplexityInsights: analysis.perplexityInsights
          }
        };

        setMessages(prev => [...prev, assistantMessage]);
        
        // Only speak if user explicitly enables voice mode
        // Removed auto-speaking to fix unwanted voice activation
      } else {
        // General chat question - use AI assistant
        const response = await marketAPIService.getChatResponse(input);
        const translatedResponse = await translateText(response);
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "assistant",
          content: translatedResponse,
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, assistantMessage]);
        // Removed auto-speaking - user must explicitly use voice button
      }
    } catch (error) {
      console.error("❌ Trading analysis error:", error);
      
      // Create error message and translate it
      const errorContent = `❌ **${t.chatbot.setupRequired}**

${error instanceof Error ? error.message : t.chatbot.errorMessage}

**To get REAL market data, please:**

1. **Create `.env.local` file** in your project root
2. **Add your API keys**:
   \`\`\`
   NEXT_PUBLIC_FINNHUB_API_KEY=your_finnhub_key (optional - Yahoo Finance used as free fallback)
   NEXT_PUBLIC_PERPLEXITY_API_KEY=your_perplexity_key  
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key
   \`\`\`
3. **Get API keys from**:
   - 🔹 **Finnhub**: https://finnhub.io/dashboard (60 calls/min free)
   - ✅ **Yahoo Finance**: FREE fallback (no key needed)
   - 🔹 **Perplexity**: https://www.perplexity.ai/settings/api  
   - 🔹 **Gemini**: https://makersuite.google.com/app/apikey

**No mock data is provided** - only real-time data from actual APIs.`;

      const translatedErrorContent = await translateText(errorContent);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: translatedErrorContent,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = async () => {
    setRefreshing(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const CustomCandlestickChart = ({ data }: { data: CandlestickData[] }) => {
    if (!data || data.length === 0) {
      return (
        <div className="h-[300px] flex items-center justify-center text-slate-400">
          No candlestick data available
        </div>
      );
    }

    // For now, show OHLC as a composite line chart with enhanced tooltips
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(value) => new Date(value).toLocaleDateString()}
            stroke="#9ca3af"
            fontSize={12}
          />
          <YAxis 
            domain={['dataMin', 'dataMax']} 
            stroke="#9ca3af"
            fontSize={12}
            tickFormatter={(value) => `$${value.toFixed(0)}`}
          />
          <Tooltip
            labelFormatter={(value) => new Date(value).toLocaleDateString()}
            content={({ active, payload, label }) => {
              if (active && payload && payload.length > 0) {
                const data = payload[0].payload;
                const isGreen = data.close >= data.open;
                return (
                  <div className="bg-slate-800 border border-slate-600 p-3 rounded-lg text-white">
                    <p className="text-slate-300 mb-2">{new Date(label).toLocaleDateString()}</p>
                    <div className="space-y-1 text-sm">
                      <div>Open: <span className="font-mono">${data.open?.toFixed(2)}</span></div>
                      <div>High: <span className="font-mono text-green-400">${data.high?.toFixed(2)}</span></div>
                      <div>Low: <span className="font-mono text-red-400">${data.low?.toFixed(2)}</span></div>
                      <div>Close: <span className={`font-mono font-bold ${isGreen ? 'text-green-400' : 'text-red-400'}`}>${data.close?.toFixed(2)}</span></div>
                      <div>Volume: <span className="font-mono">{data.volume?.toLocaleString()}</span></div>
                      <div className={`text-xs ${isGreen ? 'text-green-400' : 'text-red-400'}`}>
                        {isGreen ? '📈' : '📉'} {((data.close - data.open) / data.open * 100).toFixed(2)}%
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          {/* Show close price as main line */}
          <Line
            type="monotone"
            dataKey="close"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={false}
            name="Close Price"
          />
          {/* Show high and low as area indicators */}
          <Line
            type="monotone"
            dataKey="high"
            stroke="#10b981"
            strokeWidth={1}
            strokeDasharray="2 2"
            dot={false}
            name="High"
          />
          <Line
            type="monotone"
            dataKey="low"
            stroke="#ef4444"
            strokeWidth={1}
            strokeDasharray="2 2"
            dot={false}
            name="Low"
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const ChatMessage = ({ message }: { message: Message }) => {
    const isUser = message.type === "user";
    
    return (
      <div className={cn("flex w-full mb-4", isUser ? "justify-end" : "justify-start")}>
        <div className={cn(
          "max-w-[80%] rounded-lg px-4 py-3",
          isUser 
            ? "bg-blue-600 text-white ml-12"
            : isDark 
              ? "bg-slate-800 text-slate-100 mr-12 border border-slate-700"
              : "bg-white text-slate-900 mr-12 border border-slate-200"
        )}>
          <div className={cn(
            "text-sm leading-relaxed prose prose-sm max-w-none",
            isDark ? "prose-invert" : "prose-slate"
          )}>
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({node, ...props}) => <h1 className={cn("text-lg font-bold mb-2", isDark ? "text-white" : "text-slate-900")} {...props} />,
                h2: ({node, ...props}) => <h2 className={cn("text-base font-semibold mb-2", isDark ? "text-white" : "text-slate-900")} {...props} />,
                h3: ({node, ...props}) => <h3 className={cn("text-sm font-medium mb-1", isDark ? "text-white" : "text-slate-900")} {...props} />,
                p: ({node, ...props}) => <p className={cn("mb-2", isDark ? "text-slate-100" : "text-slate-700")} {...props} />,
                strong: ({node, ...props}) => <strong className={cn("font-semibold", isDark ? "text-white" : "text-slate-900")} {...props} />,
                em: ({node, ...props}) => <em className={cn("italic", isDark ? "text-slate-200" : "text-slate-600")} {...props} />,
                ul: ({node, ...props}) => <ul className={cn("list-disc list-inside mb-2", isDark ? "text-slate-100" : "text-slate-700")} {...props} />,
                ol: ({node, ...props}) => <ol className={cn("list-decimal list-inside mb-2", isDark ? "text-slate-100" : "text-slate-700")} {...props} />,
                li: ({node, ...props}) => <li className={cn("mb-1", isDark ? "text-slate-100" : "text-slate-700")} {...props} />,
                code: ({node, inline, ...props}) => 
                  inline ? 
                    <code className={cn("px-1 py-0.5 rounded text-xs", isDark ? "bg-slate-700 text-blue-300" : "bg-slate-200 text-blue-600")} {...props} /> :
                    <code className={cn("block p-2 rounded text-xs my-2", isDark ? "bg-slate-800 text-green-300" : "bg-slate-100 text-green-600")} {...props} />,
                blockquote: ({node, ...props}) => <blockquote className={cn("border-l-2 border-blue-500 pl-3 italic", isDark ? "text-slate-200" : "text-slate-600")} {...props} />,
                a: ({node, ...props}) => <a className={cn("underline", isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700")} {...props} />
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
          
          {message.data && (
            <div className="mt-4 space-y-4">
              {/* Stock Quote Card */}
              {message.data.quote && (
                <Card className={isDark ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      {message.data.quote.symbol} Live Quote
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className={cn("text-2xl font-bold", isDark ? "text-white" : "text-slate-900")}>
                          ${message.data.quote.price.toFixed(2)}
                        </div>
                        <div className={cn(
                          "flex items-center gap-1 text-sm",
                          message.data.quote.change >= 0 ? "text-green-400" : "text-red-400"
                        )}>
                          {message.data.quote.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                          {message.data.quote.change.toFixed(2)} ({message.data.quote.changePercent.toFixed(2)}%)
                        </div>
                      </div>
                      <div className={cn("space-y-1 text-sm", isDark ? "text-slate-300" : "text-slate-700")}>
                        <div>High: ${message.data.quote.high.toFixed(2)}</div>
                        <div>Low: ${message.data.quote.low.toFixed(2)}</div>
                        <div>Volume: {message.data.quote.volume.toLocaleString()}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Trading Insights */}
              {message.data.insights && (
                <Card className={isDark ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="h-5 w-5" />
{t.chatbot.recommendation}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant={
                            message.data.insights.recommendation === "BUY" ? "default" :
                            message.data.insights.recommendation === "SELL" ? "destructive" : "secondary"
                          }
                          className="text-lg px-3 py-1"
                        >
                          {message.data.insights.recommendation === "BUY" ? t.chatbot.buyRecommendation :
                           message.data.insights.recommendation === "SELL" ? t.chatbot.sellRecommendation :
                           t.chatbot.holdRecommendation}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <span className={cn("text-sm", isDark ? "text-slate-400" : "text-slate-600")}>{t.chatbot.confidence}:</span>
                          <Progress value={message.data.insights.confidence} className="w-20" />
                          <span className={cn("text-sm", isDark ? "text-slate-300" : "text-slate-700")}>{message.data.insights.confidence}%</span>
                        </div>
                      </div>
                      <div className={cn("text-sm", isDark ? "text-slate-300" : "text-slate-700")}>
                        <strong>{t.chatbot.priceTarget}:</strong> ${message.data.insights.priceTarget.toFixed(2)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Charts */}
              {message.data.charts && (message.data.charts.line || message.data.charts.candlestick) && (
                <Card className={isDark ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Price Charts
                      </CardTitle>
                      <Tabs value={selectedChart} onValueChange={(value) => setSelectedChart(value as "line" | "candlestick")}>
                        <TabsList className={isDark ? "bg-slate-800" : "bg-slate-100"}>
                          <TabsTrigger value="line">{t.chatbot.lineChart}</TabsTrigger>
                          <TabsTrigger value="candlestick">{t.chatbot.candlestick}</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {selectedChart === "line" && message.data.charts.line ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={message.data.charts.line}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="timestamp"
                            tickFormatter={(value) => new Date(value).toLocaleDateString()}
                          />
                          <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                          <Tooltip
                            labelFormatter={(value) => new Date(value).toLocaleString()}
                            formatter={(value: any) => [`$${value?.toFixed(2)}`, "Price"]}
                          />
                          <Line
                            type="monotone"
                            dataKey="price"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    ) : message.data.charts.candlestick ? (
                      <CustomCandlestickChart data={message.data.charts.candlestick} />
                    ) : null}
                  </CardContent>
                </Card>
              )}

              {/* News */}
              {message.data.news && message.data.news.length > 0 && (
                <Card className={isDark ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      📰 {t.chatbot.latestNews}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {message.data.news.slice(0, 3).map((news, index) => (
                        <div key={index} className="border-l-2 border-blue-500 pl-3">
                          <div className={cn("font-medium text-sm", isDark ? "text-white" : "text-slate-900")}>{news.headline}</div>
                          <div className={cn("text-xs mt-1", isDark ? "text-slate-400" : "text-slate-600")}>
                            {news.source} • {new Date(news.datetime).toLocaleDateString()}
                          </div>
                          <Badge 
                            variant={news.sentiment === "positive" ? "default" : news.sentiment === "negative" ? "destructive" : "secondary"}
                            className="mt-2 text-xs"
                          >
                            {news.sentiment}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
          
          <div className="text-xs opacity-50 mt-2" suppressHydrationWarning>
            {typeof window !== 'undefined' ? message.timestamp.toLocaleTimeString() : ''}
          </div>
        </div>
      </div>
    );
  };

  const chatContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-slate-700 bg-slate-800/50' : 'border-slate-200 bg-slate-100/50'}`}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-400" />
            <h2 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.chatbot.title}</h2>
          </div>
          <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse" />
            Live
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={refreshData}
            disabled={refreshing}
            className={`${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsMaximized(!isMaximized)}
            className={`${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
          >
            {isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-300'} rounded-lg px-4 py-3 mr-12 border`}>
                <div className="flex items-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-blue-400 border-t-transparent rounded-full" />
                  <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t.chatbot.processing}</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className={`p-4 border-t ${isDark ? 'border-slate-700 bg-slate-800/50' : 'border-slate-200 bg-slate-100/50'}`}>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.chatbot.placeholder}
              className={`${isDark ? 'bg-slate-900 border-slate-600 text-white placeholder:text-slate-400' : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-500'} pr-24`}
              disabled={isLoading}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {isSpeaking && (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={stopSpeaking}
                  className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                >
                  <Volume2 className="h-4 w-4" />
                </Button>
              )}
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={toggleListening}
                disabled={isLoading}
                className={cn(
                  "h-8 w-8 p-0",
                  isListening ? "text-red-400 hover:text-red-300" : 
                  isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                )}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <Button type="submit" disabled={isLoading || !input.trim()} className="bg-blue-600 hover:bg-blue-700">
            <Send className="h-4 w-4" />
          </Button>
        </form>
        
        <div className={`flex items-center gap-4 mt-2 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          <div className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Perplexity AI
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Finnhub Market Data
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Gemini Analysis
          </div>
        </div>
      </div>
    </div>
  );

  if (isMaximized) {
    return (
              <div className={`fixed inset-0 z-50 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
        <Card className={`h-full rounded-none border-0 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
          {chatContent}
        </Card>
      </div>
    );
  }

  const nodeRef = useRef(null);

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <Draggable handle=".drag-handle" bounds="parent" nodeRef={nodeRef}>
        <Card ref={nodeRef} className={`w-full max-w-4xl mx-auto h-[80vh] ${isDark ? 'bg-slate-900/95 border-slate-700' : 'bg-white/95 border-slate-200'} backdrop-blur-sm shadow-2xl`}>
          <div className={`drag-handle cursor-move p-2 border-b ${isDark ? 'border-slate-700 bg-slate-800/50' : 'border-slate-200 bg-slate-100/50'} flex items-center gap-2`}>
            <Move className={`h-4 w-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
            <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Drag to move</span>
          </div>
          {chatContent}
        </Card>
      </Draggable>
    </div>
  );
} 