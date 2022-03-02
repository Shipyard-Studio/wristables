//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/finance/PaymentSplitterUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

contract Wristables is ERC721Upgradeable, OwnableUpgradeable, PaymentSplitterUpgradeable, UUPSUpgradeable, ReentrancyGuardUpgradeable  {
    
    //TODO: MERKLE PROOF STATE / FUNCTIONS

    using AddressUpgradeable for address;
    using StringsUpgradeable for uint256;
    using CountersUpgradeable for CountersUpgradeable.Counter;

    mapping(address => bool[10]) public claimedWL; // stores addresses that have claimed whitelisted tokens, set to fixed array because a dynamic array inside of a mapping does not fill with falsey values by default. There won't be more than 10 drops so this is safe for us to assume.

    DutchAuction public dutchAuction; 
    CountersUpgradeable.Counter private _tokenSupply;
    string private _baseTokenURI;
    uint256 public availableSupply; // max number of tokens currently available for mint
    uint256 public MAX_SUPPLY;
    uint256 private mintPrice; // price of each token in the `mint` functions
    bool private toggleAuction; // true = dutch auction active, false = mint for flat price active
    bool private saleActive; // if false, mint functions will revert
    bytes32 public root; // merkle root set in initializer
    uint32 public indexWL; // index for for drop #, allows us to check claimedWL for the correct bool



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
        uint256[] memory shares_,
        bytes32 _root
    ) public initializer {
        // console.log(payees[0], shares_[0]);
        __Ownable_init();
         __ERC721_init("Wristables", "WRST");
        __PaymentSplitter_init( payees, shares_);
        __ReentrancyGuard_init();
        
        // initial values must be set in initialize(), so proxy can set them too.
        MAX_SUPPLY = 9999;
        root = _root;

        supportsInterface(0x2a55205a); // required for ERC2981 (royalty) standard
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {
        // 
    }

    /// @dev sends the next token to the `to` address for free + gas
    function airdrop (address to, uint256 quantity) public payable onlyOwner nonReentrant {
        uint mintIndex = _tokenSupply.current();
        require(mintIndex + quantity <= availableSupply, "exceeds available supply");
        for (uint256 i = 0; i < quantity; i++) {
            _safeMint(to, mintIndex + i);
            _tokenSupply.increment();
        }
    }

    /// @dev sends one token to each address in the `to` array
    function batchAirdrop (address[] memory to) public payable onlyOwner nonReentrant {
        uint mintIndex = _tokenSupply.current();
        require(mintIndex + to.length <= availableSupply, "exceeds token supply");
        for (uint256 i = 0; i < to.length; i++) {
            _safeMint(to[i], mintIndex + i);
            _tokenSupply.increment();
        }
    }

    /// @dev dutch auction mint
    function mintAuction () external payable SaleActive nonReentrant {
        require(toggleAuction, "use `mint`");
        require(block.timestamp > dutchAuction.startAt , "auction has not started yet" );
        require(block.timestamp < dutchAuction.expiresAt, "auction expired");

        uint timeElapsed = block.timestamp - dutchAuction.startAt;
        uint deduction = dutchAuction.priceDeductionRate * (timeElapsed / 5 minutes); // calculate the number of 5 minute intervals & calculates the deduction from the starting price accordingly
        uint price = deduction > (dutchAuction.startingPrice - dutchAuction.floorPrice) ? dutchAuction.floorPrice : dutchAuction.startingPrice - deduction;

        require(msg.value >= price, "insufficient funds");

        issueToken(msg.sender);
    }

    /// @dev allows users to mint for a flat fee (not a dutch auction)
    function mint () external payable SaleActive nonReentrant {
        require(!toggleAuction, "use `mintAuction`");
        require(msg.value == mintPrice, "incorrect ether sent");

        issueToken(msg.sender);
    }

    function redeem(bytes32[] calldata proof) external payable {
        require(_verify(_leaf(msg.sender), proof), "Invalid merkle proof");
        require(!toggleAuction, "use `mintAuction`");
        require(msg.value == mintPrice, "incorrect ether sent");
        require(!claimedWL[msg.sender][indexWL], "claimed");
        claimedWL[msg.sender][indexWL] = true;
        issueToken(msg.sender);
    }    

    function issueToken (address recipient) private {
        uint mintIndex = _tokenSupply.current();
        require(mintIndex <= availableSupply, "exceeds token supply");
        _safeMint(recipient, mintIndex);
        _tokenSupply.increment();
    }

    /// @dev ERC2981
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
        ) external payable onlyOwner {
        dutchAuction = DutchAuction(_startingPrice, _floorPrice, _startAt, _expiresAt, _priceDeductionRate);
        emit NewDutchAuction(_startingPrice, _floorPrice, _startAt, _expiresAt, _priceDeductionRate);
    }

    /// @dev set available token supply
    function setAvailableSupply (uint256 availableSupplyIncrease) external payable onlyOwner {
        require(availableSupply + availableSupplyIncrease <= MAX_SUPPLY, "cannot be greater than 9999");
        availableSupply += availableSupplyIncrease;
    }

    /// @dev set price of each token in the `mint` function
    function setMintPrice (uint256 _mintPrice) external payable onlyOwner {
        mintPrice = _mintPrice;
    }

    /// @dev toggles the mode of sale between flat price and dutch auction. false = flat, true = dutch auction
    function setToggleAuction (bool _toggleAuction) external payable onlyOwner {
        toggleAuction = _toggleAuction;
    }

    /// @dev sets the public sale to active. Both mint functions will revert if this is false.
    function setSaleActive (bool _saleActive) external payable onlyOwner {
        saleActive = _saleActive;
    }

    /// @dev allows owner to reset base uri when updating metadata
    function setBaseURI(string memory baseURI) external payable onlyOwner {
        _baseTokenURI = baseURI;
    }

    /// @dev allows owner to reset base uri when updating metadata
    function setIndexWL (uint32 _indexWL) external payable onlyOwner {
        require(_indexWL > indexWL, "less than current index");
        indexWL = _indexWL;
    }

    function getClaimedWL (address account) external view returns (bool[10] memory) {
        return claimedWL[account];
    }

    /// @dev override token uri to append .json to string
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "URI query for nonexistent token");
        string memory json = ".json";
        string memory baseURI = _baseTokenURI;
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(), json)) : "";
    }

    function _leaf(address account) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(account));
    }

    function _verify(bytes32 leaf, bytes32[] memory proof) internal view returns (bool) {
        return MerkleProofUpgradeable.verify(proof, root, leaf);
    }

}

contract WristablesV2 is Wristables {
    function version() pure public returns (string memory) {
        return "V2";
    }
}
