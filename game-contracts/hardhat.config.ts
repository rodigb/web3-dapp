import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-ethers";

import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    hyperevm: {
      url: "https://rpc.hyperliquid-testnet.xyz/evm",  
      accounts: [process.env.PRIVATE_KEY!],           
      chainId: 998,                                  
    },
  },
};

export default config;
