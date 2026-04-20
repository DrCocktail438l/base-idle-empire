const hre = require("hardhat");

async function main() {
  const Empire = await hre.ethers.getContractFactory("Empire");
  const empire = await Empire.deploy();
  await empire.waitForDeployment();
  console.log("Empire contract deployed to:", await empire.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
