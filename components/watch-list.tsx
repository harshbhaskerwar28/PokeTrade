"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, TrendingDown, Plus } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"

export function WatchList() {
  const { isDark } = useTheme()

  const watchedCards = [
    {
      name: "Mewtwo",
      price: 1234.56,
      change: 45.67,
      percent: 3.84,
      type: "Psychic",
      alert: "Target: $1300",
    },
    {
      name: "Dragonite",
      price: 678.9,
      change: -23.45,
      percent: -3.34,
      type: "Dragon",
      alert: "Stop Loss: $650",
    },
    {
      name: "Alakazam",
      price: 456.78,
      change: 12.34,
      percent: 2.78,
      type: "Psychic",
      alert: "Buy below $450",
    },
    {
      name: "Gengar",
      price: 543.21,
      change: -8.9,
      percent: -1.61,
      type: "Ghost",
      alert: "Watch for reversal",
    },
  ]

  return (
    <Card className={`backdrop-blur-md border rounded-2xl shadow-2xl ${
      isDark 
        ? "bg-white/10 border-white/20"
        : "bg-black/10 border-black/20"
    }`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className={`text-xl font-semibold flex items-center gap-2 ${
          isDark ? "text-white" : "text-slate-900"
        }`}>
          <Star className="h-5 w-5 text-yellow-400" />
          Watch List
        </CardTitle>
        <Button className={`backdrop-blur-sm border rounded-xl ${
          isDark 
            ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
            : "bg-black/10 border-black/20 text-slate-900 hover:bg-black/20"
        }`}>
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {watchedCards.map((card, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl backdrop-blur-sm border hover:bg-white/10 transition-all duration-300 ${
                isDark 
                  ? "bg-white/5 border-white/10"
                  : "bg-black/5 border-black/10"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`font-semibold ${
                  isDark ? "text-white" : "text-slate-900"
                }`}>{card.name}</div>
                <div
                  className={`flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-lg backdrop-blur-sm border ${
                    card.change >= 0
                      ? "bg-green-500/20 text-green-300 border-green-400/30"
                      : "bg-red-500/20 text-red-300 border-red-400/30"
                  }`}
                >
                  {card.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {card.percent >= 0 ? "+" : ""}
                  {card.percent.toFixed(2)}%
                </div>
              </div>

              <div className="flex items-center justify-between mb-2">
                <div className={`text-lg font-bold ${
                  isDark ? "text-white" : "text-slate-900"
                }`}>${card.price.toFixed(2)}</div>
                <Badge className={`backdrop-blur-sm border text-xs ${
                  isDark 
                    ? "bg-white/10 border-white/20 text-slate-300"
                    : "bg-black/10 border-black/20 text-slate-700"
                }`}>
                  {card.type}
                </Badge>
              </div>

              <div className={`text-xs mb-3 ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}>{card.alert}</div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-green-500/25">
                  Trade
                </Button>
                <Button className={`flex-1 backdrop-blur-sm border rounded-xl ${
                  isDark 
                    ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                    : "bg-black/10 border-black/20 text-slate-900 hover:bg-black/20"
                }`}>
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
