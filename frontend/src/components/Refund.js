import React from "react";

const Refund = ({ campaignId, contract, provider, onClose }) => {

    const handleRefund = async () => {

        try {
            const signer = await provider.getSigner();
            const tx = await contract.connect(signer).refund(campaignId);
            await tx.wait();
            alert("Refund Successfully");
            onClose();
        } catch (error) {
            alert("Failed to refund");
            console.log("Failed to refund: ", error);
        }
    };

    return (
        <div className="refund-modal">
            <h2>Refund for {campaignId}</h2>
            <button onClick={handleRefund}>Refund</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default Refund;