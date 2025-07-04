"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Sparkles, Star, Zap } from "lucide-react"

export function CardPacks() {
  const [packs] = useState([
    {
      id: 1,
      name: "Starter Pack",
      description: "Perfect for beginners with 5 guaranteed rare cards",
      price: 49.99,
      originalPrice: 59.99,
      cards: 10,
      rareGuaranteed: 5,
      rarity: "Common",
      image: "/placeholder.svg?height=200&width=150",
      popular: false,
    },
    {
      id: 2,
      name: "Elite Trainer Pack",
      description: "Advanced pack with legendary card guarantee",
      price: 149.99,
      originalPrice: 179.99,
      cards: 25,
      rareGuaranteed: 15,
      rarity: "Legendary",
      image: "/placeholder.svg?height=200&width=150",
      popular: true,
    },
    {
      id: 3,
      name: "Master Collection",
      description: "Ultimate pack with mythical Pokémon included",
      price: 299.99,
      originalPrice: 349.99,
      cards: 50,
      rareGuaranteed: 30,
      rarity: "Mythical",
      image: "/placeholder.svg?height=200&width=150",
      popular: false,
    },
    {
      id: 4,
      name: "Daily Booster",
      description: "Quick pack for daily trading opportunities",
      price: 9.99,
      originalPrice: 12.99,
      cards: 3,
      rareGuaranteed: 1,
      rarity: "Rare",
      image: "/placeholder.svg?height=200&width=150",
      popular: false,
    },
  ])

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
          <Package className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Card Packs
          </h1>
        </div>
        <Button className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold rounded-xl shadow-lg hover:shadow-yellow-500/25">
          <Sparkles className="mr-2 h-4 w-4" />
          Pack History
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {packs.map((pack) => (
          <Card
            key={pack.id}
            className={`group bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-500 rounded-2xl overflow-hidden shadow-2xl hover:scale-105 ${
              pack.popular ? "ring-2 ring-yellow-400/50" : ""
            }`}
          >
            {pack.popular && (
              <div className="absolute top-3 left-3 z-10">
                <Badge className="bg-gradient-to-r from-yellow-500/30 to-orange-500/30 border border-yellow-400/50 text-yellow-200 backdrop-blur-sm">
                  <Star className="h-3 w-3 mr-1" />
                  Popular
                </Badge>
              </div>
            )}

            <div className="relative">
              <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                <img
                  src={pack.image || "/placeholder.svg"}
                  alt={pack.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3">
                  <Badge
                    className={`bg-gradient-to-r ${getRarityColor(pack.rarity)} backdrop-blur-sm border rounded-lg px-3 py-1`}
                  >
                    {pack.rarity}
                  </Badge>
                </div>
              </div>
            </div>

            <CardHeader className="pb-2 p-3 sm:p-6">
              <CardTitle className="text-lg sm:text-xl font-bold text-white">{pack.name}</CardTitle>
              <p className="text-sm text-slate-300 leading-relaxed">{pack.description}</p>
            </CardHeader>

            <CardContent className="pt-0 p-3 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-2 gap-2 sm:gap-4 text-sm">
                  <div className="text-center p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                    <div className="text-white font-bold">{pack.cards}</div>
                    <div className="text-slate-400 text-xs">Total Cards</div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                    <div className="text-white font-bold">{pack.rareGuaranteed}</div>
                    <div className="text-slate-400 text-xs">Guaranteed</div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-2xl sm:text-3xl font-bold text-white">${pack.price}</span>
                    {pack.originalPrice > pack.price && (
                      <span className="text-lg text-slate-400 line-through">${pack.originalPrice}</span>
                    )}
                  </div>
                  {pack.originalPrice > pack.price && (
                    <div className="text-sm text-green-400 font-semibold">
                      Save ${(pack.originalPrice - pack.price).toFixed(2)}
                    </div>
                  )}
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl shadow-lg hover:shadow-purple-500/25">
                  <Zap className="h-4 w-4 mr-2" />
                  Open Pack
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
