import { DashboardHeader } from "@/components/dashboard-header"
import { PortfolioOverview } from "@/components/portfolio-overview"
import { RecentTrades } from "@/components/recent-trades"
import { WatchList } from "@/components/watch-list"
import { MarketNews } from "@/components/market-news"
import { ChatBot } from "@/components/chatbot"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Subtle dotted background pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
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
      <ChatBot />
    </div>
  )
}
