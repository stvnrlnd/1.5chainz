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
    
    public function mineBlock($difficulty) {
        while(substr($this->hash, 0, $difficulty) !== str_repeat("0", $difficulty)) {
            $this->nonce++;
            $this->hash = $this->calculateHash();
        }
        echo "Block Mined: ".$this->hash."\n";
    }
}