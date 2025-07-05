"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Zap, DollarSign, Sparkles } from "lucide-react"
import Link from "next/link"

export function Hero() {
  const [marketData, setMarketData] = useState([
    {
      name: "Pikachu",
      price: 245.67,
      change: 5.23,
      percent: 2.17,
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    },
    {
      name: "Charizard",
      price: 892.34,
      change: -12.45,
      percent: -1.37,
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
    },
    {
      name: "Blastoise",
      price: 156.78,
      change: 8.91,
      percent: 6.02,
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png",
    },
    {
      name: "Venusaur",
      price: 203.45,
      change: 15.67,
      percent: 8.34,
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData((prev) =>
        prev.map((card) => ({
          ...card,
          price: Math.max(10, card.price + (Math.random() - 0.5) * 10),
          change: (Math.random() - 0.5) * 20,
          percent: (Math.random() - 0.5) * 5,
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 sm:top-20 left-4 sm:left-20 w-32 sm:w-48 lg:w-72 h-32 sm:h-48 lg:h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob dark:opacity-20"></div>
        <div className="absolute top-20 sm:top-40 right-4 sm:right-20 w-32 sm:w-48 lg:w-72 h-32 sm:h-48 lg:h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 dark:opacity-20"></div>
        <div className="absolute -bottom-4 sm:-bottom-8 left-10 sm:left-40 w-32 sm:w-48 lg:w-72 h-32 sm:h-48 lg:h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 dark:opacity-20"></div>
      </div>

      <div className="relative container mx-auto py-8 sm:py-12 lg:py-16 z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 sm:gap-3 text-yellow-400 dark:text-yellow-400 justify-center lg:justify-start">
                <div className="p-1.5 sm:p-2 rounded-full bg-yellow-400/20 backdrop-blur-sm dark:bg-yellow-400/20">
                  <Sparkles className="h-4 w-4 sm:h-6 sm:w-6" />
                </div>
                <span className="font-semibold text-sm sm:text-lg">Live Trading Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-slate-900 via-purple-600 to-blue-600 dark:from-white dark:via-purple-200 dark:to-yellow-300 bg-clip-text text-transparent">
                  PokéTrade
                </span>
                <br />
                <span className="bg-gradient-to-r from-yellow-600 via-pink-600 to-purple-600 dark:from-yellow-400 dark:via-pink-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Market
                </span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Experience the future of trading with Pokémon cards powered by real-time market data, AI analysis, and
                cutting-edge technology.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300"
                >
                  <Zap className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Start Trading
                </Button>
              </Link>
              <Link href="/market">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white/10 dark:bg-white/10 backdrop-blur-md border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white hover:bg-white/20 dark:hover:bg-white/20 px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-2xl transition-all duration-300"
                >
                  Explore Market
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-8">
              {[
                { label: "Daily Volume", value: "$2.4M", icon: DollarSign },
                { label: "Active Cards", value: "150+", icon: Sparkles },
                { label: "Live Trading", value: "24/7", icon: TrendingUp },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-2 sm:p-4 rounded-xl bg-white/20 dark:bg-white/5 backdrop-blur-sm border border-slate-300 dark:border-white/10"
                >
                  <div className="flex justify-center mb-1 sm:mb-2">
                    <stat.icon className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6 order-first lg:order-last">
            <div className="text-center mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 flex items-center justify-center gap-2">
                <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600 dark:text-yellow-400" />
                Live Market Ticker
              </h3>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {marketData.map((card, index) => (
                <Card
                  key={index}
                  className="p-3 sm:p-6 bg-white/30 dark:bg-white/10 backdrop-blur-md border border-slate-300 dark:border-white/20 rounded-2xl hover:bg-white/40 dark:hover:bg-white/15 transition-all duration-300 shadow-2xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-purple-400/20 to-pink-400/20 backdrop-blur-sm border border-slate-300 dark:border-white/20 flex items-center justify-center overflow-hidden">
                          <img
                            src={card.image || "/placeholder.svg"}
                            alt={card.name}
                            className="w-8 h-8 sm:w-12 sm:h-12 object-contain"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg?height=48&width=48"
                            }}
                          />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white text-sm sm:text-lg">{card.name}</div>
                        <div className="text-slate-600 dark:text-slate-300 font-semibold text-xs sm:text-base">
                          ${card.price.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 rounded-xl ${card.change >= 0 ? "bg-green-500/20 text-green-600 dark:text-green-300" : "bg-red-500/20 text-red-600 dark:text-red-300"}`}
                    >
                      {card.change >= 0 ? (
                        <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                      ) : (
                        <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4" />
                      )}
                      <span className="font-bold text-xs sm:text-sm">
                        {card.percent >= 0 ? "+" : ""}
                        {card.percent.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
