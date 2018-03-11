<?php
class Transaction {
    public function __construct($fromAddress, $toAddress, $amount) {
        $this->fromAddress = $fromAddress;
        $this->toAddress = $toAddress;
        $this->amount = $amount;
    }
}