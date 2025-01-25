## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```

# Crowdfunding DApp

## Setup
1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your values
3. Install dependencies:
   ```bash
   # Backend
   cd crowdfunding
   npm install
   
   # Frontend
   cd frontend
   npm install
   ```

## Environment Variables Required
- SEPOLIA_RPC_URL: Your Alchemy/Infura endpoint
- ETHERSCAN_API_KEY: Your Etherscan API key
- PRIVATE_KEY: Your wallet private key (never commit this!)
- REACT_APP_CONTRACT_ADDRESS: Deployed contract address

## Development
1. Start local hardhat node: `npx hardhat node`
2. Deploy contracts: `make deploy-sepolia`
3. Start frontend: `cd frontend && npm start`

## Security Checklist
- [ ] Remove private keys from source control
- [ ] Add .env to .gitignore
- [ ] Remove hardcoded API keys
- [ ] Remove hardcoded contract addresses
