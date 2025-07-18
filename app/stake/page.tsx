"use client";

import StakeManager from "@/components/stake-manager";

export default function StakePage() {
  return (
    <div className="w-full py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Khai thác Tài nguyên</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Stake Land NFT để khai thác nguyên liệu hiếm và phát triển đế chế của bạn
          </p>
        </div>
        <StakeManager />
      </div>
    </div>
  );
}
