"use client";

import { useState, useEffect, useRef } from "react";
import { Button, Input, Card, Form, message, List, Image, Tabs, Progress, Badge, Tooltip } from "antd";
import { useWriteContract, useReadContract } from "wagmi";
import { parseUnits } from "viem";
import { useAccount } from "wagmi";
import { useLanguage } from "@/lib/language-context";

const VAULT_ADDRESS = "0x6CcB55772b7Cf9152dE7B63e10B447fee8857C03";
// const TOKEN_ADDRESS = "0xfaEe7aDa44A8a27b9c0fC6128E3Ad639e293afd5";
const NFT_ADDRESS = "0xee4d34A2E2B94107bD5B45c9Ff2a01e84896263E";

// Định nghĩa các loại nguyên liệu hiếm
const RARE_MATERIALS = {
  mysticCrystal: { name: "Mystic Crystal", color: "#9333ea", icon: "💎", rarity: "Legendary" },
  dragonScale: { name: "Dragon Scale", color: "#dc2626", icon: "🐉", rarity: "Epic" },
  ancientOre: { name: "Ancient Ore", color: "#ca8a04", icon: "⛏️", rarity: "Rare" },
  etherealEssence: { name: "Ethereal Essence", color: "#0891b2", icon: "✨", rarity: "Epic" },
  shadowStone: { name: "Shadow Stone", color: "#374151", icon: "🌑", rarity: "Rare" }
};

interface StakedNFT {
  id: number;
  uri: string;
  stakedAt: number;
  lastClaimAt: number;
  unstakeRequestAt?: number; // Thời điểm yêu cầu unstake
  isUnstaking: boolean; // Có đang trong quá trình unstake không
  materials: {
    mysticCrystal: number;
    dragonScale: number;
    ancientOre: number;
    etherealEssence: number;
    shadowStone: number;
  };
}

const ERC20_ABI = [
  { name: "balanceOf", inputs: [{ name: "account", type: "address" }], outputs: [{ name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { name: "approve", inputs: [{ name: "spender", type: "address" }, { name: "amount", type: "uint256" }], outputs: [{ name: "", type: "bool" }], stateMutability: "nonpayable", type: "function" }
];

const ERC721_ABI = [
  { name: "tokensOfOwner", inputs: [{ name: "owner", type: "address" }], outputs: [{ name: "", type: "uint256[]" }], stateMutability: "view", type: "function" },
  { name: "tokenURI", inputs: [{ name: "tokenId", type: "uint256" }], outputs: [{ name: "", type: "string" }], stateMutability: "view", type: "function" },
  { name: "getNFTsByOwner", inputs: [{ name: "owner", type: "address" }], outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }, { internalType: "string[]", name: "", type: "string[]" }], stateMutability: "view", type: "function" },
  { name: "approve", inputs: [{ name: "to", type: "address" }, { name: "tokenId", type: "uint256" }], outputs: [], stateMutability: "nonpayable", type: "function" }
];

const VAULT_ABI = [
  { name: "depositToken", inputs: [{ name: "token", type: "address" }, { name: "amount", type: "uint256" }], outputs: [], stateMutability: "nonpayable", type: "function" },
  { name: "withdrawToken", inputs: [{ name: "token", type: "address" }, { name: "amount", type: "uint256" }], outputs: [], stateMutability: "nonpayable", type: "function" },
  { name: "depositNFT", inputs: [{ name: "nftContract", type: "address" }, { name: "tokenId", type: "uint256" }], outputs: [], stateMutability: "nonpayable", type: "function" },
  { name: "withdrawNFT", inputs: [{ name: "nftContract", type: "address" }, { name: "tokenId", type: "uint256" }], outputs: [], stateMutability: "nonpayable", type: "function" },
  { name: "getUserTokenBalance", inputs: [{ name: "user", type: "address" }, { name: "token", type: "address" }], outputs: [{ name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { name: "getUserNFTs", inputs: [{ name: "user", type: "address" }, { name: "nftContract", type: "address" }], outputs: [{ name: "", type: "uint256[]" }], stateMutability: "view", type: "function" }
];

export default function StakeManager() {
  const { t } = useLanguage();
  const [assetType, setAssetType] = useState<"MATERIALS" | "ERC721">("MATERIALS");
  const [tokenId, setTokenId] = useState("");
  const [stakedNFTs, setStakedNFTs] = useState<StakedNFT[]>([]);
  const [currentTime, setCurrentTime] = useState(Date.now());

  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const isMounted = useRef(true);

  useEffect(() => () => { isMounted.current = false; }, []);

  // Simulate time progression for material generation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
      // Update materials for staked NFTs based on 24h cycle
      setStakedNFTs(prev => prev.map(nft => {
        if (nft.isUnstaking) return nft; // Không tạo materials nếu đang unstake
        
        const timeSinceLastClaim = (Date.now() - nft.lastClaimAt) / 1000; // seconds
        const hoursStaked = timeSinceLastClaim / 3600; // hours
        
        // Chỉ tính materials nếu đã stake ít nhất 1 giờ
        if (hoursStaked < 1) return nft;
        
        // Tính materials dựa trên số giờ đã stake (max 24h cho 1 cycle)
        const effectiveHours = Math.min(hoursStaked, 24);
        const baseRate = 1; // base materials per hour
        
        return {
          ...nft,
          materials: {
            mysticCrystal: Math.floor(effectiveHours * baseRate * 0.5), // Legendary - 12 per 24h
            dragonScale: Math.floor(effectiveHours * baseRate * 0.8), // Epic - 19.2 per 24h  
            ancientOre: Math.floor(effectiveHours * baseRate * 1.2), // Rare - 28.8 per 24h
            etherealEssence: Math.floor(effectiveHours * baseRate * 0.7), // Epic - 16.8 per 24h
            shadowStone: Math.floor(effectiveHours * baseRate * 1.0) // Rare - 24 per 24h
          }
        };
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Get user's NFTs in vault
  const { data: userNFTsData, refetch: refetchUserNFTs } = useReadContract({
    address: VAULT_ADDRESS,
    abi: VAULT_ABI,
    functionName: "getUserNFTs",
    args: [address, NFT_ADDRESS],
    query: { enabled: !!address }
  });

  // Get user's NFTs with URIs directly
  const { data: userNFTsWithURIs, refetch: refetchNFTsWithURIs } = useReadContract({
    address: NFT_ADDRESS,
    abi: ERC721_ABI,
    functionName: "getNFTsByOwner",
    args: [address],
    query: { enabled: !!address }
  });

  useEffect(() => {
    if (userNFTsData && isMounted.current) {
      const nftIds = (userNFTsData as bigint[]).map(id => Number(id));
      // Initialize staked NFTs with current time and zero materials
      const newStakedNFTs = nftIds.map(id => ({
        id,
        uri: getNFTImageURI(id) || "",
        stakedAt: Date.now(),
        lastClaimAt: Date.now(),
        isUnstaking: false,
        materials: {
          mysticCrystal: 0,
          dragonScale: 0,
          ancientOre: 0,
          etherealEssence: 0,
          shadowStone: 0
        }
      }));
      setStakedNFTs(newStakedNFTs);
    }
  }, [userNFTsData]);

  const refreshData = async () => {
    if (isMounted.current && address) {
      console.log("Refreshing data...");
      try {
        await refetchUserNFTs();
        await refetchNFTsWithURIs();
        console.log("Data refreshed successfully");
      } catch (error) {
        console.error("Error refreshing data:", error);
      }
    }
  };

  useEffect(() => {
    if (address) refreshData();
  }, [address]);

  const handleStakeNFT = async () => {
    if (!tokenId) {
      message.error(t('staking.tokenIdPlaceholder'));
      return;
    }

    try {
      // First approve NFT to be transferred by the vault
      message.loading({ content: "Approving NFT...", key: "approving" });
      await writeContractAsync({
        address: NFT_ADDRESS,
        abi: ERC721_ABI,
        functionName: "approve",
        args: [VAULT_ADDRESS, BigInt(tokenId)]
      });
      message.success({ content: "NFT approved", key: "approving" });

      // Then deposit NFT to the vault
      message.loading({ content: "Staking Land NFT...", key: "staking" });
      await writeContractAsync({
        address: VAULT_ADDRESS,
        abi: VAULT_ABI,
        functionName: "depositNFT",
        args: [NFT_ADDRESS, BigInt(tokenId)]
      });
      message.success({ content: t('staking.stakeButton') + " thành công!", key: "staking" });

      setTokenId("");
      setTimeout(() => {
        refreshData();
      }, 2000);
    } catch (error) {
      console.error("Stake error:", error);
      message.error("Stake failed");
    }
  };

  const handleUnstakeNFT = async (id: number) => {
    try {
      const stakedNFT = stakedNFTs.find(nft => nft.id === id);
      if (!stakedNFT) return;

      // Nếu chưa yêu cầu unstake, bắt đầu quá trình unstake (khoá 3 ngày)
      if (!stakedNFT.isUnstaking) {
        setStakedNFTs(prev => prev.map(nft => 
          nft.id === id 
            ? {
                ...nft,
                isUnstaking: true,
                unstakeRequestAt: Date.now()
              }
            : nft
        ));
        message.warning({
          content: "NFT đã được đánh dấu để unstake. Bạn cần đợi 3 ngày để hoàn tất quá trình unstake.",
          duration: 5
        });
        return;
      }

      // Kiểm tra đã đủ 3 ngày chưa
      const daysSinceRequest = (Date.now() - (stakedNFT.unstakeRequestAt || 0)) / 1000 / 86400; // days
      if (daysSinceRequest < 3) {
        message.warning(`Bạn cần đợi thêm ${(3 - daysSinceRequest).toFixed(1)} ngày nữa để unstake`);
        return;
      }

      // Thực hiện unstake thực sự
      message.loading({ content: "Unstaking Land NFT...", key: "unstaking" });
      await writeContractAsync({
        address: VAULT_ADDRESS,
        abi: VAULT_ABI,
        functionName: "withdrawNFT",
        args: [NFT_ADDRESS, BigInt(id)]
      });
      message.success({ content: t('staking.unstake') + " thành công!", key: "unstaking" });

      // Remove from staked list
      setStakedNFTs(prev => prev.filter(nft => nft.id !== id));

      setTimeout(() => {
        refreshData();
      }, 2000);
    } catch (error) {
      console.error("Unstake error:", error);
      message.error("Unstake failed");
    }
  };

  const handleClaimMaterials = (id: number) => {
    const nft = stakedNFTs.find(n => n.id === id);
    if (!nft) return;

    // Kiểm tra 24h từ lần claim cuối
    const timeSinceLastClaim = (Date.now() - nft.lastClaimAt) / 1000 / 3600; // hours
    if (timeSinceLastClaim < 24) {
      const remainingHours = 24 - timeSinceLastClaim;
      const hours = Math.floor(remainingHours);
      const minutes = Math.floor((remainingHours - hours) * 60);
      message.warning(`Bạn cần đợi thêm ${hours}h ${minutes}m nữa để claim nguyên liệu`);
      return;
    }

    // Kiểm tra có nguyên liệu để claim không
    if (!nft.materials || Object.values(nft.materials).every(amount => amount === 0)) {
      message.warning('Không có nguyên liệu để claim');
      return;
    }

    // Reset materials và cập nhật lastClaimAt
    setStakedNFTs(prev => prev.map(n => 
      n.id === id 
        ? {
            ...n,
            lastClaimAt: Date.now(), // Cập nhật thời gian claim cuối
            materials: {
              mysticCrystal: 0,
              dragonScale: 0,
              ancientOre: 0,
              etherealEssence: 0,
              shadowStone: 0
            }
          }
        : n
    ));

    message.success({
      content: `Đã thu hoạch nguyên liệu từ Land NFT #${id}!`,
      duration: 3
    });
  };

  // Hàm tính thời gian còn lại để claim
  const getTimeUntilNextClaim = (lastClaimAt: number) => {
    const timeSinceLastClaim = (Date.now() - lastClaimAt) / 1000 / 3600; // hours
    if (timeSinceLastClaim >= 24) return null; // Có thể claim rồi
    
    const remainingHours = 24 - timeSinceLastClaim;
    const hours = Math.floor(remainingHours);
    const minutes = Math.floor((remainingHours - hours) * 60);
    const seconds = Math.floor(((remainingHours - hours) * 60 - minutes) * 60);
    
    return { hours, minutes, seconds, canClaim: false };
  };

  // Hàm format thời gian hiển thị
  const formatTimeDisplay = (timeData: { hours: number; minutes: number; seconds: number } | null) => {
    if (!timeData) return "Có thể thu hoạch";
    const { hours, minutes, seconds } = timeData;
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  };

  // Get NFT image URI from userNFTsWithURIs data
  const getNFTImageURI = (tokenId: number) => {
    if (!userNFTsWithURIs) return null;
    const [ids, uris] = userNFTsWithURIs as [bigint[], string[]];
    const index = ids.findIndex(id => Number(id) === tokenId);
    return index !== -1 ? uris[index] : null;
  };

  // Render Materials overview UI
  const renderMaterialsUI = () => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(RARE_MATERIALS).map(([key, material]) => {
            const totalAmount = stakedNFTs.reduce((sum, nft) => sum + nft.materials[key as keyof typeof nft.materials], 0);
            return (
              <div key={key} className="text-center p-4 rounded-lg bg-card/50">
                <div className="font-semibold text-sm" style={{ color: material.color }}>
                  {material.name}
                </div>
                <div className="text-lg font-bold">{totalAmount}</div>
                <Badge color={material.color} text={material.rarity} />
              </div>
            );
          })}
        </div>
      </Card>

      <Card title={t('staking.overview')}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{stakedNFTs.length}</div>
            <div className="text-sm text-green-700">{t('staking.activeStaking')}</div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {Object.values(RARE_MATERIALS).reduce((sum, _, index) => {
                const key = Object.keys(RARE_MATERIALS)[index];
                return sum + stakedNFTs.reduce((nftSum, nft) => nftSum + nft.materials[key as keyof typeof nft.materials], 0);
              }, 0)}
            </div>
            <div className="text-sm text-blue-700">{t('staking.totalMaterials')}</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {stakedNFTs.length > 0 ? (stakedNFTs.reduce((sum, nft) => sum + (Date.now() - nft.stakedAt), 0) / (1000 * 60 * 60 * stakedNFTs.length)).toFixed(1) : "0"}h
            </div>
            <div className="text-sm text-purple-700">{t('staking.avgStakeTime')}</div>
          </div>
        </div>
      </Card>
    </div>
  );

  // Render Land NFT management UI
  const renderNFTUI = () => (
    <div className="space-y-6">
      <Card title={t('staking.newStake')} className="mb-6">
        <Form layout="vertical">
          <Form.Item label={t('staking.tokenIdLabel')}>
            <Input 
              value={tokenId} 
              onChange={e => setTokenId(e.target.value)} 
              type="number"
              placeholder={t('staking.tokenIdPlaceholder')}
              className="w-full"
            />
          </Form.Item>
          
          <div className="flex gap-3">
            <Button type="primary" onClick={handleStakeNFT} className="flex-1 sm:flex-none">
              {t('staking.stakeButton')}
            </Button>
            <Button type="default" onClick={refreshData} className="flex-1 sm:flex-none">
              {t('staking.refresh')}
            </Button>
          </div>
        </Form>
      </Card>

      <Card title={`${t('staking.mining')} (${stakedNFTs.length})`}>
        {stakedNFTs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>{t('staking.noNFTs')}</p>
            <p className="text-sm">{t('staking.noNFTsDesc')}</p>
          </div>
        ) : (
          <List
            grid={{ 
              gutter: [16, 16], 
              xs: 1, 
              sm: 1, 
              md: 2, 
              lg: 2, 
              xl: 3 
            }}
            dataSource={stakedNFTs}
            renderItem={nft => (
              <List.Item>
                <Card 
                  className="h-full"
                  cover={
                    nft.uri ? (
                      <Image 
                        src={nft.uri} 
                        alt={`Land NFT ${nft.id}`} 
                        className="h-48 object-cover rounded-t-lg" 
                        preview={false}
                      />
                    ) : (
                      <div className="h-48 bg-gray-200 flex items-center justify-center rounded-t-lg">
                        <span className="text-gray-500">Loading...</span>
                      </div>
                    )
                  }
                  actions={[
                    <Tooltip 
                      key="claim" 
                      title={
                        (() => {
                          const timeData = getTimeUntilNextClaim(nft.lastClaimAt);
                          return timeData ? `Còn lại: ${formatTimeDisplay(timeData)}` : "Có thể thu hoạch ngay";
                        })()
                      }
                    >
                      <Button 
                        type="primary" 
                        size="small" 
                        onClick={() => handleClaimMaterials(nft.id)}
                        className="mx-2"
                        disabled={getTimeUntilNextClaim(nft.lastClaimAt) !== null}
                      >
                        {t('staking.harvest')}
                      </Button>
                    </Tooltip>,
                    <Tooltip 
                      key="unstake" 
                      title={
                        nft.isUnstaking 
                          ? `Còn lại: ${Math.max(0, 3 - (Date.now() - (nft.unstakeRequestAt || 0)) / 1000 / 86400).toFixed(1)} ngày` 
                          : "Bắt đầu quá trình unstake (3 ngày)"
                      }
                    >
                      <Button 
                        danger 
                        size="small" 
                        onClick={() => handleUnstakeNFT(nft.id)}
                        className="mx-2"
                      >
                        {nft.isUnstaking ? `Hoàn tất ${t('staking.unstake')}` : t('staking.unstake')}
                      </Button>
                    </Tooltip>
                  ]}
                >
                  <div className="space-y-3">
                    <div className="text-center">
                      <h3 className="font-semibold">Land #{nft.id}</h3>
                      <p className="text-sm text-gray-600">
                        {t('staking.miningTime')}: {Math.floor((Date.now() - nft.stakedAt) / 60000)}m
                      </p>
                      
                      {/* Hiển thị thời gian claim */}
                      <div className="mt-2">
                        {(() => {
                          const timeData = getTimeUntilNextClaim(nft.lastClaimAt);
                          if (timeData) {
                            return (
                              <div className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                                ⏰ {t('staking.claimAfter')}: {formatTimeDisplay(timeData)}
                              </div>
                            );
                          } else {
                            return (
                              <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full animate-pulse">
                                ✅ {t('staking.canHarvest')}
                              </div>
                            );
                          }
                        })()}
                      </div>

                      {/* Hiển thị trạng thái unstaking */}
                      {nft.isUnstaking && (
                        <div className="mt-2">
                          <div className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                            {t('staking.unstaking')}: {Math.max(0, 3 - (Date.now() - (nft.unstakeRequestAt || 0)) / 1000 / 86400).toFixed(1)} ngày
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      {Object.entries(RARE_MATERIALS).map(([key, material]) => {
                        const amount = nft.materials[key as keyof typeof nft.materials];
                        return (
                          <div key={key} className="flex justify-between items-center">
                            <span className="text-xs flex items-center gap-1">
                              {material.name}
                            </span>
                            <span className="font-semibold text-sm" style={{ color: material.color }}>
                              {amount}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <Progress 
                      percent={Math.min(100, ((Date.now() - nft.lastClaimAt) / (1000 * 60 * 60 * 24)) * 100)} 
                      size="small"
                      status={getTimeUntilNextClaim(nft.lastClaimAt) ? "active" : "success"}
                      strokeColor={getTimeUntilNextClaim(nft.lastClaimAt) ? "#1890ff" : "#52c41a"}
                      format={(percent) => {
                        const timeData = getTimeUntilNextClaim(nft.lastClaimAt);
                        if (timeData) {
                          return `${Math.round(percent || 0)}%`;
                        } else {
                          return "100%";
                        }
                      }}
                    />
                  </div>
                </Card>
              </List.Item>
            )}
          />
        )}
      </Card>
    </div>
  );

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <Card title={t('staking.title')} className="mb-6">
          <Tabs
            activeKey={assetType}
            onChange={(key) => setAssetType(key as "MATERIALS" | "ERC721")}
            items={[
              {
                key: "MATERIALS",
                label: `${t('staking.materials')}`,
                children: renderMaterialsUI()
              },
              {
                key: "ERC721",
                label: `${t('staking.manageLand')}`,
                children: renderNFTUI()
              }
            ]}
          />
        </Card>
      </div>
    </div>
  );
}
