const { generateMerkleTree, verifyInTree } = require("./merkle");

const dataRaw = [
  ["0xbeefbeefbeefbeefbeefbeefbeefbeefbeefbeef"],
  ["0xfeedfeedfeedfeedfeedfeedfeedfeedfeedfeed"],
  ["0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef"],
  ["0x7Eb696df980734DD592EBDd9dfC39F189aDc5456"],
];

const { root, getProof } = generateMerkleTree(dataRaw, { debug: true });

const proof = getProof(dataRaw[1]);

console.log("Row in tree?", verifyInTree(root, dataRaw[1], proof));
