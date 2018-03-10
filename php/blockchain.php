<?php
require_once('./block.php');

class Blockchain {
    public function __construct() {
        $this->chain = [$this->createGenesisBlock()];
        $this->difficulty = 5;
    }

    
}