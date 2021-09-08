//This file is used instead of a migrations file as the Truffle plugin does not fully support migrations yet.
//Instead, need to adapt the Migrations to become a hardhat-truffle fixture

const DummyContract = artifacts.require("DummyContract");

// Layout for hardhat deployment

module.exports = async () => {
  const dummyContract = await DummyContract.new();
  DummyContract.setAsDeployed(dummyContract);

  console.log("Dummy Contract successfully deployed...");
};
