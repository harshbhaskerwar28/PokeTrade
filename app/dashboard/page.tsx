"use client";

import { DashboardHeader } from "@/components/dashboard-header"
import { PortfolioOverview } from "@/components/portfolio-overview"
import { RecentTrades } from "@/components/recent-trades"
import { WatchList } from "@/components/watch-list"
import { MarketNews } from "@/components/market-news"
import { WebsiteAssistant } from "@/components/website-assistant"
import { useTheme } from "@/contexts/ThemeContext"

export default function DashboardPage() {
  const { isDark } = useTheme();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 transition-colors duration-300">
      {/* Subtle dotted background pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: isDark
            ? "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
            : "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23475569' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: "60px 60px",
        }}
      />

      <DashboardHeader />
      <div className="container mx-auto px-4 py-8 space-y-8 relative z-10">
        <PortfolioOverview />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <RecentTrades />
            <MarketNews />
          </div>
          <div>
            <WatchList />
          </div>
        </div>
      </div>
              <WebsiteAssistant />
    </div>
  )
}
