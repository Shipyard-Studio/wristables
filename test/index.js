const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("Wristables", function () {
  let Wristables, wristables, wristablesV2, shipyardWallet, imagineWallet, wristablesWallet, addr2, addr3, addr4, addr5, addr6, addrs;

  beforeEach(async function () {
    [shipyardWallet, imagineWallet, wristablesWallet, addr2, addr3, addr4, addr5, addr6, ...addrs] = await ethers.getSigners();
    // ShipToken = await ethers.getContractFactory("ShipToken");
    // shipToken = await ShipToken.deploy(owner.address, []);

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
        [7,2,1]
      ],
      // Here we indicate this is a UUPS:
      {kind:'uups'}
    ); 

    await wristables.deployed();
  });

  it("Should deploy as a proxy successfully", async function() {
    expect(await wristables.MAX_SUPPLY()).to.equal(9999); // quick deploy check
  })

  it("Should be upgradeable", async function() {
    expect(wristables.functions.hasOwnProperty("version")).to.be.false;
    wristablesV2 = await upgrades.upgradeProxy(wristables, WristablesV2);
    expect(wristablesV2.functions.hasOwnProperty("version")).to.be.true;
    expect(await wristablesV2.version(), "V2");
  })

  it("Should run a test", async function() {
    // your test here!
  });
});
