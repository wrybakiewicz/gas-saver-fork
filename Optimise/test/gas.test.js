const GasContract = artifacts.require("GasContract");
contract("Gas", accounts => {
    it("should say hello", async () => {
    const instance = await GasContract.deployed();
    const welcome = await instance.welcome.call();
    assert.equal(
        welcome,
       "hello !",
        "Incorrect Welcome message",
        );            
    });
    it("should mint tokens", async () => {
        const instance = await GasContract.deployed();
        const totalSupply = await instance.totalSupply.call();
        assert.equal(
            totalSupply.toNumber(),
           10000,
            "Minting Failed",
            );            
        });
    it("should send some tokens", async () => {
        const instance = await GasContract.deployed();
        const tx = await instance.transfer(accounts[1],100, {from : accounts[0]});   
        });
});