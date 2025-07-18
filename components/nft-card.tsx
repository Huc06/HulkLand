"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface NftCardProps {
  id: number
  name: string
  image: string
  rarity: string
  biome: string
  resourceRate: number
  level: number
  onAction?: (id: number) => void
  actionLabel?: string
  children?: React.ReactNode
}

export function NftCard({
  id,
  name,
  image,
  rarity,
  biome,
  resourceRate,
  level,
  onAction,
  actionLabel,
  children,
}: NftCardProps) {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <CardTitle>
          {name} #{id}
        </CardTitle>
        <CardDescription>Level: {level}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={200}
          height={200}
          className="rounded-md object-cover"
        />
        <div className="grid w-full gap-1 text-sm">
          <p>
            <span className="font-semibold">Rarity:</span> {rarity}
          </p>
          <p>
            <span className="font-semibold">Biome:</span> {biome}
          </p>
          <p>
            <span className="font-semibold">Resource Rate:</span> {resourceRate} / block
          </p>
        </div>
      </CardContent>
      {children && <CardFooter className="flex flex-col gap-2">{children}</CardFooter>}
      {onAction && actionLabel && (
        <CardFooter>
          <Button className="w-full" onClick={() => onAction(id)}>
            {actionLabel}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
