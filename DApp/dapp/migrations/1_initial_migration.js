const Migrations = artifacts.require("Migrations");
const EncodeErc721 = artifacts.require("EncodeErc721");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(EncodeErc721);
};

