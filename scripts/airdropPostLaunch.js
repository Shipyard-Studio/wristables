const { ethers } = require("hardhat");
const WAWCJSON = require("../artifacts/contracts/Wristables.sol/WristablesV2.json");

const WAWCAddr = "0x219b2276A95DeD887d1281c0841Af4161C4bb415";
const contract = new ethers.Contract(WAWCAddr, WAWCJSON.abi);
const provider = new ethers.providers.JsonRpcProvider(
  `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_MAINNET_PRIVATE_KEY}`
);
const signer = new ethers.Wallet(process.env.MAINNET_PRIVATE_KEY, provider);

async function singles() {
  await contract
    .connect(signer)
    .batchAirdrop(
      [
        "0xc2cabc0154c69cdec2eecf98aa2c53cca780ddb4",
        "0x9D2DC589aaa97Ee71777Be84FC224604fe953997",
        "0x21148812c09ca0D04492ecCB6c35a93d00dcf7c1",
        "0xc357D4B1Cda3798c2Fb5416E2f9Dad7B8B2CB2da",
        "0x833438f009daf32cc1628FA92Ee9186a338b5481",
        "0x0562557A032C36Db6329B211e0061ABF63C6b438",
        "0x1878d1b6dbCE47cba3B0f84423B74D7d077aa190",
        "0x468b2B57aB31acaFB78E4304F597F45Ff5FcAf89",
        "0xaACd3a4a02992edcF024c7d3dC1321DC6Da718e3",
        "0x078abcab539ff961c4a97f8361e3adc51cc28014",
        "0x29B92c07DCeac683Cc9D058E5C121234Dc506435",
        "0xe61AaaE1C21E6aD04c89A87e62f066f940b6ff01",
      ],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    );
}
async function tens() {
  await contract
    .connect(signer)
    .batchAirdrop(
      [
        "0x7cb4fbd271f8c543eee8613bbcae955be56f3440",
        "0x3d7e9a408b0d646318065c61c2775a29b749b90b",
        "0x713addd9cdf7d8b7eac6aec0097238eebc348bac",
        "0x17a267042b02fdacb680832908e45e7bcb5b93e7",
        "0x57720729d74867b6a5ef13bfcc9a5d7cfa7ee250",
        "0xce95dbd51e2963c29b28cccc2ce3902c997f2875",
        "0x125ad0a086c1cac6e49eb29692cd068f4af3a8ff",
        "0xfdb3fe53e4e7f2a8844a59bebf204b3c6c2be55f",
        "0xbfccf5d5a3b738c6715b685ff9d5fcf66a2ad552",
        "0xd69f7e57bd447feef7b87e822c8ae427f75b7744",
        "0x0bef85cc47ee3c36e85ce8496dd61740f8dc4f2e",
        "0x0928dc41c6c183445bbb7b0b578571de0852964f",
        "0x567b57eb53740602c8aebb5364e275724ed76940",
        "0xb1432f1658ed0b2d4c1658f2780b9c29c5cc2bd4",
        "0x4de5578d06d785699190edf9631f2b4acf35ed96",
        "0x241e18d972e77c713fe793605943325afa59c65a",
        "0x6727fd080a22f6655a672b6badf526a3e87e1397",
        "0x90dddbaa63bb6ce96a8218fd71da9a6a268d13a7",
        "0x64e9950113429498ab39a361a718742d354ba00f",
        "0x202879d28043bc71f3f4d2f26dfb3027f625d441",
        "0x3e6fdfef6e08d1f2067139d769a7a58e90641f14",
        "0xc3306d450737424c9e90b587da23798115e34ce4",
        "0xc63642eeed99df40105a96097a6d09f487458e9f",
        "0xd5a8c5e7c30e022037e3b345c66ed015c180f360",
        "0xc91b274888080c6bafcb65ca558a714f2a5c7b16",
        "0x98d688b740e1045d58aa47434c9fb7ffff9be159",
        "0xfd4f502751778927d38b9b57047f085581f735c6",
        "0x5210703dd9a17d48f34cb540b5cb0eb7519c321e",
        "0x4a254dd63369ac14ac733202fe2b3e173b7dbca4",
        "0xf70d46b7b861b6f59b14b00256e7aa77ded22869",
      ],
      [
        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
      ]
    );
}
async function remaining() {
  await contract
    .connect(signer)
    .batchAirdrop(["0xA90D7C5f5Fa03684c703BC0430d1e5EAd4e60088"], [139]);
}

// singles();
// tens();
remaining();
