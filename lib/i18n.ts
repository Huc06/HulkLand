export const translations = {
  vi: {
    // Navigation
    nav: {
      home: "Trang chủ",
      mint: "Tạo NFT",
      stake: "Stake",
      craft: "Chế tạo"
    },
    
    // Hero section
    hero: {
      title: "Chào mừng đến với HulkLand",
      subtitle: "HulkLand mang đến trải nghiệm chơi game NFT độc đáo với các cơ chế hấp dẫn.",
      description: "Khám phá thế giới NFT với việc tạo mảnh đất, stake để nhận phần thưởng và chế tạo vật phẩm độc đáo.",
      cta: "Bắt đầu chơi ngay",
      readyToJoin: "Sẵn sàng tham gia HulkLand?"
    },
    
    // Features
    features: {
      mint: {
        title: "Tạo Land NFT",
        description: "Tạo ra những mảnh đất NFT độc đáo trong HulkLand"
      },
      stake: {
        title: "Stake & Kiếm thưởng", 
        description: "Stake Land NFT để khai thác nguyên liệu hiếm và nhận phần thưởng"
      },
      craft: {
        title: "Chế tạo vật phẩm",
        description: "Sử dụng nguyên liệu để chế tạo các vật phẩm mạnh mẽ"
      }
    },
    
    // Stake page
    staking: {
      title: "Hệ thống Khai thác Nguyên liệu Hiếm",
      materials: "Nguyên liệu Hiếm",
      manageLand: "Quản lý Land NFT",
      newStake: "Stake Land NFT mới",
      tokenIdLabel: "Token ID của Land NFT",
      tokenIdPlaceholder: "Nhập Token ID",
      stakeButton: "Stake Land NFT",
      refresh: "Refresh",
      mining: "Land NFT đang khai thác",
      noNFTs: "Chưa có Land NFT nào được stake",
      noNFTsDesc: "Stake Land NFT để bắt đầu khai thác nguyên liệu hiếm!",
      harvest: "Thu hoạch",
      unstake: "Unstake",
      miningTime: "Đang khai thác",
      claimAfter: "Claim sau",
      canHarvest: "Có thể thu hoạch!",
      unstaking: "Unstaking",
      overview: "Tổng quan khai thác",
      activeStaking: "Land NFT đang stake",
      totalMaterials: "Tổng nguyên liệu",
      avgStakeTime: "Thời gian stake trung bình"
    },
    
    // Mint page
    minting: {
      title: "Tạo Land NFT",
      description: "Tạo ra những mảnh đất NFT độc đáo trong HulkLand",
      mintButton: "Mint Land NFT",
      success: "Mint thành công!",
      error: "Mint thất bại"
    },
    
    // Common
    common: {
      connect: "Kết nối ví",
      disconnect: "Ngắt kết nối",
      light: "Sáng",
      dark: "Tối",
      language: "Ngôn ngữ",
      vietnamese: "Tiếng Việt",
      english: "English"
    }
  },
  
  en: {
    // Navigation
    nav: {
      home: "Home",
      mint: "Mint",
      stake: "Stake", 
      craft: "Craft"
    },
    
    // Hero section
    hero: {
      title: "Welcome to HulkLand",
      subtitle: "HulkLand brings unique NFT gaming experience with engaging mechanisms.",
      description: "Explore the NFT world by creating lands, staking for rewards, and crafting unique items.",
      cta: "Start Playing Now",
      readyToJoin: "Ready to join HulkLand?"
    },
    
    // Features
    features: {
      mint: {
        title: "Create Land NFT",
        description: "Create unique Land NFTs in HulkLand"
      },
      stake: {
        title: "Stake & Earn",
        description: "Stake Land NFTs to mine rare materials and earn rewards"
      },
      craft: {
        title: "Craft Items",
        description: "Use materials to craft powerful items"
      }
    },
    
    // Stake page
    staking: {
      title: "Rare Materials Mining System",
      materials: "Rare Materials",
      manageLand: "Manage Land NFT",
      newStake: "Stake New Land NFT",
      tokenIdLabel: "Land NFT Token ID",
      tokenIdPlaceholder: "Enter Token ID",
      stakeButton: "Stake Land NFT",
      refresh: "Refresh",
      mining: "Land NFTs Mining",
      noNFTs: "No Land NFTs staked yet",
      noNFTsDesc: "Stake Land NFTs to start mining rare materials!",
      harvest: "Harvest",
      unstake: "Unstake",
      miningTime: "Mining",
      claimAfter: "Claim in",
      canHarvest: "Ready to harvest!",
      unstaking: "Unstaking",
      overview: "Mining Overview",
      activeStaking: "Active Land NFTs",
      totalMaterials: "Total Materials",
      avgStakeTime: "Avg. Stake Time"
    },
    
    // Mint page
    minting: {
      title: "Create Land NFT",
      description: "Create unique Land NFTs in HulkLand",
      mintButton: "Mint Land NFT",
      success: "Mint successful!",
      error: "Mint failed"
    },
    
    // Common
    common: {
      connect: "Connect Wallet",
      disconnect: "Disconnect",
      light: "Light",
      dark: "Dark", 
      language: "Language",
      vietnamese: "Tiếng Việt",
      english: "English"
    }
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.vi;
