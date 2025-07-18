import Link from "next/link"
import { WalletConnectButton } from "@/components/wallet-connect-button"

export function MainNav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="w-full">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 md:gap-8">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-lg font-bold">Sagaverse</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <Link href="/mint" className="transition-colors hover:text-primary">
                Mint Land
              </Link>
              <Link href="/stake" className="transition-colors hover:text-primary">
                Stake Land
              </Link>
              <Link href="/craft" className="transition-colors hover:text-primary">
                Crafting
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            <WalletConnectButton />
          </div>
        </div>
      </div>
    </header>
  )
}
