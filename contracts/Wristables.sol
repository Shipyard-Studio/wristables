//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol"; // TODO: Remove this
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/finance/PaymentSplitterUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";


/// @dev spec:

/// ERC721(a) contract with 555 unique tokens. 
///     (first drop is 555, total is 9999, will be released in drops of 555 (so ~18 total drops))

/// Dutch Auction style mint. 
///     Starts at 3 ETH per token dropping by 0.5 ETH every 5 minutes until sell-out (base price of 0.25ETH).

/// Payout primary sales to addresses based on pre-determined %.
/// Payout royalties to addresses based on pre-determined %.

/// ERC2981 compliant.

/// Airdrop function that only the owner can call.

contract Wristables is ERC721Upgradeable, OwnableUpgradeable, PaymentSplitterUpgradeable, UUPSUpgradeable  {
    
    //TODO: MERKLE PROOF STATE / FUNCTIONS

    using AddressUpgradeable for address;
    using StringsUpgradeable for uint256;
    using CountersUpgradeable for CountersUpgradeable.Counter;

    DutchAuction public dutchAuction; 
    CountersUpgradeable.Counter private _tokenSupply;
    string private _baseTokenURI;
    uint public MAX_SUPPLY;

    /// @dev `maxBatchSize` refers to how much a minter can mint at a time.
    /// @dev See `PaymentSplitter.sol` for documentation on `payees` and `shares_`.
    function initialize(
        uint256 maxBatchSize_, 
        address[] memory payees, 
        uint256[] memory shares_
    ) public initializer {
        // console.log(payees[0], shares_[0]);
        __Ownable_init();
         __ERC721_init("Wristables", "WRST");
        __PaymentSplitter_init( payees, shares_);
        
        // initial values must be set in initialize(), so proxy can set them too.
        MAX_SUPPLY = 9999;

        supportsInterface(0x2a55205a); // required for ERC2981 (royalty) standard
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {
        // 
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

    /// @dev override token uri to append .json to string
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        string memory json = ".json";
        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(), json)) : "";
    }

}

contract WristablesV2 is Wristables {
    function version() pure public returns (string memory) {
        return "V2";
    }
}
