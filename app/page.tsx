import { Hero } from "@/components/hero"
import { MarketOverview } from "@/components/market-overview"
import { TrendingCards } from "@/components/trending-cards"
import { MarketHeatmap } from "@/components/market-heatmap"
import { AIInsights } from "@/components/ai-insights"
import { WebsiteAssistant } from "@/components/website-assistant"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 transition-colors duration-300">
      {/* Subtle dotted background pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: "60px 60px",
        }}
      />
      <Hero />
      <MarketOverview />
      <div className="container mx-auto px-4 py-12 space-y-12 relative z-10">
        <TrendingCards />
        <MarketHeatmap />
        <AIInsights />
      </div>
      <WebsiteAssistant />
    </div>
  )
}
