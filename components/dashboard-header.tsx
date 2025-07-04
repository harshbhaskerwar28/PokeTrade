"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Bell, User, TrendingUp, Menu, X } from "lucide-react"
import Link from "next/link"
import { LanguageSelector } from "@/components/language-selector"
import { ThemeToggle } from "@/components/theme-toggle"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTheme } from "@/contexts/ThemeContext"

export function DashboardHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()
  const { isDark } = useTheme()

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <header className="bg-white/20 dark:bg-white/10 backdrop-blur-md border-b border-slate-300 dark:border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4 lg:gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
                <TrendingUp className="h-5 w-5 text-black" />
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                PokéTrade
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              <Link 
                href="/dashboard" 
                className={`font-medium transition-colors ${
                  isActive("/dashboard") 
                    ? "text-blue-600 hover:text-blue-700 dark:text-yellow-400 dark:hover:text-yellow-300"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                {t.nav.dashboard}
              </Link>
              <Link 
                href="/market" 
                className={`font-medium transition-colors ${
                  isActive("/market") 
                    ? "text-blue-600 hover:text-blue-700 dark:text-yellow-400 dark:hover:text-yellow-300"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                {t.nav.market}
              </Link>
              <Link 
                href="/portfolio" 
                className={`font-medium transition-colors ${
                  isActive("/portfolio") 
                    ? "text-blue-600 hover:text-blue-700 dark:text-yellow-400 dark:hover:text-yellow-300"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                {t.nav.portfolio}
              </Link>
              <Link 
                href="/chatbot" 
                className={`font-medium transition-colors ${
                  isActive("/chatbot") 
                    ? "text-blue-600 hover:text-blue-700 dark:text-yellow-400 dark:hover:text-yellow-300"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                {t.nav.assistant}
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search cards..."
                className="pl-10 w-48 lg:w-64 bg-white/20 dark:bg-white/10 border-slate-300 dark:border-white/20 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:bg-white/30 dark:focus:bg-white/15 backdrop-blur-sm border transition-colors"
              />
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 text-green-600 dark:text-green-300 backdrop-blur-sm text-xs">
                Market Open
              </Badge>
            </div>

            {/* Theme and Language Controls */}
            <ThemeToggle />
            <LanguageSelector />

            <Button className="bg-white/20 dark:bg-white/10 border-slate-300 dark:border-white/20 text-slate-900 dark:text-white hover:bg-white/30 dark:hover:bg-white/20 backdrop-blur-sm border relative h-8 w-8 sm:h-10 sm:w-10 p-0 transition-colors">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="absolute -top-1 -right-1 h-2 w-2 sm:h-3 sm:w-3 bg-red-500 rounded-full"></span>
            </Button>

            <Button className="bg-white/20 dark:bg-white/10 border-slate-300 dark:border-white/20 text-slate-900 dark:text-white hover:bg-white/30 dark:hover:bg-white/20 backdrop-blur-sm border h-8 w-8 sm:h-10 sm:w-10 p-0 transition-colors">
              <User className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            <Button
              className="lg:hidden bg-white/20 dark:bg-white/10 backdrop-blur-sm border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white hover:bg-white/30 dark:hover:bg-white/20 h-8 w-8 p-0 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-300 dark:border-white/20 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/dashboard"
                className={`font-medium transition-colors ${
                  isActive("/dashboard") 
                    ? "text-blue-600 hover:text-blue-700 dark:text-yellow-400 dark:hover:text-yellow-300"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.nav.dashboard}
              </Link>
              <Link
                href="/market"
                className={`font-medium transition-colors ${
                  isActive("/market") 
                    ? "text-blue-600 hover:text-blue-700 dark:text-yellow-400 dark:hover:text-yellow-300"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.nav.market}
              </Link>
              <Link
                href="/portfolio"
                className={`font-medium transition-colors ${
                  isActive("/portfolio") 
                    ? "text-blue-600 hover:text-blue-700 dark:text-yellow-400 dark:hover:text-yellow-300"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.nav.portfolio}
              </Link>
              <Link
                href="/chatbot"
                className={`font-medium transition-colors ${
                  isActive("/chatbot") 
                    ? "text-blue-600 hover:text-blue-700 dark:text-yellow-400 dark:hover:text-yellow-300"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.nav.assistant}
              </Link>
              <div className="pt-4 border-t border-slate-300 dark:border-white/20">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search cards..."
                    className="pl-10 w-full bg-white/20 dark:bg-white/10 backdrop-blur-sm border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:bg-white/30 dark:focus:bg-white/15 transition-colors"
                  />
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
