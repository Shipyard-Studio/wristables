const { MerkleTree } = require("merkletreejs");
const { ethers } = require("ethers");
const keccak256 = require("keccak256");

// allocation, startDate, paid, cliff, account
const SCHEMA = "uint256 uint32 uint32 bool bool address".split(" ");

exports.generateMerkleTree = function generateMerkleTree(
  rawData,
  options = {}
) {
  // Split up into two steps for easier debugging
  const dataPacked = rawData.map((row) =>
    ethers.utils.solidityPack(SCHEMA, row)
  );
  if (options.debug) console.log("Packed data:", dataPacked);

  const leaves = dataPacked.map(keccak256);
  if (options.debug)
    console.log(
      "Leaves:",
      leaves.map((buffer) => "0x" + buffer.toString("hex"))
    );

  const tree = new MerkleTree(leaves, keccak256, { sort: true });
  const root = tree.getHexRoot();
  if (options.debug) console.log("Root:", root);
  if (options.debug) console.log("Tree:\n" + tree.toString());

  return {
    root,
    getProof(rawDataRow) {
      const leaf = keccak256(ethers.utils.solidityPack(SCHEMA, rawDataRow));
      return tree.getHexProof(leaf);
    },
  };
};

exports.verifyInTree = function (root, rawDataRow, proof) {
  const leaf = keccak256(ethers.utils.solidityPack(SCHEMA, rawDataRow));
  return MerkleTree.verify(proof, leaf, root, keccak256);
};
