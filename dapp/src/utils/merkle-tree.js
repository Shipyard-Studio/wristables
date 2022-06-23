const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const whiteList = require("./wl");

const leaves = whiteList.map((x) => keccak256(x));

const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });

const getProof = (leaf) => {
  return merkleTree.getHexProof(keccak256(leaf))
}

const verify = (proof, leaf) => {
  return merkleTree.verify(proof, keccak256(leaf), merkleTree.getHexRoot())

}

module.exports = {
  getProof,
  verify
}; 
