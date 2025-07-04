"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, TrendingUp, AlertTriangle, Target, Sparkles, Zap } from "lucide-react"

export function AIInsights() {
  const insights = [
    {
      type: "recommendation",
      title: "Strong Buy Signal",
      description:
        "Pikachu (TSLA) showing bullish momentum due to EV market expansion and strong quarterly earnings. Technical indicators suggest continued upward trend.",
      confidence: 85,
      action: "BUY",
      icon: TrendingUp,
      priority: "high",
    },
    {
      type: "warning",
      title: "Portfolio Risk Alert",
      description:
        "Your portfolio is overweight in Electric-type Pokémon (Tech sector). Consider diversification into Water or Grass types for better balance.",
      confidence: 92,
      action: "REBALANCE",
      icon: AlertTriangle,
      priority: "medium",
    },
    {
      type: "opportunity",
      title: "Market Opportunity",
      description:
        "Fire-type cards experiencing temporary dip due to oil volatility. Potential buying opportunity for long-term investors.",
      confidence: 78,
      action: "WATCH",
      icon: Target,
      priority: "low",
    },
  ]

  const getActionColor = (action: string) => {
    switch (action) {
      case "BUY":
        return "from-green-500/20 to-emerald-500/20 border-green-400/30 text-green-300"
      case "SELL":
        return "from-red-500/20 to-pink-500/20 border-red-400/30 text-red-300"
      case "REBALANCE":
        return "from-yellow-500/20 to-orange-500/20 border-yellow-400/30 text-yellow-300"
      case "WATCH":
        return "from-blue-500/20 to-cyan-500/20 border-blue-400/30 text-blue-300"
      default:
        return "from-gray-500/20 to-slate-500/20 border-gray-400/30 text-gray-300"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-300 border-red-400/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-400/30"
      case "low":
        return "bg-green-500/20 text-green-300 border-green-400/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-400/30"
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30">
            <Brain className="h-8 w-8 text-purple-400" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            AI Market Insights
          </h2>
        </div>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl shadow-lg hover:shadow-purple-500/25">
          <Sparkles className="mr-2 h-4 w-4" />
          View Full Report
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {insights.map((insight, index) => (
          <Card
            key={index}
            className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300 shadow-2xl rounded-2xl hover:scale-105"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-400/30">
                    <insight.icon className="h-5 w-5 text-blue-400" />
                  </div>
                  <CardTitle className="text-lg font-bold text-white">{insight.title}</CardTitle>
                </div>
                <Badge
                  className={`bg-gradient-to-r ${getActionColor(insight.action)} backdrop-blur-sm border rounded-lg px-3 py-1 font-semibold`}
                >
                  {insight.action}
                </Badge>
              </div>
              <Badge
                className={`${getPriorityColor(insight.priority)} backdrop-blur-sm border rounded-lg px-2 py-1 text-xs w-fit`}
              >
                {insight.priority.toUpperCase()} PRIORITY
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-300 leading-relaxed">{insight.description}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-400">AI Confidence</div>
                  <div className="text-sm font-bold text-white">{insight.confidence}%</div>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-2 backdrop-blur-sm">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${insight.confidence}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Zap className="h-6 w-6 text-yellow-400" />
                <h3 className="text-2xl font-bold text-white">Daily Market Briefing</h3>
              </div>
              <p className="text-slate-300 max-w-2xl">
                Get personalized AI analysis, market predictions, and trading recommendations delivered to your inbox
                every morning at 8 AM EST. Stay ahead of the market with cutting-edge insights.
              </p>
            </div>
            <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold px-8 py-4 rounded-xl shadow-2xl hover:shadow-yellow-500/25">
              <Brain className="mr-2 h-5 w-5" />
              Subscribe Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
