"use client";

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

export default function LandingPage() {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <section className="hero-section py-8 md:py-16 lg:py-24 w-full">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="flex flex-col justify-center space-y-6 text-center lg:text-left">
              <div className="space-y-4">
                <h1 className="text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                  {t('hero.title')}
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                  {t('hero.description')}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/mint" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto">{t('features.mint.title')}</Button>
                </Link>
                <Link href="/stake" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    {t('features.stake.title')}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/placeholder.png?height=400&width=550"
                width="550"
                height="400"
                alt="HulkLand Hero"
                className="w-full max-w-md lg:max-w-lg xl:max-w-xl rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="features-section py-8 md:py-16 lg:py-24 bg-muted w-full">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
                {t('hero.subtitle')}
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-4xl">
                {t('hero.subtitle')}
              </p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8 md:mt-12">
            <div className="bg-card rounded-lg p-6 space-y-3">
              <h3 className="text-lg font-bold">{t('features.mint.title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('features.mint.description')}
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 space-y-3">
              <h3 className="text-lg font-bold">{t('features.stake.title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('features.stake.description')}
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 space-y-3 sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg font-bold">{t('features.craft.title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('features.craft.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section py-8 md:py-16 lg:py-24 w-full">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
                {t('hero.readyToJoin')}
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-4xl">
                {t('hero.description')}
              </p>
            </div>
            <Link href="/mint">
              <Button size="lg" className="text-lg px-8 py-3">{t('hero.cta')}</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
