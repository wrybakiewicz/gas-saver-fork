const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DummyContract", function () {
  // Initialise variables
  let DummyContract, dummyContract, owner, addr1, addr2;

  beforeEach(async () => {
    // Deploy a new instance of the contract
    DummyContract = await ethers.getContractFactory("DummyContract");
    dummyContract = await DummyContract.deploy();
    // Get accounts and assign to pre-defined variables
    [owner, addr1, addr2, _] = await ethers.getSigners();
  });

  describe("Deployment", () => {
    it("Should be set with the Dummy Contract information", async () => {
      // Failing test
      expect(addr1.address).to.not.equal(await dummyContract.owner());
      // Passing tests
      expect(await dummyContract.owner()).to.equal(owner.address);
      expect(await dummyContract.name()).to.equal("DummyToken");
      expect(await dummyContract.symbol()).to.equal("DumTkn");
    });
  });

  describe("setUp", () => {
    it("Should not allow anyone but the owner to call", async () => {
      await expect(() =>
        dummyContract
          .connect(addr1)
          .setUp()
          .to.be.revertedWith("Ownable: caller is not the owner")
      );
    });

    it("Should mint the initial amount to the contract owner", async () => {
      const ownerBalanceBefore = await dummyContract.balanceOf(owner.address);
      await dummyContract.setUp();
      const ownerBalanceAfter = await dummyContract.balanceOf(owner.address);
      expect(ownerBalanceAfter).to.equal(ownerBalanceBefore + 100);
    });
  });
});
