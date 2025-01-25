import { ethers, BrowserProvider } from 'ethers';
import React, { useState } from 'react';

const WalletConnect = () => {
    const [account, setAccount] = useState('');
    const [balance, setBalance] = useState('');

    const connectWallet = async () => {

        if (window.ethereum) {
            try {
                const provider = new BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();

                setAccount(address);

                const balanceWei = await provider.getBalance(address);
                setBalance(ethers.formatEther(balanceWei));
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            alert('Please install MetaMask');
        }

    };

    return (
        <div>
            <h2>Wallet Connect</h2>
            <button onClick={connectWallet}>Connect Wallet</button>
            <div>
                <label>Account:</label>
                <span>{account}</span>
            </div>
            <div>
                <label>Balance:</label>
                <span>{balance} ETH</span>
            </div>
        </div>
    );
};
export default WalletConnect;

