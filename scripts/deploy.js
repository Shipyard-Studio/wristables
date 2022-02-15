// import { Wristables } from "../typechain/Wristables";
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
const { ethers, upgrades } = require("hardhat");

async function main() {
  const Wristables = await ethers.getContractFactory("Wristables");
  // how we would do it if this weren't UUPS
  // wristables = await Wristables.deploy();

  // how we do it instead
  const wristables = await upgrades.deployProxy(
    // contract to deploy as proxy:
    Wristables,
    // this array is where arguments given to initializer go:
    // [
    //   [shipyardWallet.address, imagineWallet.address, wristablesWallet.address],
    //   [7, 2, 1],
    // ],
    [["0x7Eb696df980734DD592EBDd9dfC39F189aDc5456"], [1]],
    // Here we indicate this is a UUPS:
    { kind: "uups" }
  );

  await wristables.deployed();

  console.log("wristables deployed to:", wristables.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
