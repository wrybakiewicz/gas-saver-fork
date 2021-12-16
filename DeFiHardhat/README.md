# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

## Fork mainnet using ganache-cli

Go to https://infura.io/ and create a new project and select Ethereum as the product. In the project's settings,find the endpoints for mainnet. Copy the https API key. You're going to connect to the Infura node to fork the mainnet.

Run `$ ganache-cli --fork https://mainnet.infura.io/v3/{infura_project_id}`

If local port is not 8545 run `$ ganache-cli --fork https://mainnet.infura.io/v3/{infura_project_id} -p {port_number}`
