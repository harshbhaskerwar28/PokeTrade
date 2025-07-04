"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, X, Bot, User, Minimize2, Maximize2, ExternalLink, BarChart3 } from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  suggestions?: string[]
  chart?: ChartData
  news?: NewsItem[]
}

interface ChartData {
  type: "line" | "candlestick"
  data: Array<{ date: string; price: number; high?: number; low?: number; open?: number; close?: number }>
  title: string
  symbol: string
}

interface NewsItem {
  title: string
  url: string
  source: string
  publishedAt: string
  summary: string
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "🚀 Welcome to PokéTrade AI! I can analyze real-time market data, show interactive charts, and provide trading insights. What would you like to know?",
      timestamp: new Date(),
      suggestions: ["Tesla News", "TSLA Chart", "Market Analysis", "Portfolio Tips"],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateChart = (symbol: string, type: "line" | "candlestick" = "line"): ChartData => {
    const data = []
    let basePrice = symbol === "TSLA" ? 250 : 180

    for (let i = 0; i < 15; i++) {
      const date = new Date()
      date.setDate(date.getDate() - (14 - i))

      const change = (Math.random() - 0.5) * 15
      basePrice = Math.max(150, basePrice + change)

      if (type === "candlestick") {
        const open = basePrice + (Math.random() - 0.5) * 8
        const close = open + (Math.random() - 0.5) * 12
        const high = Math.max(open, close) + Math.random() * 6
        const low = Math.min(open, close) - Math.random() * 6

        data.push({
          date: `${date.getMonth() + 1}/${date.getDate()}`,
          price: close,
          open,
          high,
          low,
          close,
        })
      } else {
        data.push({
          date: `${date.getMonth() + 1}/${date.getDate()}`,
          price: basePrice,
        })
      }
    }

    return {
      type,
      data,
      title: `${symbol} ${type === "candlestick" ? "Candlestick" : "Line"} Chart`,
      symbol,
    }
  }

  const generateTeslaNews = (): NewsItem[] => [
    {
      title: "Tesla Reports Record Q4 Deliveries, Stock Jumps 8%",
      url: "#",
      source: "Reuters",
      publishedAt: new Date().toISOString(),
      summary: "Tesla delivered 484,507 vehicles in Q4, beating analyst estimates of 473,000 units.",
    },
    {
      title: "Musk Announces New Gigafactory in Mexico",
      url: "#",
      source: "Bloomberg",
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      summary: "Tesla plans $5B investment in new manufacturing facility, expected to boost production capacity.",
    },
    {
      title: "Tesla FSD Beta Shows 40% Improvement in Safety Metrics",
      url: "#",
      source: "TechCrunch",
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      summary: "Latest Full Self-Driving update demonstrates significant progress in autonomous driving capabilities.",
    },
  ]

  const analyzeUserQuery = (query: string) => {
    const lower = query.toLowerCase()

    if (
      lower.includes("tesla") &&
      (lower.includes("news") || lower.includes("latest") || lower.includes("affect") || lower.includes("stock"))
    ) {
      return "tesla_news"
    }

    if (lower.includes("chart") || lower.includes("graph") || lower.includes("price")) {
      if (lower.includes("candlestick") || lower.includes("candle")) {
        return "candlestick_chart"
      }
      return "line_chart"
    }

    if (lower.includes("portfolio") || lower.includes("analyze") || lower.includes("review")) {
      return "portfolio"
    }

    if (lower.includes("market") || lower.includes("analysis") || lower.includes("trend")) {
      return "market_analysis"
    }

    return "general"
  }

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    setTimeout(() => {
      const queryType = analyzeUserQuery(message)
      let botResponse: Message

      switch (queryType) {
        case "tesla_news":
          const news = generateTeslaNews()
          botResponse = {
            id: Date.now().toString(),
            type: "bot",
            content:
              "📰 Latest Tesla News Analysis:\n\nHere are the key developments affecting TSLA stock today. These news items show strong positive momentum with record deliveries and expansion plans driving investor confidence.",
            timestamp: new Date(),
            news,
            suggestions: ["Show TSLA Chart", "Market Impact", "Price Target", "Risk Analysis"],
          }
          break

        case "candlestick_chart":
          const candleChart = generateChart("TSLA", "candlestick")
          const currentPrice = candleChart.data[candleChart.data.length - 1]
          botResponse = {
            id: Date.now().toString(),
            type: "bot",
            content: `📊 Tesla Candlestick Analysis:\n\n• Current: $${currentPrice.price.toFixed(2)}\n• Pattern: Bullish consolidation\n• Volume: Above average\n• Next resistance: $${(currentPrice.price * 1.05).toFixed(2)}\n• Support level: $${(currentPrice.price * 0.95).toFixed(2)}`,
            timestamp: new Date(),
            chart: candleChart,
            suggestions: ["Line Chart", "News Impact", "Technical Analysis", "Set Alert"],
          }
          break

        case "line_chart":
          const lineChart = generateChart("TSLA", "line")
          const latest = lineChart.data[lineChart.data.length - 1]
          const previous = lineChart.data[lineChart.data.length - 2]
          const change = latest.price - previous.price
          botResponse = {
            id: Date.now().toString(),
            type: "bot",
            content: `📈 Tesla Price Trend:\n\n• Current: $${latest.price.toFixed(2)}\n• Change: ${change >= 0 ? "+" : ""}$${change.toFixed(2)}\n• Trend: ${change >= 0 ? "Bullish 📈" : "Bearish 📉"}\n• 15-day momentum: Strong`,
            timestamp: new Date(),
            chart: lineChart,
            suggestions: ["Candlestick View", "Latest News", "Buy/Sell Signal", "Compare Market"],
          }
          break

        case "portfolio":
          botResponse = {
            id: Date.now().toString(),
            type: "bot",
            content:
              "📊 Portfolio Health Check:\n\n💰 Total Value: $15,847 (+1.5%)\n🎯 Best Performer: Pikachu (TSLA) +5.2%\n⚠️ Needs Attention: Charizard (XOM) -2.1%\n\n🔍 Key Insights:\n• Electric-type cards: 35% (overweight)\n• Diversification score: 7/10\n• Risk level: Moderate\n• Recommended action: Rebalance",
            timestamp: new Date(),
            suggestions: ["Rebalance Tips", "Risk Management", "Top Picks", "Sector Analysis"],
          }
          break

        case "market_analysis":
          botResponse = {
            id: Date.now().toString(),
            type: "bot",
            content:
              "📊 Market Overview:\n\n🔥 Sector Performance:\n• Electric (Tech): +3.2% - Strong momentum\n• Fire (Energy): -1.8% - Consolidating\n• Water (Utilities): +0.5% - Stable\n• Psychic (AI/Tech): +4.1% - Leading gains\n\n📈 Key Drivers:\n• Fed policy optimism\n• Strong earnings season\n• Institutional buying",
            timestamp: new Date(),
            suggestions: ["Sector Deep Dive", "Top Movers", "Risk Factors", "Trading Opportunities"],
          }
          break

        default:
          botResponse = {
            id: Date.now().toString(),
            type: "bot",
            content:
              "🤖 I can help you with:\n\n📈 Real-time charts & analysis\n📰 Latest market news\n📊 Portfolio optimization\n🎯 Trading recommendations\n\nTry: 'Tesla news', 'Show TSLA chart', or 'Analyze my portfolio'",
            timestamp: new Date(),
            suggestions: ["Tesla News", "TSLA Chart", "Portfolio Review", "Market Trends"],
          }
      }

      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1200)
  }

  const renderChart = (chart: ChartData) => {
    const latestPrice = chart.data[chart.data.length - 1]
    const previousPrice = chart.data[chart.data.length - 2]
    const change = latestPrice.price - previousPrice.price
    const changePercent = (change / previousPrice.price) * 100

    return (
      <div className="mt-3 p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-white font-medium text-sm flex items-center gap-1">
            <BarChart3 className="h-3 w-3" />
            {chart.title}
          </h4>
          <div className={`text-xs font-medium ${change >= 0 ? "text-green-400" : "text-red-400"}`}>
            {changePercent >= 0 ? "+" : ""}
            {changePercent.toFixed(1)}%
          </div>
        </div>

        <div className="h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded p-2 border border-white/5">
          <div className="h-full flex items-end justify-between gap-px">
            {chart.data.map((point, index) => {
              const maxPrice = Math.max(...chart.data.map((d) => d.price))
              const height = (point.price / maxPrice) * 100

              if (chart.type === "candlestick" && point.open && point.close) {
                const isGreen = point.close >= point.open
                return (
                  <div key={index} className="flex flex-col items-center justify-end h-full flex-1">
                    <div
                      className={`w-full max-w-[8px] ${isGreen ? "bg-green-400" : "bg-red-400"} rounded-sm opacity-80`}
                      style={{ height: `${Math.max(2, (Math.abs(point.close - point.open) / maxPrice) * 100)}%` }}
                    />
                  </div>
                )
              } else {
                return (
                  <div key={index} className="flex flex-col items-center justify-end h-full flex-1">
                    <div
                      className="w-full max-w-[4px] bg-gradient-to-t from-blue-400 to-purple-400 rounded-t opacity-80"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                )
              }
            })}
          </div>
        </div>

        <div className="mt-2 flex justify-between text-xs">
          <span className="text-slate-400">
            Current: <span className="text-white">${latestPrice.price.toFixed(2)}</span>
          </span>
          <span className={`${change >= 0 ? "text-green-400" : "text-red-400"}`}>
            {change >= 0 ? "+" : ""}${change.toFixed(2)}
          </span>
        </div>
      </div>
    )
  }

  const renderNews = (news: NewsItem[]) => (
    <div className="mt-3 space-y-2">
      <h4 className="text-white font-medium text-sm">📰 Latest News</h4>
      {news.map((item, index) => (
        <div
          key={index}
          className="p-2 bg-white/5 backdrop-blur-sm rounded border border-white/10 hover:bg-white/10 transition-all"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h5 className="text-white text-xs font-medium leading-tight mb-1 truncate">{item.title}</h5>
              <p className="text-slate-300 text-xs leading-relaxed line-clamp-2">{item.summary}</p>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                <span>{item.source}</span>
                <span>•</span>
                <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
              </div>
            </div>
            <ExternalLink className="h-3 w-3 text-slate-400 hover:text-white flex-shrink-0" />
          </div>
        </div>
      ))}
    </div>
  )

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-2xl hover:shadow-purple-500/25 z-50 transition-all duration-300 hover:scale-110"
      >
        <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
      </Button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <Card
        className={`bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl transition-all duration-300 ${
          isMinimized ? "w-72 sm:w-80 h-16" : "w-72 sm:w-80 lg:w-96 h-[400px] sm:h-[500px]"
        }`}
      >
        <CardHeader
          className={`flex flex-row items-center justify-between p-3 ${!isMinimized ? "border-b border-white/20" : ""}`}
        >
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30">
              <Bot className="h-4 w-4 text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-white text-sm">PokéTrade AI</CardTitle>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-300">Live</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-6 w-6 p-0 text-slate-400 hover:text-white hover:bg-white/10"
            >
              {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 p-0 text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            <CardContent className="flex-1 overflow-hidden p-0">
              <div className="h-[280px] sm:h-[360px] overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] ${message.type === "user" ? "order-2" : "order-1"}`}>
                      <div
                        className={`flex items-start gap-2 ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}
                      >
                        <div
                          className={`p-1.5 rounded-lg ${message.type === "user" ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30" : "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30"} backdrop-blur-sm flex-shrink-0`}
                        >
                          {message.type === "user" ? (
                            <User className="h-3 w-3 text-blue-400" />
                          ) : (
                            <Bot className="h-3 w-3 text-purple-400" />
                          )}
                        </div>
                        <div
                          className={`p-2.5 rounded-lg ${message.type === "user" ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 text-blue-100" : "bg-white/10 border border-white/20 text-white"} backdrop-blur-sm min-w-0`}
                        >
                          <p className="text-xs leading-relaxed whitespace-pre-line break-words">{message.content}</p>
                          <div className="text-xs opacity-60 mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </div>
                          {message.chart && renderChart(message.chart)}
                          {message.news && renderNews(message.news)}
                        </div>
                      </div>

                      {message.suggestions && message.suggestions.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {message.suggestions.map((suggestion, index) => (
                            <Badge
                              key={index}
                              onClick={() => handleSendMessage(suggestion)}
                              className="cursor-pointer bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white border border-white/20 rounded-full px-3 py-1 text-xs transition-all duration-200 hover:scale-105"
                            >
                              {suggestion}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 backdrop-blur-sm">
                        <Bot className="h-3 w-3 text-purple-400" />
                      </div>
                      <div className="bg-white/10 border border-white/20 backdrop-blur-sm p-2 rounded-lg">
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            <div className="p-4 border-t border-white/20">
              <div className="flex items-center gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                  placeholder="Ask about Tesla, charts, or market news..."
                  className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-slate-400 rounded-lg backdrop-blur-sm focus:bg-white/15 text-sm h-8"
                />
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 h-8 w-8 p-0"
                >
                  <Send className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
