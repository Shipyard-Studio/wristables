const { ethers } = require("hardhat");
const WAWCJSON = require("../artifacts/contracts/Wristables.sol/WristablesV2.json");

const WAWCAddr = "0x6f8DA0590600572C31C9960156A8111dCD05EA67";
const contract = new ethers.Contract(WAWCAddr, WAWCJSON.abi);
const provider = new ethers.providers.JsonRpcProvider(
  `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_PRIVATE_KEY}`
);
const signer = new ethers.Wallet(process.env.RINKEBY_PRIVATE_KEY, provider);

const setUp = async () => {
  await contract.connect(signer).setMintPrice(ethers.utils.parseEther("0.01"));
  console.log("set mint price");
  await contract.connect(signer).setSaleActive(true);
  console.log("set sale active");
  await contract.connect(signer).setAvailableSupply(999);
  console.log("set available supply 999");
};

setUp();
