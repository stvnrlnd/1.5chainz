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


}