import React, { useState } from "react";

const Contribute = ({ campaignId, contract, provider, onClose }) => {
    const [amount, setAmount] = useState("");

    const handleContribute = async () => {
        try {
            const contributionAmount = parseFloat(amount);
            if (isNaN(contributionAmount) || contributionAmount <= 0) {
                alert("Enter a valid amount greater than 0");
                return;
            }

            const signer = provider.getSigner();
            const tx = await contract.connect(signer).Contribute(campaignId, {
                value: ethers.utils.parseEther(amount),
            });
            await tx.wait();
            alert("Contribution successful!");
            onClose(); // Close the modal/form
        } catch (error) {
            console.error("Error contributing:", error);
            alert("Contribution failed. Check the console for details.");
        }
    };

    return (
        <div className="contribute-modal">
            <h3>Contribute to Campaign {campaignId}</h3>
            <input
                type="number"
                placeholder="Amount in ETH"
                value={amount || ""} // Ensure controlled input
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleContribute}>Contribute</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default Contribute;
