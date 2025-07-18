"use client";

import MintNFT from "@/components/mint-nft";

export default function MintPage() {
  return (
    <div className="w-full py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Mint Land NFT</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Tạo ra những mảnh đất NFT độc đáo trong Sagaverse
          </p>
        </div>
        <MintNFT />
      </div>
    </div>
  );
}
