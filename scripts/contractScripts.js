const { ethers } = require("hardhat");
const { merkleTree } = require("./merkle-tree");
const WAWCJSON = require("../artifacts/contracts/Wristables.sol/WristablesV2.json");

const WAWCAddr = "0x219b2276A95DeD887d1281c0841Af4161C4bb415";
const contract = new ethers.Contract(WAWCAddr, WAWCJSON.abi);
const provider = new ethers.providers.JsonRpcProvider(
  `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_MAINNET_PRIVATE_KEY}`
);
const signer = new ethers.Wallet(process.env.MAINNET_PRIVATE_KEY, provider);
const root = merkleTree.getHexRoot();

const whitelistSaleSetup = async () => {
  await contract
    .connect(signer)
    .setAllSaleParams(0, root, 0, false, ethers.utils.parseEther("0.25"));
};

const setAvailableSupplyTo499 = async () => {
  await contract.connect(signer).setAvailableTokenID(499);
  console.log("token supply set to 499");
};

const mintFirstTokenToManagement = async () => {
  await contract
    .connect(signer)
    .batchAirdrop(["0x7a635A34f6770775b32A5a6e5310d26DBfaB0A22"], [1]);
};

const publicSaleSetup = async () => {
  await contract.connect(signer).setSaleActive(true);
  await contract.connect(signer).setMintPrice(ethers.utils.parseEther("0.27"));
};

const setBaseURI = async (uri) => {
  await contract.connect(signer).setBaseURI(uri);
};

whitelistSaleSetup();
// publicSaleSetup();
// setBaseURI("ipfs://QmanCYDxfTM97zBxHQGair8gnCcTyZE5AqncSn434NqB47/");
// mintFirstTokenToManagement();
