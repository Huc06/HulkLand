"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { NftCard } from "@/components/nft-card"
import { toast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

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
      <h2 className="text-3xl font-bold text-center">Crafting Station</h2>
      <p className="text-center text-muted-foreground">Sử dụng Resource Tokens để nâng cấp Land NFT của bạn.</p>

      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Nâng cấp NFT</CardTitle>
          <CardDescription>
            Tài nguyên hiện có: <span className="font-semibold">{resourceTokens} Resource Tokens</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="select-nft">Chọn Land NFT để nâng cấp</Label>
            <Select onValueChange={setSelectedNftId} value={selectedNftId || ""}>
              <SelectTrigger id="select-nft">
                <SelectValue placeholder="Chọn NFT" />
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

          <Button onClick={handleCraft} disabled={!selectedNftId || resourceTokens < upgradeCost}>
            Nâng cấp NFT
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
