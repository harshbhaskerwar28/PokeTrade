"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, Clock } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"

export function RecentTrades() {
  const { isDark } = useTheme()

  const trades = [
    {
      id: 1,
      card: "Charizard",
      type: "buy",
      quantity: 2,
      price: 892.34,
      total: 1784.68,
      time: "2 minutes ago",
      status: "completed",
    },
    {
      id: 2,
      card: "Pikachu",
      type: "sell",
      quantity: 5,
      price: 245.67,
      total: 1228.35,
      time: "15 minutes ago",
      status: "completed",
    },
    {
      id: 3,
      card: "Blastoise",
      type: "buy",
      quantity: 1,
      price: 567.89,
      total: 567.89,
      time: "1 hour ago",
      status: "pending",
    },
    {
      id: 4,
      card: "Venusaur",
      type: "sell",
      quantity: 3,
      price: 423.12,
      total: 1269.36,
      time: "2 hours ago",
      status: "completed",
    },
  ]

  return (
    <Card className={`backdrop-blur-md border rounded-2xl shadow-2xl ${
      isDark 
        ? "bg-white/10 border-white/20"
        : "bg-black/10 border-black/20"
    }`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className={`text-xl font-semibold ${
          isDark ? "text-white" : "text-slate-900"
        }`}>Recent Trades</CardTitle>
        <Button className={`backdrop-blur-sm border rounded-xl ${
          isDark 
            ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
            : "bg-black/10 border-black/20 text-slate-900 hover:bg-black/20"
        }`}>
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trades.map((trade) => (
            <div
              key={trade.id}
              className={`flex items-center justify-between p-4 rounded-xl backdrop-blur-sm border hover:bg-white/10 transition-all duration-300 ${
                isDark 
                  ? "bg-white/5 border-white/10"
                  : "bg-black/5 border-black/10"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-2 rounded-full backdrop-blur-sm border ${trade.type === "buy" ? "bg-green-500/20 border-green-400/30" : "bg-red-500/20 border-red-400/30"}`}
                >
                  {trade.type === "buy" ? (
                    <ArrowDownRight className="h-4 w-4 text-green-400" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-red-400" />
                  )}
                </div>
                <div>
                  <div className={`font-semibold ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}>{trade.card}</div>
                  <div className={`text-sm ${
                    isDark ? "text-slate-300" : "text-slate-600"
                  }`}>
                    {trade.type.toUpperCase()} {trade.quantity} cards @ ${trade.price}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className={`font-semibold ${
                  isDark ? "text-white" : "text-slate-900"
                }`}>${trade.total.toLocaleString()}</div>
                <div className={`flex items-center gap-2 text-sm ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}>
                  <Clock className="h-3 w-3" />
                  {trade.time}
                </div>
              </div>

              <Badge
                className={`${trade.status === "completed" ? "bg-green-500/20 text-green-300 border-green-400/30" : "bg-yellow-500/20 text-yellow-300 border-yellow-400/30"} backdrop-blur-sm border`}
              >
                {trade.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
