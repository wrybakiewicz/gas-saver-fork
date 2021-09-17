const Migrations = artifacts.require("Migrations");
const GasContract = artifacts.require('GasContract');
module.exports = async function (deployer) {
  deployer.deploy(Migrations);
  await deployer.deploy(GasContract);
};

