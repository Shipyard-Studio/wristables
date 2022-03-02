const { MerkleTree } = require("merkletreejs");

const keccak256 = require("keccak256");

let tree

exports.generateMerkleTree = function generateMerkleTree(
  rawData,
  options = {}
) {
  const leaves = rawData.map((x) => keccak256(x));
  if (options.debug)
    console.log(
      "Leaves:",
      leaves.map((buffer) => "0x" + buffer.toString("hex"))
    );

  tree = new MerkleTree(leaves, keccak256);
  const root = tree.getHexRoot();
  if (options.debug) console.log("Root:", root);
  if (options.debug) console.log("Tree:\n" + tree.toString());

  return {
    root,
    getProof(rawDataRow) {
      const leaf = keccak256(rawDataRow);
      const proof = tree.getProof(leaf);
      return proof;
    },
  };
};

exports.verifyInTree = function (root, rawDataRow, proof) {
  const leaf = keccak256(rawDataRow);
  console.log(rawDataRow, leaf);
  return tree.verify(proof, leaf, root);
};
