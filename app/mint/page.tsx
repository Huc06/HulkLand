"use client";

import MintNFT from "@/components/mint-nft";
import { useLanguage } from "@/lib/language-context";

export default function MintPage() {
  const { t } = useLanguage();
  
  return (
    <div className="w-full py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">{t('minting.title')}</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {t('minting.description')}
          </p>
        </div>
        <MintNFT />
      </div>
    </div>
  );
}
