<?php
require_once('./transaction.php');
require_once('./block.php');

class Blockchain {
    public function __construct() {
        $this->chain = [$this->createGenesisBlock()];
        $this->difficulty = 5;
        $this->pendingTransactions = [];
        $this->miningReward = 10;
    }

    private function createGenesisBlock() {
        return new Block(date('Y-m-d H:i:s'), [], "0");
    }

    public function getLastBlock() {
        return $this->chain[count($this->chain) - 1];
    }

    public function createTransaction($transaction) {
        array_push($this->pendingTransactions, $transaction);
    }

    public function minePendingTransactions($walletAddress) {
        $block = new Block(date('Y-m-d H:i:s'),$this->pendingTransactions);
        $block->mineBlock($this->difficulty);
        array_push($this->chain, $block);
        $this->pendingTransactions = [
            new Transaction(null, $walletAddress, $this->miningReward)
        ];
    }

    public function isValid() {
        for ($i = 1; $i < count($this->chain); $i++) {
            $currentBlock = $this->chain[$i];
            $previousBlock = $this->chain[$i - 1];

            if ($currentBlock->hash !== $currentBlock->calculateHash()) {
                return false;
            }

            if ($currentBlock->previousHash !== $previousBlock->hash) {
                return false;
            }
        }
        return true;
    }
}