const GasContract = artifacts.require("GasContract");
contract("Gas", accounts => {
 //   let instance;
 //   let admins = ['0x84cEDe5C0FaB9D8173B5DDB9Ee0598720b058E7b','0x2118b6F3D92E0cd8Aab3aF2eB038C1a7f4e1eC96','0x0ADC5a1d4E014879AfC2819a70A8A85D015e5549','0x89C3558608e63c83B5f9c7F16755265dDFDf98E1','0x93050ab9c437651F8ba2845c524A4817B7D813Db']
    // beforeEach(async () => {
    //     instance = await GasContract.deployed();
    //         });
   
 it("should check for admin", async () => {
    const instance = await GasContract.deployed();
    let adminFlag;
   for (ii = 0; ii< 5; ii++){ 
       adminFlag = await instance.checkForAdmin.call(accounts[ii]);
       assert.equal(
           adminFlag,
       true,
           "Incorrect admin");    
       }
     });

     it("should check for false admin", async () => {
        const instance = await GasContract.deployed();
        let adminFlag;
           adminFlag = await instance.checkForAdmin.call(accounts[8]);
           assert.equal(
               adminFlag,
           false,
               "Incorrect admin");    

         });
    
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

     it("should update total supply", async () => {
            const instance = await GasContract.deployed();
            const initialSupply = await instance.totalSupply.call();
            const tx = await instance.updateTotalSupply({from : accounts[0]});
            assert.equal(
                initialSupply.toNumber(),
               10000,
                "Minting Failed",
                );            
            });

        
    it("should send a basic payment", async () => {
            const instance = await GasContract.deployed();
            const tx = await instance.transfer(accounts[1],100, {from : accounts[0]});   
            const payments  = await instance.getPayments(accounts[0]);   
            assert.equal(payments[0].paymentType,1);
            assert.equal(payments[0].recipient,accounts[1]);
            assert.equal(payments[0].recipientName,'');
            assert.equal(payments[0].amount,100);
       });   
});