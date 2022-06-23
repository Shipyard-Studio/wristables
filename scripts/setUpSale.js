const { ethers } = require("hardhat");
const { merkleTree } = require("./merkle-tree");
const WAWCJSON = require("../artifacts/contracts/Wristables.sol/WristAficionadoWatchClub.json");

const WAWCAddr = "0x6367A010dfe635F8b9143b6331A1768e2B873c8F";
const contract = new ethers.Contract(WAWCAddr, WAWCJSON.abi);
const provider = new ethers.providers.JsonRpcProvider(
  `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_PRIVATE_KEY}`
);
const signer = new ethers.Wallet(process.env.RINKEBY_PRIVATE_KEY, provider);
const root = merkleTree.getHexRoot();

const whitelistSaleSetup = async () => {
  await contract
    .connect(signer)
    .setAllSaleParams(499, root, 0, false, ethers.utils.parseEther("0.25"));
  console.log("set all sale params");
};

const publicSaleSetup = async () => {
  await contract.connect(signer).setSaleActive(true);
  await contract.connect(signer).setMintPrice(ethers.utils.parseEther("0.27"));
};

whitelistSaleSetup();
// publicSaleSetup();
