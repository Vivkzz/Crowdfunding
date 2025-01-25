-include .env

build:; forge build --contracts src

deploy-sepolia:
	forge script script/DeployCrowdfunding.s.sol:DeployCrowdfunding --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(ETHERSCAN_API_KEY) -vvvv --skip-simulation --contracts src
