// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.12;

contract Crowdfunding {
    struct Campaign {
        address creator;
        string title;
        uint256 deadline;
        string description;
        uint256 targetAmount;
        uint256 collectedAmount;
        bool isCompleted;
        mapping(address => uint256) contributions;
    }

    uint256 public campaignCount;
    mapping(uint256 => Campaign) public campaigns;

    event CampaignCreated(
        uint256 indexed campaignId, address indexed creator, string title, uint256 targetAmount, uint256 deadline
    );

    event ContributionsMade(uint256 indexed campaignId, address indexed contributor, uint256 value);
    event FundWithdrawn(uint256 indexed campaignId, address indexed creator, uint256 value);
    event Refunded(uint256 indexed campaignId, address indexed contributor, uint256 value);

    function createCampaign(string memory _title, string memory _description, uint256 _targetAmount, uint256 _deadline)
        public
    {
        require(_deadline > block.timestamp, "Deadline must be in future");
        require(_targetAmount > 0, "Target must be greater than 0");

        campaignCount++;
        Campaign storage newCampaign = campaigns[campaignCount];
        newCampaign.creator = msg.sender;
        newCampaign.title = _title;
        newCampaign.description = _description;
        newCampaign.targetAmount = _targetAmount;
        newCampaign.deadline = _deadline;

        emit CampaignCreated(campaignCount, msg.sender, _title, _targetAmount, _deadline);
    }

    function Contribute(uint256 _campaignId) public payable {
        Campaign storage campaign = campaigns[_campaignId];
        require(msg.value > 0, "Can't send empty transactions");
        require(block.timestamp < campaign.deadline, "Campaign deadline exceeded");
        require(!campaign.isCompleted, "Campaign reached milestone");

        campaign.contributions[msg.sender] += msg.value;
        campaign.collectedAmount += msg.value;

        emit ContributionsMade(_campaignId, msg.sender, msg.value);
    }

    function withdrawFunds(uint256 _campaignId) public {
        Campaign storage campaign = campaigns[_campaignId];
        require(msg.sender == campaign.creator, "Must be creator of campaign");
        require(campaign.collectedAmount >= campaign.targetAmount, "Campaign has not reached target amount");
        require(!campaign.isCompleted, "Campaign already completed (funds withdrawn)");

        uint256 amount = campaign.collectedAmount;
        campaign.collectedAmount = 0;
        campaign.isCompleted = true;
        (bool success,) = campaign.creator.call{value: amount}("");
        require(success, "Failed to send funds");

        emit FundWithdrawn(_campaignId, campaign.creator, amount);
    }

    function refund(uint256 _campaignId) public {
        Campaign storage campaign = campaigns[_campaignId];
        uint256 userAmount = campaign.contributions[msg.sender];

        require(userAmount > 0, "Did not contribute to campaign");
        require(block.timestamp > campaign.deadline, "Campaign is still running");
        require(campaign.collectedAmount < campaign.targetAmount, "Campaign has reached its target");

        campaign.contributions[msg.sender] = 0;
        (bool success,) = msg.sender.call{value: userAmount}("");
        require(success, "Transaction failed");

        emit Refunded(_campaignId, msg.sender, userAmount);
    }

    function getContribution(uint256 _campaignId, address _contributor) external view returns (uint256) {
        return campaigns[_campaignId].contributions[_contributor];
    }
}
