<?php
class Transaction {
    public function __contructor($fromAddress, $toAddress, $amount) {
        $this->fromAddress = $fromAddress;
        $this->toAddress = $toAddress;
        $this->amount = $amount;
    }
}