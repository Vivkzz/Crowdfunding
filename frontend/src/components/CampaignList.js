import React, { useEffect, useState } from 'react';
import { getContractWithSigner } from './ContractUtils';
import { formatEther, parseEther } from 'ethers';

const CampaignList = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [contribution, setContribution] = useState('');

    const handleContribute = async (campaignId) => {
        try {
            const contract = await getContractWithSigner();
            const tx = await contract.Contribute(campaignId, {
                value: parseEther(contribution)
            });
            await tx.wait();
            alert('Contribution successful!');
            // Refresh campaign data
            fetchCampaigns();
        } catch (error) {
            console.error('Error contributing:', error);
            alert('Error contributing: ' + error.message);
        }
    };

    const handleWithdraw = async (campaignId) => {
        try {
            const contract = await getContractWithSigner();
            const tx = await contract.withdrawFunds(campaignId);
            await tx.wait();
            alert('Withdrawal successful!');
            fetchCampaigns();
        } catch (error) {
            console.error('Error withdrawing:', error);
            alert('Error withdrawing: ' + error.message);
        }
    };

    const handleRefund = async (campaignId) => {
        try {
            const contract = await getContractWithSigner();
            const tx = await contract.refund(campaignId);
            await tx.wait();
            alert('Refund successful!');
            fetchCampaigns();
        } catch (error) {
            console.error('Error refunding:', error);
            alert('Error refunding: ' + error.message);
        }
    };

    const fetchCampaigns = async () => {
        try {
            const contract = await getContractWithSigner();
            const campaignCount = await contract.campaignCount();

            const campaignData = [];
            for (let i = 1; i <= campaignCount; i++) {
                const campaign = await contract.campaigns(i);
                campaignData.push({
                    id: i,
                    creator: campaign.creator,
                    title: campaign.title,
                    description: campaign.description,
                    targetAmount: formatEther(campaign.targetAmount),
                    collectedAmount: formatEther(campaign.collectedAmount),
                    deadline: new Date(Number(campaign.deadline) * 1000).toLocaleString(),
                    isCompleted: campaign.isCompleted,
                });
            }

            setCampaigns(campaignData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching campaigns:", error.message);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, []);

    if (loading) return <div>Loading campaigns...</div>;

    return (
        <div>
            <h1>All Campaigns</h1>
            {campaigns.map((campaign) => (
                <div key={campaign.id} className="campaign-card">
                    <h2>{campaign.title}</h2>
                    <p>{campaign.description}</p>
                    <p>Target: {campaign.targetAmount} ETH</p>
                    <p>Collected: {campaign.collectedAmount} ETH</p>
                    <p>Deadline: {campaign.deadline}</p>
                    <p>Status: {campaign.isCompleted ? "Completed" : "Ongoing"}</p>

                    {/* Contribution Input and Button */}
                    <div>
                        <input
                            type="number"
                            step="0.01"
                            value={contribution}
                            onChange={(e) => setContribution(e.target.value)}
                            placeholder="Amount in ETH"
                        />
                        <button onClick={() => handleContribute(campaign.id)}>
                            Contribute
                        </button>
                    </div>

                    {/* Withdraw Button - Only visible to campaign creator */}
                    <button
                        onClick={() => handleWithdraw(campaign.id)}
                        disabled={campaign.isCompleted}
                    >
                        Withdraw Funds
                    </button>

                    {/* Refund Button - Available after deadline if target not met */}
                    <button
                        onClick={() => handleRefund(campaign.id)}
                        disabled={campaign.isCompleted}
                    >
                        Request Refund
                    </button>
                </div>
            ))}
        </div>
    );
};

export default CampaignList;
