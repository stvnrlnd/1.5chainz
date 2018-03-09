const SHA256 = require('sha256');

class Block {
    /*
     * Initialize the properties of the block. 
     *
     *   Each block is given an index that tells 
     *   us at what position the block sits on the chain. 
     *   We also include a timestamp, some data 
     *   to store in our block, and finally the 
     *   hash of the previous block.
     */
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()]; // Make sure to create first block on start
    }

    createGenesisBlock() { // Create first block with Block class
        return new Block(0, "09/03/2018", "Genesis Block", "0");
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

// Create test chain
let fittyCoin = new Blockchain;

console.log("Mining Block 1 ... \n");
fittyCoin.addBlock(new Block(1, "09/03/2018", {total: 3}));

console.log("Mining Block 2 ... \n");
fittyCoin.addBlock(new Block(2, "09/03/2018", {total: 8}));

// Test if chain is valid
console.log("Valid chain? " + fittyCoin.isChainValid());