import type { Chain } from "wagmi/chains";

export const hyperEVMTestnet = {
  id: 998,
  name: "HyperEVM Testnet",
  iconUrl: "/hl.png",
  iconBackground: "#fff",
  nativeCurrency: { name: "Hype", symbol: "HYPE", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.hyperliquid-testnet.xyz/evm"] },
  },
  blockExplorers: {
    default: { name: "HyperExplorer", url: "https://explorer.hyperliquid.xyz" },
  },
} as const satisfies Chain;
