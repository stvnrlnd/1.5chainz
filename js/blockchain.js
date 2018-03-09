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

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) { 
                // Check that the hash for the current block matches the calc'd hash for the current block
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) { 
                // Check that the hash for the previous block matches the recorded hash for the previous block
                return false;
            }
        }
        return true;
    }
}