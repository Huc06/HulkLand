"use client";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { Chain, http } from "viem";
import { cookieStorage, createConfig, createStorage, WagmiProvider } from "wagmi";
import { injected, walletConnect } from "wagmi/connectors";
import "@rainbow-me/rainbowkit/styles.css";

const myChainlet: Chain = {
  id: 2751204664118000,
  name: "Saga Kit",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sagakit-2751204664118000-1.jsonrpc.sagarpc.io"]
    }
  },
  blockExplorers: {
    default: { 
      name: "Saga Explorer", 
      url: "https://sagakit-2751204664118000-1.jsonrpc.sagarpc.io" 
    }
  }
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 3,
    },
  },
});

const config = createConfig({
  chains: [myChainlet],
  transports: { [myChainlet.id]: http() },
  connectors: [
    injected(),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "default-project-id",
      showQrModal: true
    })
  ],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  })
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>
          <RainbowKitProvider coolMode>
            {children}
          </RainbowKitProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </ConfigProvider>
  );
}
