const EncodeErc721 = artifacts.require("EncodeErc721");

module.exports = async function (deployer, network, accounts) {
    // deployment steps
    await deployer.deploy(EncodeErc721);
};