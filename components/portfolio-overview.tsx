"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, DollarSign, Package, Activity, Target, Sparkles } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"

export function PortfolioOverview() {
  const { isDark } = useTheme()
  
  const [portfolioData, setPortfolioData] = useState({
    totalValue: 15847.32,
    dailyChange: 234.56,
    dailyPercent: 1.5,
    totalCards: 47,
    activePositions: 12,
    todayTrades: 8,
  })

  const stats = [
    {
      title: "Portfolio Value",
      value: `$${portfolioData.totalValue.toLocaleString()}`,
      change: `${portfolioData.dailyChange >= 0 ? "+" : ""}$${portfolioData.dailyChange.toFixed(2)}`,
      percent: `${portfolioData.dailyPercent >= 0 ? "+" : ""}${portfolioData.dailyPercent.toFixed(2)}%`,
      trend: portfolioData.dailyChange >= 0 ? "up" : "down",
      icon: DollarSign,
    },
    {
      title: "Total Cards",
      value: portfolioData.totalCards.toString(),
      change: "+3 this week",
      trend: "up",
      icon: Package,
    },
    {
      title: "Active Positions",
      value: portfolioData.activePositions.toString(),
      change: "2 new today",
      trend: "up",
      icon: Target,
    },
    {
      title: "Today's Trades",
      value: portfolioData.todayTrades.toString(),
      change: "5 buy, 3 sell",
      trend: "neutral",
      icon: Activity,
    },
  ]

  return (
    <div className="space-y-6 px-4 sm:px-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />
          <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${
            isDark 
              ? "bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent"
              : "bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent"
          }`}>
            Portfolio Dashboard
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button className={`backdrop-blur-md border rounded-xl ${
            isDark 
              ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
              : "bg-black/10 border-black/20 text-slate-900 hover:bg-black/20"
          }`}>
            Export Report
          </Button>
          <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold rounded-xl shadow-lg hover:shadow-yellow-500/25">
            Add Funds
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className={`backdrop-blur-md border transition-all duration-300 shadow-2xl rounded-2xl hover:scale-105 ${
              isDark 
                ? "bg-white/10 border-white/20 hover:bg-white/15"
                : "bg-black/10 border-black/20 hover:bg-black/15"
            }`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-sm font-medium ${
                isDark ? "text-slate-300" : "text-slate-700"
              }`}>{stat.title}</CardTitle>
              <div
                className={`p-2 rounded-xl ${stat.trend === "up" ? "bg-green-500/20 border border-green-400/30" : stat.trend === "down" ? "bg-red-500/20 border border-red-400/30" : "bg-blue-500/20 border border-blue-400/30"} backdrop-blur-sm`}
              >
                <stat.icon
                  className={`h-4 w-4 ${stat.trend === "up" ? "text-green-400" : stat.trend === "down" ? "text-red-400" : "text-blue-400"}`}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-xl sm:text-2xl font-bold ${
                isDark ? "text-white" : "text-slate-900"
              }`}>{stat.value}</div>
              {stat.percent && (
                <div
                  className={`flex items-center gap-1 text-sm font-semibold ${
                    stat.trend === "up" ? "text-green-400" : stat.trend === "down" ? "text-red-400" : isDark ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  {stat.trend === "up" && <TrendingUp className="h-3 w-3" />}
                  {stat.trend === "down" && <TrendingDown className="h-3 w-3" />}
                  <span>{stat.change}</span>
                  {stat.percent && <span className="font-medium">({stat.percent})</span>}
                </div>
              )}
              {!stat.percent && <p className={`text-xs ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}>{stat.change}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
