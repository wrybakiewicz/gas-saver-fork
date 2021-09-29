const DeFi = artifacts.require("DeFi");
const DAIMock = artifacts.require("DAIMock"); 

const DAIAddress = "0x6b175474e89094c44da98b954eedeac495271d0f"
const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"

const UNISWAP_DAIUSDC_LP_ADDRESS = "0xae461ca67b15dc8dc81ce7615e0320da1a9ab8d5"
const COINBASE = "0x503828976D22510aad0201ac7EC88293211D23Da"

//const routerInterface = artifacts.require("IUniswapV2Router")
//const uniswapFactoryInterface = artifacts.require("uniswapFactory")
const uniswapRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
const uniswapFactory = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"

// await DAI_TokenContract.transfer(owner, BigInt(INITIAL_AMOUNT), {
//     from: BINANCE,
//     gasPrice: 0,
//   })


contract("DeFi", accounts => {
let owner;
const INITIAL_AMOUNT = 9999;
    before(async function () {
        accounts = await web3.eth.getAccounts();
        owner = accounts[0];
        console.log("owner account is " , owner);

        let DAI_TokenContract = await DAIMock.at(DAIAddress);
        const symbol = await DAI_TokenContract.symbol();
        console.log(symbol);
        await DAI_TokenContract.transfer(owner, BigInt(INITIAL_AMOUNT), {
            from: COINBASE,
            gasPrice: 0,
          })
      

    });

    // it("should run test function", async () => {
    //     const instance = await DeFi.deployed();
    //     //console.log(instance);
    //     const result = await instance.contractState();
    //     assert.equal("created", result); 
    // });
    it("should check transfer succeeded", async () => {
        let DAI_TokenContract = await DAIMock.at(DAIAddress);
        const result = await DAI_TokenContract.balanceOf(owner);
        assert.equal(INITIAL_AMOUNT, result.toNumber()); 
    });

 
});
