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