// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.12;

import {Test} from "forge-std/Test.sol";
import {Crowdfunding} from "../src/Crowdfunding.sol";

// Feel like this test still can be written in much more better ways

contract TestGaslessCrowdfunding is Test {
    GaslessCrowdfunding crowdfunding;

    function setUp() public {
        crowdfunding = new GaslessCrowdfunding();
    }

    function testCreateCampaign() public {
        string memory title = "Save the animals";
        string memory description = "We are saving all the animals for next generations";
        uint256 targetAmount = 1 ether;
        uint256 deadline = block.timestamp + 10 days;
        address OWNER = makeAddr("owner");
        vm.prank(OWNER);

        crowdfunding.createCampaign(title, description, targetAmount, deadline);

        (
            address creator,
            string memory cc_title,
            uint256 cc_deadline,
            string memory cc_description,
            uint256 cc_targetAmount,
            uint256 cc_collectedAmount,
            bool cc_isCompleted
        ) = crowdfunding.campaigns(1);

        assertEq(creator, OWNER);
        assertEq(cc_title, title);
        assertEq(cc_description, description);
        assertEq(cc_targetAmount, targetAmount);
        assertEq(cc_deadline, deadline);
        assertEq(cc_collectedAmount, 0);
        assertEq(cc_isCompleted, false);
    }

    function testContributionsToCampaign() public {
        string memory title = "Plant Trees";
        string memory description = "Campaign for afforestation";
        uint256 targetAmount = 5 ether;
        uint256 deadline = block.timestamp + 7 days;
        crowdfunding.createCampaign(title, description, targetAmount, deadline);

        address USER = makeAddr("user");
        vm.deal(USER, 1 ether);
        vm.prank(USER);
        crowdfunding.Contribute{value: 0.5 ether}(1);

        (,,,,, uint256 collectedAmount,) = crowdfunding.campaigns(1);
        assertEq(collectedAmount, 0.5 ether);
    }

    function testWithdrawFunds() public {
        string memory title = "Plant Trees";
        string memory description = "Campaign for afforestation";
        uint256 targetAmount = 5 ether;
        uint256 deadline = block.timestamp + 7 days;

        address CREATOR = makeAddr("creator");
        vm.prank(CREATOR);
        crowdfunding.createCampaign(title, description, targetAmount, deadline);

        address USER = makeAddr("user");
        vm.deal(USER, 5 ether);
        vm.prank(USER);
        crowdfunding.Contribute{value: 5 ether}(1);

        vm.prank(CREATOR);
        crowdfunding.withdrawFunds(1);

        (,,,,, uint256 collectedAmount, bool isCompleted) = crowdfunding.campaigns(1);

        assertEq(CREATOR.balance, targetAmount);
        assertEq(collectedAmount, 0);
        assertEq(isCompleted, true);
    }

    function testRefund() public {
        // Setup
        uint256 targetAmount = 5 ether;
        uint256 deadline = block.timestamp + 7 days; // Ensure deadline is in the future
        address creator = makeAddr("creator");
        address contributor = makeAddr("contributor");
        vm.deal(contributor, 5 ether);

        vm.prank(creator);
        crowdfunding.createCampaign("Test Campaign", "Test Description", targetAmount, deadline);

        // Contribute funds
        vm.prank(contributor);
        crowdfunding.Contribute{value: 1 ether}(1);

        // Fast forward to after the deadline
        vm.warp(deadline + 1 seconds); // Warp time beyond the deadline to simulate expiration

        // Refund the contributor
        vm.prank(contributor);
        crowdfunding.refund(1);

        // Assertions
        (,,,,, uint256 collectedAmount,) = crowdfunding.campaigns(1);
        assertEq(collectedAmount, 1 ether); // Campaign balance should not be reduced

        uint256 remainingContribution = crowdfunding.getContribution(1, contributor);
        assertEq(remainingContribution, 0);
    }
}
