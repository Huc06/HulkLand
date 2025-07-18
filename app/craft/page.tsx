"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { NftCard } from "@/components/nft-card"
import { toast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/lib/language-context"

interface LandNFT {
  id: number
  name: string
  image: string
  rarity: string
  biome: string
  resourceRate: number
  level: number
  isStaked: boolean
}

const mockNFTs: LandNFT[] = [
  {
    id: 1,
    name: "Forest Land",
    image: "/placeholder.svg?height=200&width=200",
    rarity: "Common",
    biome: "Forest",
    resourceRate: 10,
    level: 1,
    isStaked: false,
  },
  {
    id: 2,
    name: "Mountain Peak",
    image: "/placeholder.svg?height=200&width=200",
    rarity: "Rare",
    biome: "Mountain",
    resourceRate: 25,
    level: 2,
    isStaked: false,
  },
  {
    id: 3,
    name: "Desert Oasis",
    image: "/placeholder.svg?height=200&width=200",
    rarity: "Uncommon",
    biome: "Desert",
    resourceRate: 15,
    level: 1,
    isStaked: false,
  },
]

export default function CraftingPage() {
  const { t } = useLanguage()
  const [nfts, setNfts] = React.useState<LandNFT[]>(mockNFTs)
  const [resourceTokens, setResourceTokens] = React.useState(500) // Mock resource tokens
  const [selectedNftId, setSelectedNftId] = React.useState<string | null>(null)

  const upgradeCost = 100 // Example cost to upgrade one level

  const handleCraft = () => {
    if (!selectedNftId) {
      toast({
        title: "Crafting Error",
        description: "Please select an NFT to craft.",
        variant: "destructive",
      })
      return
    }

    const nftToUpgrade = nfts.find((nft) => nft.id === Number(selectedNftId))

    if (!nftToUpgrade) {
      toast({
        title: "Crafting Error",
        description: "Selected NFT not found.",
        variant: "destructive",
      })
      return
    }

    if (resourceTokens < upgradeCost) {
      toast({
        title: "Crafting Error",
        description: "Not enough Resource Tokens.",
        variant: "destructive",
      })
      return
    }

    // Placeholder for actual crafting logic
    // In a real app, this would interact with your smart contract.
    setResourceTokens((prev) => prev - upgradeCost)
    setNfts((prevNfts) =>
      prevNfts.map((nft) => (nft.id === Number(selectedNftId) ? { ...nft, level: nft.level + 1 } : nft)),
    )
    toast({
      title: "Crafting Successful!",
      description: `Land NFT #${selectedNftId} upgraded to Level ${nftToUpgrade.level + 1}.`,
    })
  }

  const availableNFTs = nfts.filter((nft) => !nft.isStaked) // Can only craft unstaked NFTs
  const selectedNft = availableNFTs.find((nft) => nft.id === Number(selectedNftId))

  return (
    <div className="flex flex-col gap-8 py-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">{t('crafting.title')}</h2>
        <p className="text-muted-foreground">{t('crafting.subtitle')}</p>
        
        {/* Thông báo đang phát triển */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg max-w-2xl mx-auto">
          <div className="flex items-center mb-3">
            <h3 className="text-lg font-semibold text-yellow-800">{t('crafting.developmentNotice.title')}</h3>
          </div>
          <div className="text-yellow-700 space-y-2">
            <p><strong>{t('crafting.developmentNotice.description')}</strong></p>
            <ul className="list-disc list-inside space-y-1 text-left">
              <li>{t('crafting.developmentNotice.features.0')}</li>
              <li>{t('crafting.developmentNotice.features.1')}</li>
              <li>{t('crafting.developmentNotice.features.2')}</li>
              <li>{t('crafting.developmentNotice.features.3')}</li>
            </ul>
            <div className="mt-4 p-3 bg-yellow-100 rounded-md">
              <p className="font-medium">{t('crafting.developmentNotice.launchDate')}</p>
              <p className="text-sm">{t('crafting.developmentNotice.followUp')}</p>
            </div>
          </div>
        </div>
      </div>

      <Card className="w-full max-w-md mx-auto opacity-60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {t('crafting.demo.title')}
          </CardTitle>
          <CardDescription>
            <div className="space-y-2">
              <div>{t('crafting.demo.resources')} <span className="font-semibold">{resourceTokens} {t('crafting.demo.resourceTokens')}</span></div>
              <div className="text-xs text-orange-600 font-medium">{t('crafting.demo.warning')}</div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="select-nft">{t('crafting.demo.selectLabel')}</Label>
            <Select onValueChange={setSelectedNftId} value={selectedNftId || ""} disabled>
              <SelectTrigger id="select-nft">
                <SelectValue placeholder={t('crafting.demo.placeholder')} />
              </SelectTrigger>
              <SelectContent>
                {availableNFTs.length > 0 ? (
                  availableNFTs.map((nft) => (
                    <SelectItem key={nft.id} value={String(nft.id)}>
                      {nft.name} #{nft.id} (Level {nft.level})
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-nfts" disabled>
                    Không có NFT nào khả dụng để nâng cấp
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {selectedNft && (
            <div className="grid gap-2">
              <h3 className="font-semibold">Thông tin NFT đã chọn:</h3>
              <NftCard
                id={selectedNft.id}
                name={selectedNft.name}
                image={selectedNft.image}
                rarity={selectedNft.rarity}
                biome={selectedNft.biome}
                resourceRate={selectedNft.resourceRate}
                level={selectedNft.level}
              />
              <p className="text-sm text-muted-foreground mt-2">
                Chi phí nâng cấp lên Level {selectedNft.level + 1}: {upgradeCost} Resource Tokens
              </p>
            </div>
          )}

          <Button onClick={handleCraft} disabled={true} className="opacity-50">
            {t('crafting.demo.button')}
          </Button>
          
          <div className="text-xs text-center text-gray-500 mt-2">
            <p>{t('crafting.demo.footer')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
