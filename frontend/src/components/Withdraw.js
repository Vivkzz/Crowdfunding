import React from 'react';

const Withdraw = ({ campaignId, contract, provider, onClose }) => {
    const handleWithdraw = async () => {
        try {
            const signer = await provider.getSigner();
            const tx = await contract.connect(signer).withdrawFunds(campaignId);
            await tx.wait();
            onClose();
        }
        catch (err) {
            alert("Failed to Withdraw Funds");
            console.log("Failed to Withdraw Funds: ", err);
        }
    };

    return (
        <div className="withdraw-modal">
            <h2>Withdraw Funds for {campaignId}</h2>
            <button onClick={handleWithdraw}>Withdraw</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default Withdraw;