"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Package, Star } from "lucide-react"

export function PackHistory() {
  const packHistory = [
    {
      id: 1,
      packName: "Elite Trainer Pack",
      openedAt: "2 hours ago",
      cardsReceived: [
        { name: "Charizard", rarity: "Legendary", value: 892.34 },
        { name: "Pikachu", rarity: "Rare", value: 245.67 },
        { name: "Squirtle", rarity: "Common", value: 45.23 },
      ],
      totalValue: 1183.24,
      packCost: 149.99,
      profit: 1033.25,
    },
    {
      id: 2,
      packName: "Starter Pack",
      openedAt: "1 day ago",
      cardsReceived: [
        { name: "Blastoise", rarity: "Legendary", value: 567.89 },
        { name: "Wartortle", rarity: "Rare", value: 123.45 },
        { name: "Psyduck", rarity: "Common", value: 23.67 },
      ],
      totalValue: 715.01,
      packCost: 49.99,
      profit: 665.02,
    },
    {
      id: 3,
      packName: "Daily Booster",
      openedAt: "3 days ago",
      cardsReceived: [
        { name: "Alakazam", rarity: "Rare", value: 456.78 },
        { name: "Abra", rarity: "Common", value: 12.34 },
      ],
      totalValue: 469.12,
      packCost: 9.99,
      profit: 459.13,
    },
  ]

  const getRarityColor = (rarity: string) => {
    const colors = {
      Legendary: "bg-yellow-500/20 text-yellow-300 border-yellow-400/30",
      Rare: "bg-blue-500/20 text-blue-300 border-blue-400/30",
      Common: "bg-gray-500/20 text-gray-300 border-gray-400/30",
    }
    return colors[rarity as keyof typeof colors] || "bg-gray-500/20 text-gray-300 border-gray-400/30"
  }

  return (
    <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
          <Clock className="h-5 w-5 text-purple-400" />
          Pack Opening History
        </CardTitle>
        <Button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 rounded-xl">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {packHistory.map((pack) => (
            <div
              key={pack.id}
              className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30">
                    <Package className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{pack.packName}</h3>
                    <p className="text-sm text-slate-400">{pack.openedAt}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-white">${pack.totalValue.toLocaleString()}</div>
                  <div className="text-sm text-green-400 font-semibold">+${pack.profit.toFixed(2)} profit</div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <h4 className="text-sm font-medium text-slate-300">Cards Received:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {pack.cardsReceived.map((card, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
                    >
                      <div className="flex items-center gap-2">
                        <Star className="h-3 w-3 text-yellow-400" />
                        <span className="text-sm text-white font-medium">{card.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`${getRarityColor(card.rarity)} backdrop-blur-sm border text-xs`}>
                          {card.rarity}
                        </Badge>
                        <span className="text-xs text-slate-300">${card.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Pack Cost: ${pack.packCost}</span>
                <span className="text-green-400 font-semibold">
                  ROI: {((pack.profit / pack.packCost) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
