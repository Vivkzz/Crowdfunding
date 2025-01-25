import { ethers, BrowserProvider } from 'ethers';

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS || '0x85C1ff9e22bdd5f76D41eF5856d02979c1504DED';
if (!CONTRACT_ADDRESS) {
    throw new Error('Contract address not found in environment variables');
}

const CONTRACT_ABI = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "creator", "type": "address" }, { "indexed": false, "internalType": "string", "name": "title", "type": "string" }, { "indexed": false, "internalType": "uint256", "name": "targetAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "CampaignCreated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "contributor", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "ContributionsMade", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "creator", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "FundWithdrawn", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "contributor", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Refunded", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "_campaignId", "type": "uint256" }], "name": "Contribute", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "campaignCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "campaigns", "outputs": [{ "internalType": "address", "name": "creator", "type": "address" }, { "internalType": "string", "name": "title", "type": "string" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "string", "name": "description", "type": "string" }, { "internalType": "uint256", "name": "targetAmount", "type": "uint256" }, { "internalType": "uint256", "name": "collectedAmount", "type": "uint256" }, { "internalType": "bool", "name": "isCompleted", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_title", "type": "string" }, { "internalType": "string", "name": "_description", "type": "string" }, { "internalType": "uint256", "name": "_targetAmount", "type": "uint256" }, { "internalType": "uint256", "name": "_deadline", "type": "uint256" }], "name": "createCampaign", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_campaignId", "type": "uint256" }, { "internalType": "address", "name": "_contributor", "type": "address" }], "name": "getContribution", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_campaignId", "type": "uint256" }], "name": "refund", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_campaignId", "type": "uint256" }], "name": "withdrawFunds", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

export const getContract = async () => {
    if (!CONTRACT_ADDRESS) {
        throw new Error('Contract address is not configured');
    }

    if (window.ethereum) {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
        return { contract, provider };
    }
    else {
        alert("MetaMask is not installed!");
        throw new Error("MetaMask is required to interact with the contract.");
    }

}

export const getContractWithSigner = async () => {
    if (window.ethereum) {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        return contract;
    } else {
        alert("MetaMask is not installed!");
        throw new Error("MetaMask is required to interact with the contract.");
    }
};