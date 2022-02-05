/* eslint-disable no-prototype-builtins */
const { expect } = require("chai");
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
  beforeEach(proxyDeploy);

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
    expect(
      wristables.connect(addr2).batchAirdrop([
        addr2.address,
        addr3.address,
        addr4.address,
        addr5.address,
        addr6.address,
      ])
    ).to.be.revertedWith("");
  });

  it("Mint ", async function () {
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
  });
});
