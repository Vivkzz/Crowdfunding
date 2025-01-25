// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.12;

import {Script} from "forge-std/Script.sol";
import {Crowdfunding} from "../src/Crowdfunding.sol";

contract DeployCrowdfunding is Script {
    function run() external returns (Crowdfunding) {
        vm.startBroadcast();

        Crowdfunding crowdfunding = new Crowdfunding();
        vm.stopBroadcast();
        return crowdfunding;
    }
}

// 0x85C1ff9e22bdd5f76D41eF5856d02979c1504DED
