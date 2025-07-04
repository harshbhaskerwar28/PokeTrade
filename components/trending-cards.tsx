"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Star, ShoppingCart, Sparkles } from "lucide-react"

export function TrendingCards() {
  const [cards, setCards] = useState([
    {
      id: 1,
      name: "Charizard",
      type: "Fire",
      price: 892.34,
      change: 24.67,
      percent: 2.84,
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
      rarity: "Legendary",
      ticker: "XOM",
    },
    {
      id: 2,
      name: "Pikachu",
      type: "Electric",
      price: 245.67,
      change: -5.23,
      percent: -2.08,
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
      rarity: "Rare",
      ticker: "TSLA",
    },
    {
      id: 3,
      name: "Blastoise",
      type: "Water",
      price: 567.89,
      change: 15.43,
      percent: 2.79,
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png",
      rarity: "Legendary",
      ticker: "AWK",
    },
    {
      id: 4,
      name: "Venusaur",
      type: "Grass",
      price: 423.12,
      change: 8.91,
      percent: 2.15,
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
      rarity: "Legendary",
      ticker: "DE",
    },
    {
      id: 5,
      name: "Mewtwo",
      type: "Psychic",
      price: 1234.56,
      change: 45.67,
      percent: 3.84,
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png",
      rarity: "Mythical",
      ticker: "GOOGL",
    },
    {
      id: 6,
      name: "Dragonite",
      type: "Dragon",
      price: 678.9,
      change: -23.45,
      percent: -3.34,
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png",
      rarity: "Legendary",
      ticker: "NVDA",
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prev) =>
        prev.map((card) => ({
          ...card,
          price: Math.max(10, card.price + (Math.random() - 0.5) * 20),
          change: (Math.random() - 0.5) * 40,
          percent: (Math.random() - 0.5) * 8,
        })),
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const getTypeColor = (type: string) => {
    const colors = {
      Fire: "from-red-500/20 to-orange-500/20 border-red-500/30 text-red-300",
      Electric: "from-yellow-500/20 to-yellow-400/20 border-yellow-500/30 text-yellow-300",
      Water: "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-300",
      Grass: "from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-300",
      Psychic: "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-300",
      Dragon: "from-indigo-500/20 to-purple-500/20 border-indigo-500/30 text-indigo-300",
    }
    return colors[type as keyof typeof colors] || "from-gray-500/20 to-gray-400/20 border-gray-500/30 text-gray-300"
  }

  const getRarityColor = (rarity: string) => {
    const colors = {
      Mythical: "from-purple-600/30 to-pink-600/30 border-purple-400/50 text-purple-200",
      Legendary: "from-yellow-600/30 to-orange-600/30 border-yellow-400/50 text-yellow-200",
      Rare: "from-blue-600/30 to-cyan-600/30 border-blue-400/50 text-blue-200",
      Common: "from-gray-600/30 to-slate-600/30 border-gray-400/50 text-gray-200",
    }
    return colors[rarity as keyof typeof colors] || "from-gray-600/30 to-slate-600/30 border-gray-400/50 text-gray-200"
  }

  return (
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Trending Cards
          </h2>
        </div>
        <Button className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 rounded-xl">
          View All Cards
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {cards.map((card) => (
          <Card
            key={card.id}
            className="group bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-500 rounded-2xl overflow-hidden shadow-2xl hover:shadow-purple-500/25 hover:scale-105"
          >
            <div className="relative">
              <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                <img
                  src={card.image || "/placeholder.svg"}
                  alt={card.name}
                  className="w-full h-full object-contain p-2 sm:p-4 group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=200&width=150"
                  }}
                />
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                  <Button
                    size="sm"
                    className="h-6 w-6 sm:h-8 sm:w-8 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 rounded-xl"
                  >
                    <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
                  </Button>
                </div>
                <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 flex flex-wrap gap-1 sm:gap-2">
                  <Badge
                    className={`bg-gradient-to-r ${getTypeColor(card.type)} backdrop-blur-sm border rounded-lg px-2 py-1 text-xs`}
                  >
                    {card.type}
                  </Badge>
                  <Badge
                    className={`bg-gradient-to-r ${getRarityColor(card.rarity)} backdrop-blur-sm border rounded-lg px-2 py-1 text-xs`}
                  >
                    {card.rarity}
                  </Badge>
                </div>
              </div>
            </div>

            <CardHeader className="pb-2 p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg sm:text-xl font-bold text-white">{card.name}</CardTitle>
                <div
                  className={`flex items-center gap-1 text-xs sm:text-sm font-bold px-2 py-1 rounded-lg ${
                    card.change >= 0 ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
                  }`}
                >
                  {card.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {card.percent >= 0 ? "+" : ""}
                  {card.percent.toFixed(2)}%
                </div>
              </div>
              <div className="text-xs sm:text-sm text-slate-400">Ticker: {card.ticker}</div>
            </CardHeader>

            <CardContent className="pt-0 p-3 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">${card.price.toFixed(2)}</span>
                  <span
                    className={`text-xs sm:text-sm font-semibold ${card.change >= 0 ? "text-green-400" : "text-red-400"}`}
                  >
                    {card.change >= 0 ? "+" : ""}${card.change.toFixed(2)}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-green-500/25 text-sm">
                    <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    Buy
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl shadow-lg hover:shadow-red-500/25 text-sm">
                    Sell
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
