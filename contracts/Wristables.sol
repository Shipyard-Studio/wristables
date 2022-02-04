//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol"; // TODO: Needs to be updated to use initializer instead of constructor
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

contract Wristables is ERC721Upgradeable, OwnableUpgradeable, PaymentSplitterUpgradeable  {
    
    //TODO: MERKLE PROOF STATE / FUNCTIONS

    using AddressUpgradeable for address;
    using StringsUpgradeable for uint256;
    using CountersUpgradeable for CountersUpgradeable.Counter;


    DutchAuction public dutchAuction; 
    CountersUpgradeable.Counter private _tokenSupply;
    string private _baseTokenURI;
    uint256 public availableSupply; // max number of tokens currently available for mint
    uint256 public constant MAX_SUPPLY = 9999;
    uint256 private mintPrice; // price of each token in the `mint` functions
    bool private toggleAuction; // true = dutch auction active, false = mint for flat price active
    bool private saleActive; // if false, mint functions will revert
    bytes4 private constant _INTERFACE_ID_ERC2981 = 0x2a55205a;


    modifier SaleActive () {
        require(saleActive, "sale paused");
        _;
    }

    struct DutchAuction {
        uint256 startingPrice;
        uint256 floorPrice;
        uint256 startAt;
        uint256 expiresAt;
        uint256 priceDeductionRate;
    }

    event NewDutchAuction(
        uint256 startingPrice,
        uint256 floorPrice,
        uint256 startAt,
        uint256 expiresAt,
        uint256 priceDeductionRate
    );

    /// @dev `maxBatchSize` refers to how much a minter can mint at a time.
    /// @dev See `PaymentSplitter.sol` for documentation on `payees` and `shares_`.
    function initialize( 
        address[] memory payees, 
        uint256[] memory shares_
    ) public initializer {
        // TODO: USE AS INITIALIZERS:
        __ERC721_init("Wristables", "WRST");
        __PaymentSplitter_init( payees, shares_);
        __Ownable_init();

        supportsInterface(_INTERFACE_ID_ERC2981);
    }

    /// @dev sends the next token to the `to` address for free + gas
    function airdrop (address to, uint256 quantity) public onlyOwner {
        uint mintIndex = _tokenSupply.current();
        require(mintIndex + quantity <= availableSupply, "exceeds available supply");
        for (uint256 i = 0; i < quantity; i++) {
            _safeMint(to, mintIndex + i);
            _tokenSupply.increment();
        }
    }

    /// @dev sends one token to each address in the `to` array
    function batchAirdrop (address[] memory to) public onlyOwner {
        uint mintIndex = _tokenSupply.current();
        require(mintIndex + to.length <= availableSupply, "exceeds token supply");
        for (uint256 i = 0; i < to.length; i++) {
            _safeMint(to[i], mintIndex + i);
            _tokenSupply.increment();
        }
    }

    /// @dev dutch auction mint
    function mintAuction () external payable SaleActive {
        require(toggleAuction, "use `mint`");
        require(block.timestamp > dutchAuction.startAt , "auction has not started yet" );
        require(block.timestamp < dutchAuction.expiresAt, "auction expired");

        uint timeElapsed = block.timestamp - dutchAuction.startAt;
        uint deduction = dutchAuction.priceDeductionRate * (timeElapsed / 5 minutes); // calculate the number of 5 minute intervals & calculates the deduction from the starting price accordingly
        uint price = dutchAuction.startingPrice - deduction < dutchAuction.floorPrice ? dutchAuction.floorPrice : dutchAuction.startingPrice - deduction; // calculates the current price + does not allow the price to drop below the floor

        require(msg.value >= price, "insufficient funds");

        uint mintIndex = _tokenSupply.current();
        require(mintIndex <= availableSupply, "exceeds token supply");
        _safeMint(msg.sender, mintIndex);
        _tokenSupply.increment();
    }

    function mint () external payable SaleActive {
        require(!toggleAuction, "use `mintAuction`");
        require(msg.value == mintPrice, "incorrect ether sent");
        uint mintIndex = _tokenSupply.current();
        require(mintIndex <= availableSupply, "exceeds token supply");
        _safeMint(msg.sender, mintIndex);
        _tokenSupply.increment();
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
    ) {
        return (
            address(this), 
            _salePrice * 6 / 100 // 6% royalty
        );
    }

    /// @dev sets dutch auction struct
    function setDutchAuction ( 
        uint256 _startingPrice,
        uint256 _floorPrice,
        uint256 _startAt,
        uint256 _expiresAt,
        uint256 _priceDeductionRate
        ) external onlyOwner {
        dutchAuction = DutchAuction(_startingPrice, _floorPrice, _startAt, _expiresAt, _priceDeductionRate);
        emit NewDutchAuction(_startingPrice, _floorPrice, _startAt, _expiresAt, _priceDeductionRate);
    }

    /// @dev set available token supply
    function setAvailableSupply (uint256 availableSupplyIncrease) external onlyOwner {
        require(availableSupply + availableSupplyIncrease <= MAX_SUPPLY, "cannot be greater than 9999");
        availableSupply += availableSupplyIncrease;
    }

    /// @dev set price of each token in the `mint` function
    function setMintPrice (uint256 _mintPrice) external onlyOwner {
        mintPrice = _mintPrice;
    }

    /// @dev set price of each token in the `mint` function
    function setToggleAuction (bool _toggleAuction) external onlyOwner {
        toggleAuction = _toggleAuction;
    }

    /// @dev set price of each token in the `mint` function
    function setSaleActive (bool _saleActive) external onlyOwner {
        saleActive = _saleActive;
    }

    /// @dev allows owner to reset base uri when updating metadata
    function setBaseURI(string memory baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }

    /// @dev override token uri to append .json to string
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "URI query for nonexistent token");
        string memory json = ".json";
        string memory baseURI = _baseTokenURI;
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(), json)) : "";
    }

}