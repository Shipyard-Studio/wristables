//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "erc721a/contracts/ERC721A.sol"; // TODO: Needs to be updated to use initializer instead of constructor
import "@openzeppelin/contracts-upgradeable/finance/PaymentSplitter.sol";
import "@openzeppelin/contracts-upgradeable/access/Ownable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";


    /// @dev spec:

    /// ERC721(a) contract with 555 unique tokens. 
    ///     (first drop is 555, total is 9999, will be released in drops of 555 (so ~18 total drops))

    /// Dutch Auction style mint. 
    ///     Starts at 3 ETH per token dropping by 0.5 ETH every 5 minutes until sell-out (base price of 0.25ETH).
    
    /// Payout primary sales to addresses based on pre-determined %.
    /// Payout royalties to addresses based on pre-determined %.
    
    /// ERC2981 compliant.
    
    /// Airdrop function that only the owner can call.
    /// Whitelist functionality (merkle tree?)
    ///     We don't know addresses of whitelisted users for future drops so the whitelist should be able to be manipulated at any given time.


contract Wristables is ERC721A, PaymentSplitter, Ownable, Initializable {

    bytes4 private constant _INTERFACE_ID_ERC2981 = 0x2a55205a;

    /// @dev `maxBatchSize` refers to how much a minter can mint at a time.
    /// @dev See `PaymentSplitter.sol` for documentation on `payees` and `shares_`.
    function initialize(
        uint256 maxBatchSize_, 
        address[] memory payees, 
        uint256[] memory shares_
    ) public initializer {
        // TODO: USE AS INITIALIZERS:
        // ERC721A("Wristables", "WRST", maxBatchSize_) 
        // PaymentSplitter( payees, shares_) 

        supportsInterface(_INTERFACE_ID_ERC2981);
    }

    /// @dev sends the next token to the `to` address for free + gas
    function airdrop (address to, uint256 quantity) onlyOwner {

    }

    /// @notice Called with the sale price to determine how much royalty
    //          is owed and to whom.
    /// @param _tokenId - the NFT asset queried for royalty information
    /// @param _salePrice - the sale price of the NFT asset specified by _tokenId
    /// @return receiver - address of who should be sent the royalty payment
    /// @return royaltyAmount - the royalty payment amount for _salePrice
    function royaltyInfo(
        uint256 _tokenId,
        uint256 _salePrice
    ) external view returns (
        address receiver,
        uint256 royaltyAmount
    );
}



    /// @dev override token uri to append .json to string
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        string memory json = ".json";
        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(), json)) : "";
    }

}
