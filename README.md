# HulkLand MVP

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/hucs-projects/v0-hulkland-mvp)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Powered by Saga](https://img.shields.io/badge/Powered%20by-Saga%20Blockchain-green?style=for-the-badge)](https://sagachain.io/)

**HulkLand MVP** là một nền tảng Game-Fi tiên tiến được xây dựng trên Saga Blockchain, kết hợp công nghệ NFT với cơ chế GameFi để tạo ra trải nghiệm chơi game blockchain hoàn toàn mới.

## Tính năng chính

### Land NFT Ecosystem
- **Mint Land NFT**: Tạo ra những mảnh đất NFT độc đáo với metadata được lưu trữ phi tập trung trên IPFS
- **Collection Management**: Quản lý bộ sưu tập Land NFT với giao diện thân thiện và hiệu suất cao
- **Metadata Storage**: Sử dụng Pinata IPFS để lưu trữ metadata và hình ảnh NFT

### Staking & Mining System
- **Resource Mining**: Stake Land NFT để khai thác Resource Token theo thời gian thực
- **Automated Rewards**: Hệ thống tự động tính toán và phân phối phần thưởng dựa trên thời gian stake
- **Flexible Staking**: Cho phép stake/unstake Land NFT linh hoạt và an toàn

### Crafting System
- **Item Crafting**: Sử dụng nguyên liệu đã khai thác để chế tạo các vật phẩm mạnh mẽ
- **Recipe System**: Hệ thống công thức chế tạo đa dạng và phong phú
- **Resource Management**: Quản lý và tối ưu hóa việc sử dụng nguyên liệu

### Advanced Features
- **Multi-language Support**: Hỗ trợ đa ngôn ngữ (Tiếng Việt & English) với i18n hoàn chỉnh
- **Dark/Light Theme**: Chế độ giao diện tối/sáng với transition mượt mà
- **Responsive Design**: Giao diện tương thích với mọi thiết bị từ mobile đến desktop
- **Wallet Integration**: Kết nối đa ví với MetaMask, WalletConnect thông qua RainbowKit

## Tech Stack

### Frontend
- **Framework**: Next.js 15 với App Router
- **Language**: TypeScript
- **UI Framework**: React 19
- **Styling**: Tailwind CSS
- **Component Libraries**: 
  - shadcn/ui (Modern component system)
  - Ant Design (Enterprise-class UI components)
  - Radix UI (Headless components)
  - Lucide React (Icon system)

### Blockchain & Web3
- **Blockchain**: Saga Blockchain (EVM Compatible)
- **Web3 Libraries**: 
  - wagmi v2 (React hooks for Ethereum)
  - viem v2 (TypeScript interface for Ethereum)
  - RainbowKit (Wallet connection)
- **Contract Interaction**: Type-safe smart contract calls

### Infrastructure & Storage
- **IPFS Storage**: Pinata cho NFT metadata
- **State Management**: React Context API + Custom hooks
- **Form Handling**: React Hook Form với Zod validation
- **Query Management**: TanStack Query

## Smart Contracts

### Deployed Contracts trên Saga Blockchain

```
NFT Contract (Land NFT):     0xee4d34A2E2B94107bD5B45c9Ff2a01e84896263E
Resource Token Contract:     0xfaEe7aDa44A8a27b9c0fC6128E3Ad639e293afd5
Vault Management Contract:   0x6CcB55772b7Cf9152dE7B63e10B447fee8857C03
```

### Saga Blockchain Configuration

```javascript
const sagaChain = {
  chainId: 2751204664118000,
  rpcUrl: "https://sagakit-2751204664118000-1.jsonrpc.sagarpc.io",
  nativeToken: "ETH",
  blockExplorer: "https://explorer.saga.io"
}
```

## Cài đặt và Chạy dự án

### Prerequisites
- Node.js 18+ 
- npm hoặc yarn
- MetaMask wallet
- Saga blockchain testnet ETH

### Installation

1. **Clone repository**
```bash
git clone <repository-url>
cd sagaverse-mvp
```

2. **Install dependencies**
```bash
npm install
# hoặc
yarn install
```

3. **Environment Setup**
Tạo file `.env.local` và cấu hình các biến môi trường:

```env
# WalletConnect Project ID (from https://cloud.walletconnect.com/)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id

# Pinata API Keys (from https://pinata.cloud/)
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_API_KEY=your_pinata_secret

# Optional: Custom RPC URLs
NEXT_PUBLIC_SAGA_RPC_URL=https://sagakit-2751204664118000-1.jsonrpc.sagarpc.io
```

4. **Development Server**
```bash
npm run dev
# Truy cập http://localhost:3000
```

### Available Scripts

```bash
npm run dev      # Chạy development server
npm run build    # Build production
npm run start    # Chạy production server
npm run lint     # Kiểm tra code quality
```

## Kiến trúc dự án

```
sagaverse-mvp/
├── app/                    # Next.js App Router
│   ├── craft/             # Crafting system pages
│   ├── mint/              # NFT minting pages
│   ├── stake/             # Staking system pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── main-nav.tsx      # Navigation component
│   ├── mint-nft.tsx      # NFT minting logic
│   ├── stake-manager.tsx # Staking management
│   └── ...
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
│   ├── utils.ts         # Helper functions
│   └── i18n.ts          # Internationalization
├── public/              # Static assets
└── styles/              # Global styles
```

## Deployment

### Vercel Deployment

Dự án được deploy tự động trên Vercel:

**Live Demo**: [https://vercel.com/hucs-projects/v0-hulkland-mvp](https://vercel.com/hucs-projects/v0-hulkland-mvp)

### Deploy Steps
1. Connect repository với Vercel
2. Cấu hình environment variables
3. Deploy tự động với mỗi commit

## Hướng dẫn sử dụng

### 1. Kết nối Wallet
- Click "Connect Wallet" để kết nối MetaMask hoặc ví khác
- Đảm bảo đã cấu hình Saga blockchain trong ví

### 2. Mint Land NFT
- Truy cập trang "Mint" 
- Upload hình ảnh cho mảnh đất
- Nhập thông tin metadata
- Confirm transaction để mint NFT

### 3. Stake & Mining
- Truy cập trang "Stake"
- Chọn Land NFT để stake
- Theo dõi quá trình khai thác nguyên liệu
- Thu hoạch Resource Token định kỳ

### 4. Crafting (Coming Soon)
- Sử dụng nguyên liệu để chế tạo vật phẩm
- Khám phá các công thức chế tạo mới
- Nâng cấp equipment và tools

## Features đặc biệt

### Internationalization (i18n)
- Hỗ trợ đầy đủ Tiếng Việt và English
- Chuyển đổi ngôn ngữ real-time
- Localization cho tất cả UI components

### Theme System
- Dark/Light mode tự động theo system preference
- Smooth transition animations
- Consistent color scheme across components

### Performance Optimization
- Next.js App Router for optimal performance
- Static generation cho SEO tốt hơn
- Lazy loading cho components lớn
- Optimized bundle size

## Contributing

### Development Guidelines
1. Sử dụng TypeScript cho type safety
2. Follow ESLint rules
3. Implement responsive design
4. Add proper error handling
5. Write comprehensive documentation

### Code Structure
- Components: Functional components với hooks
- Styling: Tailwind CSS classes
- State: Context API + useReducer pattern
- API calls: Custom hooks với error boundaries

## Roadmap

### Phase 1 (Current) ✅
- [x] Land NFT minting system
- [x] Basic staking mechanism
- [x] Wallet integration
- [x] Multi-language support
- [x] Dark/Light theme

### Phase 2 (In Progress) 🔄
- [ ] Complete crafting system
- [ ] Advanced staking pools
- [ ] Marketplace integration
- [ ] Mobile app optimization

### Phase 3 (Planned) 📋
- [ ] PvP battle system
- [ ] Guild functionality
- [ ] Achievement system
- [ ] NFT breeding mechanics

## Support & Community

- **Documentation**: [Project Wiki](wiki-url)
- **Discord**: [HulkLand Community](discord-url)
- **Twitter**: [@HulkLandGame](twitter-url)
- **Email**: support@hulkland.game

## License

MIT License - xem file `LICENSE` để biết thêm chi tiết.

---

**Built with ❤️ by HulkLand Team**
