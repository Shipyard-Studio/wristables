const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const whiteList = require("./wl");

const leaves = whiteList.map((x) => keccak256(x));
const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });

module.exports = {
  merkleTree,
};
