const { assert, expect } = require("chai");
const DummyContract = artifacts.require("DummyContract");

contract("Dummy Contract", ([owner, user1]) => {
  let dummyContract;

  // Before any tests are run, deploy the contract to be tested.
  before(async () => {
    dummyContract = await DummyContract.deployed();

    // Gets the list of accounts from Web3
    let accounts = await web3.eth.getAccounts();
    // Display accounts
    var count = 0;
    for (var account in accounts) {
      console.log(`Account${count}: ${accounts[account]} \n`);
      count++;
    }
  });

  // Before each describe block is run.
  beforeEach(async () => {
    // This deploys a new version on the DummyContract so that everything is reset.
    dummyContract = await DummyContract.new();
  });

  // Using Chai assert statements.
  describe("Contract deployment", async () => {
    it("Should know information about the contract", async () => {
      // Failing test.
      assert.notEqual(await dummyContract.owner(), user1);
      // Passing test.
      assert.equal(await dummyContract.owner(), owner);
      assert.equal(await dummyContract.symbol(), "DumTkn");
      assert.equal(await dummyContract.name(), "DummyToken");

      // Using Chai expect statements.
      describe("Contract deployment", async () => {
        it("Should know information about the contract", async () => {
          // Failing test.
          expect(user1).to.not.equal(await dummyContract.owner());
          // Passing test.
          expect(await dummyContract.owner()).to.equal(owner);
          expect(await dummyContract.symbol()).to.equal("DumTkn");
          expect(await dummyContract.name()).to.equal("DummyToken");
        });
      });
    });

    describe("setUp", () => {
      it("Should not allow anyone but the owner to call", async () => {
        await expect(() =>
          dummyContract
            .setUp({ from: addr1 })
            .to.be.revertedWith("Ownable: caller is not the owner")
        );
      });

      it("Should mint the initial amount to the contract owner", async () => {
        const ownerBalanceBefore = await dummyContract.balanceOf(owner);
        await dummyContract.setUp();
        const ownerBalanceAfter = await dummyContract.balanceOf(owner);
        expect(parseInt(ownerBalanceAfter)).to.equal(
          parseInt(ownerBalanceBefore + 100)
        );
      });
    });
  });
});
