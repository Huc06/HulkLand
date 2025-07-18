"use client";

import Link from "next/link"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { LanguageThemeToggle } from "@/components/language-theme-toggle"
import { useLanguage } from "@/lib/language-context"

export function MainNav() {
  const { t } = useLanguage();
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="w-full">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 md:gap-8">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-lg font-bold">HulkLand</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <Link href="/mint" className="transition-colors hover:text-primary">
                {t('nav.mint')}
              </Link>
              <Link href="/stake" className="transition-colors hover:text-primary">
                {t('nav.stake')}
              </Link>
              <Link href="/craft" className="transition-colors hover:text-primary">
                {t('nav.craft')}
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <LanguageThemeToggle />
            <WalletConnectButton />
          </div>
        </div>
      </div>
    </header>
  )
}
