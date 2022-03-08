/* eslint-disable no-prototype-builtins */
const { expect } = require("chai");
// const exp = require("constants");
const { ethers, upgrades } = require("hardhat");

const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

const dataRaw = [
  "0xbeefbeefbeefbeefbeefbeefbeefbeefbeefbeef",
  "0xfeedfeedfeedfeedfeedfeedfeedfeedfeedfeed",
  "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef",
  "0x7Eb696df980734DD592EBDd9dfC39F189aDc5456",
];

const leaves = dataRaw.map((x) => keccak256(x));

const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });

let WAWC,
  wawc,
  WristablesV2,
  wristablesV2,
  shipyardWallet,
  imagineWallet,
  wristablesWallet,
  addr2,
  addr3,
  addr4,
  addr5,
  addr6,
  addrs;

async function proxyDeploy() {
  [
    shipyardWallet,
    imagineWallet,
    wristablesWallet,
    addr2,
    addr3,
    addr4,
    addr5,
    addr6,
    ...addrs
  ] = await ethers.getSigners();

  WAWC = await ethers.getContractFactory("WristAficionadoWatchClub");
  WristablesV2 = await ethers.getContractFactory("WristablesV2");
  // how we would do it if this weren't UUPS
  // wristables = await Wristables.deploy();

  // how we do it instead
  wawc = await upgrades.deployProxy(
    // contract to deploy as proxy:
    WAWC,
    // this array is where arguments given to initializer go:
    [
      [shipyardWallet.address, imagineWallet.address, wristablesWallet.address],
      [7, 2, 1],
      merkleTree.getHexRoot(),
    ],
    // Here we indicate this is a UUPS:
    { kind: "uups" }
  );

  await wawc.deployed();
}

describe("Wristables Proxy", function () {
  beforeEach(async function () {
    await proxyDeploy();
  });

  it("Should deploy as a proxy successfully", async function () {
    expect(await wawc.MAX_SUPPLY()).to.equal(9999); // quick deploy check
  });

  it("Should be upgradeable", async function () {
    expect(wawc.functions.hasOwnProperty("version")).to.deep.equal(false);
    wristablesV2 = await upgrades.upgradeProxy(wawc, WristablesV2);
    expect(wristablesV2.functions.hasOwnProperty("version")).to.deep.equal(
      true
    );
    expect(await wristablesV2.version(), "V2");
  });

  it("Should have an owner", async function () {
    expect(await wawc.owner()).to.deep.equal(shipyardWallet.address);
  });
});

describe("Wristables Contract Unit Tests", function () {
  beforeEach(async function () {
    await proxyDeploy();
    await wawc.addAvailableSupply(999);
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: ["0x7Eb696df980734DD592EBDd9dfC39F189aDc5456"],
    });
  });

  it("Should batch airdrop", async function () {
    await wawc.batchAirdrop(
      [
        addr2.address,
        addr3.address,
        addr4.address,
        addr5.address,
        addr6.address,
      ],
      [1, 1, 1, 1, 3]
    );

    expect(await wawc.ownerOf(0)).to.deep.equal(addr2.address);
    expect(await wawc.ownerOf(1)).to.deep.equal(addr3.address);
    expect(await wawc.ownerOf(2)).to.deep.equal(addr4.address);
    expect(await wawc.ownerOf(3)).to.deep.equal(addr5.address);
    expect(await wawc.ownerOf(4)).to.deep.equal(addr6.address);
    expect(await wawc.ownerOf(5)).to.deep.equal(addr6.address);
    expect(await wawc.ownerOf(6)).to.deep.equal(addr6.address);

    // only owner check
    expect(
      wawc
        .connect(addr2)
        .batchAirdrop(
          [
            addr2.address,
            addr3.address,
            addr4.address,
            addr5.address,
            addr6.address,
          ],
          [1, 1, 1, 1, 1]
        )
    ).to.be.revertedWith("");
  });

  it("Mint for flat price", async function () {
    // reverts due to saleActive being false
    expect(
      wawc.connect(addr2).mint({ value: ethers.utils.parseEther("1") })
    ).to.be.revertedWith("");

    await wawc.setMintPrice(ethers.utils.parseEther("1"));
    await wawc.setSaleActive(true);

    await wawc.connect(addr2).mint({ value: ethers.utils.parseEther("1") });
    expect(await wawc.ownerOf(0)).to.deep.equal(addr2.address);
  });

  it("Mint at Auction", async function () {
    // reverts due to saleActive being false
    expect(
      wawc.connect(addr2).mintAuction({ value: ethers.utils.parseEther("1") })
    ).to.be.revertedWith("");

    await wawc.setSaleActive(true);

    // reverts due to toggleAuction being false
    expect(
      wawc.connect(addr2).mintAuction({ value: ethers.utils.parseEther("1") })
    ).to.be.revertedWith("");

    await wawc.setToggleAuction(true);

    const currentTime = Math.floor(Date.now() / 1000); // current time in s

    const oneWeek = 7 * 24 * 60 * 60; // 1 week in s
    const fiveMinutes = 5 * 60; // 5 mins in s

    const oneWeekFromNow = currentTime + oneWeek;

    await wawc.setDutchAuction(
      ethers.utils.parseEther("10"),
      ethers.utils.parseEther("1"),
      oneWeekFromNow,
      oneWeekFromNow + oneWeek,
      ethers.utils.parseEther("1")
    );

    await hre.ethers.provider.send("evm_setNextBlockTimestamp", [oneWeekFromNow]);
    await hre.ethers.provider.send("evm_mine");

    // mint at starting price
    await wawc
      .connect(addr2)
      .mintAuction({ value: ethers.utils.parseEther("10") });
    expect(await wawc.ownerOf(0)).to.deep.equal(addr2.address);

    await hre.ethers.provider.send("evm_setNextBlockTimestamp", [
      oneWeekFromNow + fiveMinutes,
    ]);
    await hre.ethers.provider.send("evm_mine");

    // mint at 1 increment in price deductions
    await wawc
      .connect(addr2)
      .mintAuction({ value: ethers.utils.parseEther("9") });
    expect(await wawc.ownerOf(0)).to.deep.equal(addr2.address);

    await hre.ethers.provider.send("evm_setNextBlockTimestamp", [
      oneWeekFromNow + oneWeek / 7,
    ]);
    await hre.ethers.provider.send("evm_mine");

    // mint at floor price
    await wawc
      .connect(addr2)
      .mintAuction({ value: ethers.utils.parseEther("1") });
    expect(await wawc.ownerOf(0)).to.deep.equal(addr2.address);

    await hre.ethers.provider.send("evm_setNextBlockTimestamp", [
      oneWeekFromNow + oneWeek,
    ]);
    await hre.ethers.provider.send("evm_mine");

    // mint at floor price
    expect(
      wawc.connect(addr2).mintAuction({ value: ethers.utils.parseEther("1") })
    ).to.be.revertedWith("");
  });

  it("should not be off by one", async function () {
    expect(wawc.batchAirdrop([addr2.address], [1000])).to.be.revertedWith("");

    await wawc.batchAirdrop([addr2.address], [999]);

    expect(await wawc.ownerOf(0)).to.deep.equal(addr2.address);
    expect(await wawc.ownerOf(998)).to.deep.equal(addr2.address);

    expect(wawc.batchAirdrop([addr2.address], [1])).to.be.revertedWith("");
  });

  it("should return proper royalty amount", async function () {
    const royaltyInfo = await wawc.royaltyInfo(
      0,
      ethers.utils.parseEther("10")
    );

    expect(royaltyInfo[0]).to.deep.equal(wawc.address);
    expect(royaltyInfo[1]).to.deep.equal(ethers.utils.parseEther("0.6"));
  });

  it("should allow whitelisted addresses to claim", async function () {
    await wawc.setMintPrice(ethers.utils.parseEther("1"));
    await wawc.setSaleActive(true);

    await addr2.sendTransaction({
      to: "0x7Eb696df980734DD592EBDd9dfC39F189aDc5456",
      value: ethers.utils.parseEther("3"),
    });

    const wlUserAddress = "0x7Eb696df980734DD592EBDd9dfC39F189aDc5456";

    const wlUser = await ethers.provider.getSigner(
      "0x7Eb696df980734DD592EBDd9dfC39F189aDc5456"
    );

    const proof = merkleTree.getHexProof(keccak256(wlUserAddress));

    // console.log(merkleTree.toString());
    // console.log("address", wlUserAddress, "proof: ", proof);

    // console.log(
    //   merkleTree.verify(
    //     proof,
    //     keccak256(wlUserAddress),
    //     merkleTree.getHexRoot()
    //   )
    // );

    await wawc // good proof correct user
      .connect(wlUser)
      .redeem(proof, { value: ethers.utils.parseEther("1") });

    expect(await wawc.balanceOf(wlUserAddress)).to.deep.equal(1);
    expect(await wawc.ownerOf(0)).to.deep.equal(wlUserAddress);

    expect(
      // good proof wrong user
      wawc.redeem(proof, { value: ethers.utils.parseEther("1") })
    ).to.be.revertedWith("");

    expect(
      // good proof good user, can't claim more than once
      wawc // good proof correct user
        .connect(wlUser)
        .redeem(proof, { value: ethers.utils.parseEther("1") })
    ).to.be.revertedWith("");
  });
});
