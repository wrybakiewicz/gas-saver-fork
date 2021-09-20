const truffleAssert = require('truffle-assertions');
const GasContract = artifacts.require("GasContract");
contract("Gas", accounts => {
 
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
            const finalSupply = await instance.totalSupply.call();
            assert.equal(finalSupply.toNumber(), initialSupply.toNumber() + 1000,
                "Update supply failed",
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

       it("updates a payment", async () => {
        const instance = await GasContract.deployed();
        const tx = await instance.transfer(accounts[2],13, {from : accounts[1]});   
        let payments  = await instance.getPayments(accounts[1]); 
        const lastPaymnet = payments.length -1;
        assert.equal(payments[lastPaymnet].paymentType,1);
        assert.equal(payments[lastPaymnet].recipient,accounts[2]);
        assert.equal(payments[lastPaymnet].recipientName,'');
        assert.equal(payments[lastPaymnet].amount,13);
        const paymentID = payments[lastPaymnet].paymentID;

       // now update the payment
       const tx2 = await  instance.updatePayment(accounts[1], paymentID, 19, {from : accounts[0]});  
       payments  = await instance.getPayments(accounts[1]); 
       assert.equal(payments[lastPaymnet].paymentType,1);
       assert.equal(payments[lastPaymnet].recipient,accounts[2]);
       assert.equal(payments[lastPaymnet].recipientName,'');
       assert.equal(payments[lastPaymnet].amount,19);


  });   


       it("Fails to update payment - non admin", async () => {
         const instance = await GasContract.deployed();
        await truffleAssert.reverts(instance.updatePayment(accounts[1], 1, 13, {from : accounts[8]}),"Caller not admin");  


   });   

       it("GAS TEST -> => ***", async () => {
        const instance = await GasContract.deployed();
        const initialSupply = await instance.totalSupply.call();
        const tx = await instance.updateTotalSupply({from : accounts[0]});
        const finalSupply = await instance.totalSupply.call();
        assert.equal(finalSupply.toNumber(), initialSupply.toNumber() + 1000,"Update supply failed",);  

        let adminFlag;
           adminFlag = await instance.checkForAdmin.call(accounts[8]);
           assert.equal(
               adminFlag,
           false,
               "Incorrect admin");    

        const tx2 = await instance.transfer(accounts[2],3, {from : accounts[1]});   
        let payments  = await instance.getPayments(accounts[1]); 
        const lastPaymnet = payments.length -1;
        assert.equal(payments[lastPaymnet].paymentType,1);
        assert.equal(payments[lastPaymnet].recipient,accounts[2]);
        assert.equal(payments[lastPaymnet].recipientName,'');
        assert.equal(payments[lastPaymnet].amount,3);
        const paymentID = payments[lastPaymnet].paymentID;


       const tx3 = await  instance.updatePayment(accounts[1], paymentID, 14, {from : accounts[0]});  
       payments  = await instance.getPayments(accounts[1]); 
       assert.equal(payments[lastPaymnet].paymentType,1);
       assert.equal(payments[lastPaymnet].recipient,accounts[2]);
       assert.equal(payments[lastPaymnet].recipientName,'');
       assert.equal(payments[lastPaymnet].amount,14);


   });   

});