"use client";

import StakeManager from "@/components/stake-manager";
import { useLanguage } from "@/lib/language-context";

export default function StakePage() {
  const { t } = useLanguage();
  
  return (
    <div className="w-full py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">{t('staking.title')}</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {t('staking.subtitle')}
          </p>
        </div>
        <StakeManager />
      </div>
    </div>
  );
}
