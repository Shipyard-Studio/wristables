const { ethers } = require("hardhat");
const { merkleTree } = require("./merkle-tree");
const WAWCJSON = require("../artifacts/contracts/Wristables.sol/WristablesV2.json");

const WAWCAddr = "0xf7DE696145B527C004669Fb07B66591e2dD53E58";
const contract = new ethers.Contract(WAWCAddr, WAWCJSON.abi);
const provider = new ethers.providers.JsonRpcProvider(
  `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_PRIVATE_KEY}`
);
const signer = new ethers.Wallet(process.env.MAINNET_PRIVATE_KEY, provider);
const root = merkleTree.getHexRoot();

const whitelistSaleSetup = async () => {
  await contract
    .connect(signer)
    .setAllSaleParams(499, root, 0, false, ethers.utils.parseEther("0.25"));
};

const publicSaleSetup = async () => {
  await contract.connect(signer).setSaleActive(true);
  await contract.connect(signer).setMintPrice(ethers.utils.parseEther("0.27"));
};

const setBaseURI = async (uri) => {
  await contract.connect(signer).setBaseURI(uri);
};

// whitelistSaleSetup();
// publicSaleSetup();
setBaseURI("ipfs://QmXqRRY9NBoGQdmEB5aZq2TNJAThLSpYi6eqbEfrNgTdms/");
