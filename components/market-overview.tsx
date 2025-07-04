"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Activity, Users, Target } from "lucide-react"

export function MarketOverview() {
  const [stats, setStats] = useState([
    {
      title: "Total Market Cap",
      value: "$12.4M",
      change: "+5.2%",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Active Traders",
      value: "2,847",
      change: "+12.3%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Daily Volume",
      value: "$847K",
      change: "-2.1%",
      trend: "down",
      icon: Activity,
    },
    {
      title: "Top Gainer",
      value: "Mewtwo",
      change: "+24.7%",
      trend: "up",
      icon: Target,
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) =>
        prev.map((stat) => ({
          ...stat,
          change: `${Math.random() > 0.5 ? "+" : ""}${(Math.random() * 10 - 5).toFixed(1)}%`,
          trend: Math.random() > 0.5 ? "up" : "down",
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative z-10 -mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300 shadow-2xl rounded-2xl"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">{stat.title}</CardTitle>
                <div className={`p-2 rounded-xl ${stat.trend === "up" ? "bg-green-500/20" : "bg-red-500/20"}`}>
                  <stat.icon className={`h-4 w-4 ${stat.trend === "up" ? "text-green-400" : "text-red-400"}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <p className={`text-sm font-semibold ${stat.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                  {stat.change} from yesterday
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
