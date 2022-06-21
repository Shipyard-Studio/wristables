const { ethers, upgrades } = require("hardhat");
const { merkleTree } = require("./merkle-tree");

/*

WA 15% Mint + 1.5% Secondary Sales:
0x24730C82404Aa0b6a1189b488E0dD82BfA91e625

Web3 Community: 25% Mint + 2.5% Secondary Sales:
0x886f8133a0021C5F8b537b35391a17A7C647Ca70

Management 20% Mint + 2% Secondary Sales:
0x7a635A34f6770775b32A5a6e5310d26DBfaB0A22

Marketing and Promotions: 10% Mint + 1% Secondary Sales:
0x0BD3FfED15F68b03aCDC3Ce394Ef710b38bd7F1F

Dev, J Digital, Back end etc: 24% Mint + 2.4% Secondary Sales
0xBf0263df559C66426fA593807abA22F9a28776b7

Dev (Macro NFT Studio) 6% Mint + 0.6% Secondary Sales
0x705a47eBC6fCE487a3C64A2dA64cE2E3B8b2EF55


*/

async function main() {
  const WAWC = await ethers.getContractFactory("WristAficionadoWatchClub");

  const wawc = await upgrades.deployProxy(
    // contract to deploy as proxy:
    WAWC,
    // this array is where arguments given to initializer go:
    [
      [
        "0x24730C82404Aa0b6a1189b488E0dD82BfA91e625",
        "0x886f8133a0021C5F8b537b35391a17A7C647Ca70",
        "0x7a635A34f6770775b32A5a6e5310d26DBfaB0A22",
        "0x0BD3FfED15F68b03aCDC3Ce394Ef710b38bd7F1F",
        "0xBf0263df559C66426fA593807abA22F9a28776b7",
        "0x705a47eBC6fCE487a3C64A2dA64cE2E3B8b2EF55",
      ],
      [15, 25, 20, 10, 24, 6],
      merkleTree.getHexRoot(),
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
