"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, TrendingDown, Plus } from "lucide-react"

export function WatchList() {
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
    <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-400" />
          Watch List
        </CardTitle>
        <Button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 rounded-xl">
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {watchedCards.map((card, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-white">{card.name}</div>
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
                <div className="text-lg font-bold text-white">${card.price.toFixed(2)}</div>
                <Badge className="bg-white/10 backdrop-blur-sm border border-white/20 text-slate-300 text-xs">
                  {card.type}
                </Badge>
              </div>

              <div className="text-xs text-slate-400 mb-3">{card.alert}</div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-green-500/25">
                  Trade
                </Button>
                <Button className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 rounded-xl">
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
