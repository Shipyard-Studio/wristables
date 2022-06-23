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

const setUp = async () => {
  await contract
    .connect(signer)
    .setAllSaleParams(499, root, 0, true, ethers.utils.parseEther("0.01"));
  console.log("set all sale params");
};

// function setAllSaleParams (uint16 _availableTokenId, bytes32 _root, uint8 _indexWL, bool _saleActive, uint128 _mintPrice) external onlyOwner {
//     setMerkleRoot(_root);
//     setIndexWL(_indexWL);
//     setSaleActive(_saleActive);
//     setMintPrice(_mintPrice);
//     setAvailableTokenID(_availableTokenId);
// }

setUp();
