import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { MainNav } from "@/components/main-nav"
import { Providers } from "@/components/providers"
import { LanguageProvider } from "@/lib/language-context"
import { ThemeProvider } from "@/lib/theme-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HulkLand MVP",
  description: "A Minimum Viable Product for the HulkLand NFT Game on Saga Blockchain.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider>
          <LanguageProvider>
            <Providers>
              <div className="flex flex-col min-h-screen">
                <MainNav />
                <main className="flex-1 w-full">{children}</main>
              </div>
            </Providers>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
