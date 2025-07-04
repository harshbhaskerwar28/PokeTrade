"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Target, AlertTriangle, Award } from "lucide-react"

export function PortfolioPerformance() {
  const performanceMetrics = [
    {
      title: "Total Return",
      value: "+$1,247.32",
      percent: "+8.54%",
      period: "All Time",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Best Performer",
      value: "Venusaur",
      percent: "+15.2%",
      period: "This Month",
      trend: "up",
      icon: Award,
    },
    {
      title: "Risk Score",
      value: "Moderate",
      percent: "7/10",
      period: "Current",
      trend: "neutral",
      icon: Target,
    },
    {
      title: "Diversification",
      value: "Good",
      percent: "5 Types",
      period: "Portfolio",
      trend: "up",
      icon: AlertTriangle,
    },
  ]

  const recentActivity = [
    { action: "Bought", card: "Mewtwo", amount: "$1,234.56", time: "2 hours ago", type: "buy" },
    { action: "Sold", card: "Gyarados", amount: "$567.89", time: "1 day ago", type: "sell" },
    { action: "Alert", card: "Pikachu", amount: "Price Target", time: "2 days ago", type: "alert" },
    { action: "Bought", card: "Alakazam", amount: "$456.78", time: "3 days ago", type: "buy" },
  ]

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-white">Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceMetrics.map((metric, index) => (
              <div
                key={index}
                className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-2 rounded-lg backdrop-blur-sm border ${
                        metric.trend === "up"
                          ? "bg-green-500/20 border-green-400/30"
                          : metric.trend === "down"
                            ? "bg-red-500/20 border-red-400/30"
                            : "bg-blue-500/20 border-blue-400/30"
                      }`}
                    >
                      <metric.icon
                        className={`h-4 w-4 ${
                          metric.trend === "up"
                            ? "text-green-400"
                            : metric.trend === "down"
                              ? "text-red-400"
                              : "text-blue-400"
                        }`}
                      />
                    </div>
                    <span className="text-sm text-slate-300">{metric.title}</span>
                  </div>
                </div>
                <div className="text-lg font-bold text-white">{metric.value}</div>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm font-semibold ${
                      metric.trend === "up"
                        ? "text-green-400"
                        : metric.trend === "down"
                          ? "text-red-400"
                          : "text-blue-400"
                    }`}
                  >
                    {metric.percent}
                  </span>
                  <span className="text-xs text-slate-400">{metric.period}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <Badge
                    className={`${
                      activity.type === "buy"
                        ? "bg-green-500/20 text-green-300 border-green-400/30"
                        : activity.type === "sell"
                          ? "bg-red-500/20 text-red-300 border-red-400/30"
                          : "bg-blue-500/20 text-blue-300 border-blue-400/30"
                    } backdrop-blur-sm border text-xs`}
                  >
                    {activity.action}
                  </Badge>
                  <div>
                    <div className="text-sm font-medium text-white">{activity.card}</div>
                    <div className="text-xs text-slate-400">{activity.time}</div>
                  </div>
                </div>
                <div className="text-sm font-semibold text-white">{activity.amount}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
