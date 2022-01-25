//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Wristables is ERC721A, PaymentSplitter, Ownable {

    constructor (uint256 maxBatchSize_, address[] memory payees, uint256[] memory shares_) 
    ERC721A("Wristables", "WRISTS", maxBatchSize_) 
    PaymentSplitter( payees, shares_) {

    }

}
