const { ethers, upgrades } = require("hardhat");
const { merkleTree } = require("./merkle-tree");

async function main() {
  const WAWC = await ethers.getContractFactory("WristAficionadoWatchClub");

  const wawc = await upgrades.deployProxy(
    // contract to deploy as proxy:
    WAWC,
    // this array is where arguments given to initializer go:
    [
      [
        "0x7Eb696df980734DD592EBDd9dfC39F189aDc5456",
        "0x6b845d7dF55Ff9D91c686Df94C8C80a8a6CF339a",
        "0x36142d591D9B920f97E8e6fFA831436CfA17B822",
      ],
      [7, 2, 1],
      // merkleTree.getHexRoot(),
    ],
    // Here we indicate this is a UUPS:
    { kind: "uups" }
  );

  await wawc.deployed();

  console.log("wawc deployed to:", wawc.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
