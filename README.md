## Wristables NFT

ERC721 contract with 9999 unique tokens. 
    (first drop is 999, total supply is 9999, the rest will be released in increments of 999 or more).
    Contract is designed to use the counters library instead of ERC721Enumerable for gas savings

Contract is upgradeable using the minimal proxy pattern.
    See tests for examples in code

Dutch Auction style mint. 
    Starts at x ETH per token, dropping by y ETH every 5 minutes until sell-out (base price of z ETH).

Also supports minting for a flat fee. These two minting styles will be toggled on and off and could never run simultaneously.

Whitelist uses a merkle drop to reduce gas costs. See test for this flow.

Payout primary sales to addresses based on pre-determined %.
Payout royalties to addresses based on pre-determined %.

ERC2981 compliant (royalty standard).

Airdrop function that only the owner can call.

Metadata will be stored on IPFS and will be set through the `setBaseURI` function

all of the normal hardhat utilities are available in this repository


authors: dd0sxx, Kyle, & Diana