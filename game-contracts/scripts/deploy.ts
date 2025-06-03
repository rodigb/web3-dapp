import { ethers as hardhatEthers } from "hardhat";
import { parseEther } from "ethers";

async function main() {
  const Lock = await hardhatEthers.getContractFactory("Lock");

  const unlockTime = Math.floor(Date.now() / 1000) + 60;

  const lock = await Lock.deploy(unlockTime, {
    value: parseEther("0.01"),
    gasPrice: parseEther("0.00000002"), // 20 Gwei — adjust if needed
    gasLimit: 1_000_000,
  });

  await lock.waitForDeployment(); // <-- use this for Ethers v6

  console.log(`✅ Lock contract deployed to: ${lock.target}`);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
