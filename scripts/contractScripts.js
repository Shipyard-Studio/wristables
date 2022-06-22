const { ethers } = require("hardhat");
const { merkleTree } = require("./merkle-tree");
const WAWCJSON = require("../artifacts/contracts/Wristables.sol/WristablesV2.json");

const WAWCAddr = "0xf7DE696145B527C004669Fb07B66591e2dD53E58";
const contract = new ethers.Contract(WAWCAddr, WAWCJSON.abi);
const provider = new ethers.providers.JsonRpcProvider(
  `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_PRIVATE_KEY}`
);
const signer = new ethers.Wallet(process.env.RINKEBY_PRIVATE_KEY, provider);

/*
 function setAllSaleParams (uint16 _availableTokenId, bytes32 _root, uint8 _indexWL, bool _saleActive, uint128 _mintPrice) external onlyOwner {
        setMerkleRoot(_root);
        setIndexWL(_indexWL);
        setSaleActive(_saleActive);
        setMintPrice(_mintPrice);
        setAvailableTokenID(_availableTokenId);
    }
*/

const setSaleParams = async () => {
  await contract
    .connect(signer)
    .setAllSaleParams(
      499,
      merkleTree.getHexRoot(),
      0,
      false,
      ethers.utils.parseEther("0.25")
    );
};

const setBaseURI = async (uri) => {
  await contract.connect(signer).setBaseURI(uri);
};

// setSaleParams();
setBaseURI("ipfs://QmUjJSbvttyg4M2dyxTMq7BKQQBak9WNsCGBjgdmy62S12").then(
  console.log("success")
);
