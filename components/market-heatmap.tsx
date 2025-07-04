"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, BarChart3 } from "lucide-react"

export function MarketHeatmap() {
  const [heatmapData, setHeatmapData] = useState([
    { name: "Charizard", change: 5.2, size: "large", volume: "High" },
    { name: "Pikachu", change: -2.1, size: "medium", volume: "Medium" },
    { name: "Blastoise", change: 3.8, size: "large", volume: "High" },
    { name: "Venusaur", change: 1.5, size: "medium", volume: "Medium" },
    { name: "Mewtwo", change: 8.9, size: "small", volume: "Low" },
    { name: "Mew", change: -1.2, size: "small", volume: "Low" },
    { name: "Alakazam", change: 4.3, size: "medium", volume: "Medium" },
    { name: "Gengar", change: -3.7, size: "small", volume: "Low" },
    { name: "Dragonite", change: 6.1, size: "large", volume: "High" },
    { name: "Gyarados", change: 2.4, size: "medium", volume: "Medium" },
    { name: "Lapras", change: -0.8, size: "small", volume: "Low" },
    { name: "Snorlax", change: 1.9, size: "medium", volume: "Medium" },
    { name: "Articuno", change: 3.2, size: "small", volume: "Low" },
    { name: "Zapdos", change: -2.8, size: "small", volume: "Low" },
    { name: "Moltres", change: 4.7, size: "medium", volume: "Medium" },
  ])

  const getColor = (change: number) => {
    if (change > 6) return "from-green-500 to-emerald-600"
    if (change > 3) return "from-green-400 to-green-500"
    if (change > 0) return "from-green-300 to-green-400"
    if (change > -3) return "from-red-300 to-red-400"
    if (change > -6) return "from-red-400 to-red-500"
    return "from-red-500 to-red-600"
  }

  const getSize = (size: string) => {
    switch (size) {
      case "large":
        return "col-span-2 row-span-2"
      case "medium":
        return "col-span-2 row-span-1"
      default:
        return "col-span-1 row-span-1"
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setHeatmapData((prev) =>
        prev.map((card) => ({
          ...card,
          change: card.change + (Math.random() - 0.5) * 3,
        })),
      )
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-purple-400" />
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Market Heatmap
          </h2>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
            <span className="text-slate-300">Gains</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-r from-red-400 to-red-500 rounded-full"></div>
            <span className="text-slate-300">Losses</span>
          </div>
        </div>
      </div>

      <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl">
        <CardContent className="p-8">
          <div className="grid grid-cols-8 gap-4 h-[500px]">
            {heatmapData.map((card, index) => (
              <div
                key={index}
                className={`${getSize(card.size)} bg-gradient-to-br ${getColor(card.change)} rounded-2xl p-4 text-white flex flex-col justify-between hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl`}
              >
                <div>
                  <div className="font-bold text-sm mb-1">{card.name}</div>
                  <div className="text-xs opacity-75">{card.volume} Vol</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold flex items-center justify-end gap-1">
                    {card.change >= 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingUp className="h-3 w-3 rotate-180" />
                    )}
                    {card.change >= 0 ? "+" : ""}
                    {card.change.toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
