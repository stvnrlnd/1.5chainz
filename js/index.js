const SHA256 = require('sha256');

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block {
    /* Initialize the properties of the block. 
     *
     *   Each block includes a timestamp, some transaction data 
     *   to store in our block, and the 
     *   hash of the previous block. We also add a 
     *   nonce value that will be incremented when 
     *   a good hash is found.
     */
    constructor(timestamp, transactions, previousHash = '') {
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(
            this.previousHash 
            + this.timestamp 
            + JSON.stringify(this.transactions)
            + this.nonce
        ).toString();
    }

    mineBlock(difficulty) { // Decrease spam blocks being created by adding difficulty which should increase time spent to create new block
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block Mined: " + this.hash);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()]; // Make sure to create first block on start
        this.difficulty = 5; // Will be used to add 5 zeros to beginning of new block hash

        // Array to store pending transactions that were added between block creation
        this.pendingTransactions = [];

        // Amount of coins to give someone when new block is mined
        this.miningReward = 10;
    }

    createGenesisBlock() { // Create first block with Block class
        return new Block(0, "09/03/2018", "Genesis Block", "0");
    }

    getLatestBlock() { // Find out what the last block was to make hash for next block
        return this.chain = [this.chain.length - 1];
    }

    // addBlock(newBlock) { // Create new block with hash from previous block, create hash for new block, and push onto chain
    //     newBlock.previousHash = this.getLatestBlock().hash;
    //     newBlock.mineBlock(this.difficulty);
    //     this.chain.push(newBlock);
    // }

    createTransaction(transaction) {
        // Add validation

        // Push new transaction onto the pending transactions array
        this.pendingTransactions.push(transaction);
    }

    minePendingTransactions(walletAddress) {
        // Create new block with pending transactions
        let block = new Block(Date.now(), this.pendingTransactions);
        // Mine that bad boy
        block.mineBlock(this.difficulty);

        // Add the newly mined block to the chain
        this.chain.push(block);

        // Reset the pending transaction list and send treats
        this.pendingTransactions = [
            new Transaction(null, walletAddress, this.miningReward)
        ]
    }

    getWalletBalance(address) {
        let balance = 0; // Yikes, no coins in the my wallet

        for (const block of this.chain) { // Loop over each block in chain
            for (const trans of block.transactions) { // Loop over each transaction in block
                if (trans.fromAddress === address) {
                    // Moving coins out of wallet
                    balance -= trans.amount;
                }
                if (trans.toAddress === address) {
                    // Moving coins into wallet
                    balance += trans.amount;
                }
            }
        }
        return balance;
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
let fittyCoin = new Blockchain();

console.log("Dogfooding transactions ... \n");
fittyCoin.createTransaction(new Transaction("Wallet 1", "Wallet 2", 10));
fittyCoin.createTransaction(new Transaction("Wallet 2", "Wallet 1", 20));

// Start miner
console.log("Mining the pending transactions... \n");
fittyCoin.minePendingTransactions("My Wallet");

console.log("I have " + fittyCoin.getWalletBalance("My Wallet") + " in my wallet.\n");

// Start miner again
console.log("Mining the pending transactions... \n");
fittyCoin.minePendingTransactions("My Wallet");

console.log("Now I have " + fittyCoin.getWalletBalance("My Wallet") + " in my wallet.\n");






// Test if chain is valid
console.log("Valid chain? " + fittyCoin.isChainValid());

// Trying to change a block after mined
console.log("Modify a block...");
fittyCoin.chain[1].transactions = {total: 20};

// Test if chain is valid after block change -- should return false
console.log("Valid chain? " + fittyCoin.isChainValid());