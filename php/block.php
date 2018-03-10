<?php
class Block {
    public $nonce;
    public function __construct($timestamp, $transactions, $previousHash = null) {
        $this->timestamp = $timestamp;
        $this->transactions = $transactions;
        $this->previousHash = $previousHash;
        $this->hash = $this->calculateHash();
        $this->nonce = 0;
    }

    public function calculateHash() {
        return hash("sha256", $this->previousHash.$this->timestamp.((string)$this->transactions).$this->nonce;
    }
}