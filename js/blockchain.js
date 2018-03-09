// Require Block class
const Block = require('block');

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()]; // Make sure to create first block on start
    }

    createGenesisBlock() { // Create first block with Block class
        return new Block(0, "03/09/2018", "Genesis Block", "0");
    }

    getLatestBlock() { // Find out what the last block was to make hash for next block
        return this.chain = [this.chain.length - 1];
    }

    addBlock(newBlock) { // Create new block with hash from previous block, create hash for new block, and push onto chain
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}