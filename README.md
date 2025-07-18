# Sagaverse MVP

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/hucs-projects/v0-sagaverse-mvp)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/ycDCvI9jK8a)

## Overview

Sagaverse MVP là một game NFT trên Saga Blockchain với các tính năng:

- **Mint Land NFT**: Tạo ra những mảnh đất NFT độc đáo với metadata được lưu trên IPFS
- **Stake & Earn**: Stake Land NFT để khai thác Resource Token theo thời gian
- **Vault System**: Quản lý tài sản ERC20 và ERC721 thông qua smart contract vault
- **Wallet Integration**: Kết nối với MetaMask và WalletConnect qua RainbowKit

## Blockchain Integration

### Smart Contracts

- **NFT Contract**: `0xee4d34A2E2B94107bD5B45c9Ff2a01e84896263E`
- **Token Contract**: `0xfaEe7aDa44A8a27b9c0fC6128E3Ad639e293afd5`
- **Vault Contract**: `0x6CcB55772b7Cf9152dE7B63e10B447fee8857C03`

### Saga Blockchain

- **Chain ID**: 2751204664118000
- **RPC URL**: https://sagakit-2751204664118000-1.jsonrpc.sagarpc.io
- **Native Token**: ETH

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI**: Tailwind CSS, shadcn/ui, Ant Design
- **Blockchain**: wagmi, viem, RainbowKit
- **Storage**: Pinata IPFS for NFT metadata

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and fill in your values
4. Get a WalletConnect Project ID from https://cloud.walletconnect.com/
5. Run: `npm run dev`

## Deployment

Your project is live at:

**[https://vercel.com/hucs-projects/v0-sagaverse-mvp](https://vercel.com/hucs-projects/v0-sagaverse-mvp)**

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/ycDCvI9jK8a](https://v0.dev/chat/projects/ycDCvI9jK8a)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Features

### 🏞️ Land NFT Minting
- Upload images to IPFS via Pinata
- Mint unique Land NFTs on Saga blockchain
- View your NFT collection with metadata

### ⛏️ Resource Mining
- Stake Land NFTs to earn Resource Tokens
- Automatic token generation based on staking time
- Manage staked assets through vault system

### 💼 Asset Management
- Deposit/withdraw ERC20 tokens and ERC721 NFTs
- View balances in both wallet and vault
- Secure smart contract interactions
