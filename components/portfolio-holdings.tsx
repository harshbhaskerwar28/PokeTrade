"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, MoreHorizontal, Star } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"

export function PortfolioHoldings() {
  const { isDark } = useTheme()

  const [holdings] = useState([
    {
      id: 1,
      name: "Pikachu",
      type: "Electric",
      quantity: 5,
      avgPrice: 240.5,
      currentPrice: 245.67,
      totalValue: 1228.35,
      change: 25.85,
      percent: 2.15,
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    },
    {
      id: 2,
      name: "Charizard",
      type: "Fire",
      quantity: 2,
      avgPrice: 880.0,
      currentPrice: 892.34,
      totalValue: 1784.68,
      change: 24.68,
      percent: 1.4,
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
    },
    {
      id: 3,
      name: "Blastoise",
      type: "Water",
      quantity: 3,
      avgPrice: 550.0,
      currentPrice: 567.89,
      totalValue: 1703.67,
      change: 53.67,
      percent: 3.25,
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png",
    },
    {
      id: 4,
      name: "Venusaur",
      type: "Grass",
      quantity: 4,
      avgPrice: 410.0,
      currentPrice: 423.12,
      totalValue: 1692.48,
      change: 52.48,
      percent: 3.2,
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
    },
    {
      id: 5,
      name: "Mewtwo",
      type: "Psychic",
      quantity: 1,
      avgPrice: 1200.0,
      currentPrice: 1234.56,
      totalValue: 1234.56,
      change: 34.56,
      percent: 2.88,
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png",
    },
  ])

  const getTypeColor = (type: string) => {
    const colors = {
      Fire: "from-red-500/20 to-orange-500/20 border-red-500/30 text-red-300",
      Electric: "from-yellow-500/20 to-yellow-400/20 border-yellow-500/30 text-yellow-300",
      Water: "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-300",
      Grass: "from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-300",
      Psychic: "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-300",
    }
    return colors[type as keyof typeof colors] || "from-gray-500/20 to-gray-400/20 border-gray-500/30 text-gray-300"
  }

  return (
    <Card className={`backdrop-blur-md border rounded-2xl shadow-2xl ${
      isDark 
        ? "bg-white/10 border-white/20"
        : "bg-black/10 border-black/20"
    }`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className={`text-xl font-semibold ${
          isDark ? "text-white" : "text-slate-900"
        }`}>Portfolio Holdings</CardTitle>
        <Button className={`backdrop-blur-sm border rounded-xl ${
          isDark 
            ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
            : "bg-black/10 border-black/20 text-slate-900 hover:bg-black/20"
        }`}>
          Manage Holdings
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {holdings.map((holding) => (
            <div
              key={holding.id}
              className={`p-4 rounded-xl backdrop-blur-sm border hover:bg-white/10 transition-all duration-300 ${
                isDark 
                  ? "bg-white/5 border-white/10"
                  : "bg-black/5 border-black/10"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400/20 to-pink-400/20 backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden">
                      <img
                        src={holding.image || "/placeholder.svg"}
                        alt={holding.name}
                        className="w-12 h-12 object-contain"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg?height=48&width=48"
                        }}
                      />
                    </div>
                    <Button className="absolute -top-1 -right-1 h-6 w-6 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 rounded-full">
                      <Star className="h-3 w-3 text-yellow-400" />
                    </Button>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-bold text-lg ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}>{holding.name}</h3>
                      <Badge
                        className={`bg-gradient-to-r ${getTypeColor(holding.type)} backdrop-blur-sm border rounded-lg px-2 py-1 text-xs`}
                      >
                        {holding.type}
                      </Badge>
                    </div>
                    <div className={`text-sm ${
                      isDark ? "text-slate-300" : "text-slate-600"
                    }`}>
                      {holding.quantity} cards • Avg: ${holding.avgPrice.toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`text-2xl font-bold ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}>${holding.totalValue.toLocaleString()}</div>
                  <div className={`text-lg ${
                    isDark ? "text-slate-300" : "text-slate-600"
                  }`}>${holding.currentPrice.toFixed(2)}</div>
                  <div
                    className={`flex items-center gap-1 text-sm font-semibold justify-end ${
                      holding.change >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {holding.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {holding.change >= 0 ? "+" : ""}${holding.change.toFixed(2)} ({holding.percent >= 0 ? "+" : ""}
                    {holding.percent.toFixed(2)}%)
                  </div>
                </div>

                <Button className={`backdrop-blur-sm border rounded-xl h-8 w-8 p-0 ${
                  isDark 
                    ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                    : "bg-black/10 border-black/20 text-slate-900 hover:bg-black/20"
                }`}>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
