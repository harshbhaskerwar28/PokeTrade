"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ExternalLink } from "lucide-react"

export function MarketNews() {
  const news = [
    {
      title: "Electric-Type Pokémon Surge on Tesla Earnings Beat",
      summary: "Pikachu and other Electric-type cards rally following strong Tesla quarterly results.",
      time: "2 hours ago",
      category: "Market",
      impact: "high",
    },
    {
      title: "Fire-Type Cards Dip on Oil Price Volatility",
      summary: "Charizard and Fire-type Pokémon see temporary decline amid energy sector uncertainty.",
      time: "4 hours ago",
      category: "Sector",
      impact: "medium",
    },
    {
      title: "New AI Analysis Tool Launches for Pokémon Traders",
      summary: "Advanced machine learning algorithms now provide real-time trading recommendations.",
      time: "6 hours ago",
      category: "Technology",
      impact: "low",
    },
    {
      title: "Water-Type Cards Gain on Utility Sector Strength",
      summary: "Blastoise leads gains as water utility stocks outperform broader market.",
      time: "8 hours ago",
      category: "Market",
      impact: "medium",
    },
  ]

  const getImpactColor = (impact: string) => {
    switch (impact) {
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
    <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white">Market News</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {news.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-white group-hover:text-yellow-400 transition-colors">{item.title}</h3>
                <ExternalLink className="h-4 w-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <p className="text-sm text-slate-300 mb-3 leading-relaxed">{item.summary}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="bg-white/10 backdrop-blur-sm border border-white/20 text-slate-300 text-xs">
                    {item.category}
                  </Badge>
                  <Badge className={`backdrop-blur-sm border text-xs ${getImpactColor(item.impact)}`}>
                    {item.impact} impact
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <Clock className="h-3 w-3" />
                  {item.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
