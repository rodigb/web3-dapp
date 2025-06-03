import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { hyperEVMTestnet } from './chains/hyperevm';

const config = getDefaultConfig({
  appName: "dapp-poker",
  projectId: "7d492b04208314e573e4e6902bb96811",
  chains: [hyperEVMTestnet],
  ssr: false,
});

export default config;
