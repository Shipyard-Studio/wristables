/* eslint-disable no-prototype-builtins */
const { expect } = require("chai");
const exp = require("constants");
const { ethers, upgrades } = require("hardhat");

let Wristables,
  wristables,
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

  Wristables = await ethers.getContractFactory("Wristables");
  WristablesV2 = await ethers.getContractFactory("WristablesV2");
  // how we would do it if this weren't UUPS
  // wristables = await Wristables.deploy();

  // how we do it instead
  wristables = await upgrades.deployProxy(
    // contract to deploy as proxy:
    Wristables,
    // this array is where arguments given to initializer go:
    [
      [shipyardWallet.address, imagineWallet.address, wristablesWallet.address],
      [7, 2, 1],
    ],
    // Here we indicate this is a UUPS:
    { kind: "uups" }
  );

  await wristables.deployed();
}

describe("Wristables Proxy", function () {
  beforeEach(async function () {
    await proxyDeploy();
  });

  it("Should deploy as a proxy successfully", async function () {
    expect(await wristables.MAX_SUPPLY()).to.equal(9999); // quick deploy check
  });

  it("Should be upgradeable", async function () {
    expect(wristables.functions.hasOwnProperty("version")).to.deep.equal(false);
    wristablesV2 = await upgrades.upgradeProxy(wristables, WristablesV2);
    expect(wristablesV2.functions.hasOwnProperty("version")).to.deep.equal(
      true
    );
    expect(await wristablesV2.version(), "V2");
  });

  it("Should have an owner", async function () {
    expect(await wristables.owner()).to.deep.equal(shipyardWallet.address);
  });
});

describe("Wristables Contract Unit Tests", function () {
  beforeEach(async function () {
    await proxyDeploy();
    await wristables.setAvailableSupply(999);
  });

  it("Should airdrop", async function () {
    await wristables.airdrop(addr2.address, 2);

    expect(await wristables.ownerOf(0)).to.deep.equal(addr2.address);
    expect(await wristables.ownerOf(1)).to.deep.equal(addr2.address);

    // only owner check
    expect(
      wristables.connect(addr2).airdrop(addr2.address, 2)
    ).to.be.revertedWith("");
  });

  it("Should batch airdrop", async function () {
    await wristables.batchAirdrop([
      addr2.address,
      addr3.address,
      addr4.address,
      addr5.address,
      addr6.address,
    ]);

    expect(await wristables.ownerOf(0)).to.deep.equal(addr2.address);
    expect(await wristables.ownerOf(1)).to.deep.equal(addr3.address);
    expect(await wristables.ownerOf(2)).to.deep.equal(addr4.address);
    expect(await wristables.ownerOf(3)).to.deep.equal(addr5.address);
    expect(await wristables.ownerOf(4)).to.deep.equal(addr6.address);

    // only owner check
    expect(
      wristables
        .connect(addr2)
        .batchAirdrop([
          addr2.address,
          addr3.address,
          addr4.address,
          addr5.address,
          addr6.address,
        ])
    ).to.be.revertedWith("");
  });

  it("Mint for flat price", async function () {
    // reverts due to saleActive being false
    expect(
      wristables.connect(addr2).mint({ value: ethers.utils.parseEther("1") })
    ).to.be.revertedWith("");

    await wristables.setMintPrice(ethers.utils.parseEther("1"));
    await wristables.setSaleActive(true);

    await wristables
      .connect(addr2)
      .mint({ value: ethers.utils.parseEther("1") });
    expect(await wristables.ownerOf(0)).to.deep.equal(addr2.address);
  });

  // it("Mint at Auction", async function () {
  //   // reverts due to saleActive being false
  //   expect(
  //     wristables
  //       .connect(addr2)
  //       .mintAuction({ value: ethers.utils.parseEther("1") })
  //   ).to.be.revertedWith("");

  //   await wristables.setSaleActive(true);

  //   // reverts due to toggleAuction being false
  //   expect(
  //     wristables
  //       .connect(addr2)
  //       .mintAuction({ value: ethers.utils.parseEther("1") })
  //   ).to.be.revertedWith("");

  //   // function setDutchAuction (
  //   // uint256 _startingPrice,
  //   // uint256 _floorPrice,
  //   // uint256 _startAt,
  //   // uint256 _expiresAt,
  //   // uint256 _priceDeductionRate

  //   await wristables.setDutchAuction(
  //     ethers.utils.parseEther("10"),
  //     ethers.utils.parseEther("1")
  //     // time
  //     // time plus 7 days
  //   );

  //   // mint auction
  //   await wristables
  //     .connect(addr2)
  //     .mint({ value: ethers.utils.parseEther("1") });
  //   expect(await wristables.ownerOf(0)).to.deep.equal(addr2.address);
  // });

  it("should not be off by one", async function () {
    expect(wristables.airdrop(addr2.address, 1000)).to.be.revertedWith("");

    await wristables.airdrop(addr2.address, 999);

    expect(await wristables.ownerOf(0)).to.deep.equal(addr2.address);
    expect(await wristables.ownerOf(998)).to.deep.equal(addr2.address);

    expect(wristables.airdrop(addr2.address, 1)).to.be.revertedWith("");
  });

  it("should return proper royalty amount", async function () {
    const royaltyInfo = await wristables.royaltyInfo(
      0,
      ethers.utils.parseEther("10")
    );

    expect(royaltyInfo[0]).to.deep.equal(wristables.address);
    expect(royaltyInfo[1]).to.deep.equal(ethers.utils.parseEther("0.6"));
  });
});
