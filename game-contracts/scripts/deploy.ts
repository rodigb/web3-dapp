import { ethers } from "hardhat";

async function main() {
  const PokerGame = await ethers.getContractFactory("PokerGame");
  const game = await PokerGame.deploy();
  await game.waitForDeployment();
  console.log(`PokerGame deployed to: ${await game.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
