import { ethers } from "hardhat";

async function main() {
  const RockPaperScissorsGame = await ethers.getContractFactory("RockPaperScissorsGame");
  const game = await RockPaperScissorsGame.deploy();
  await game.waitForDeployment();
  console.log(`RockPaperScissorsGame deployed to: ${await game.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
