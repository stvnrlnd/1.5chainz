<?php
require_once(__DIR__.'/../blockchain.php');

$coin = new Blockchain();

echo "Create test trasactions... \n";
$coin->createTransaction(new Transaction('john', 'thomas', 10));
$coin->createTransaction(new Transaction('paige', 'emily', 20));

echo json_encode($coin, JSON_PRETTY_PRINT);

echo "Mining the pending transactions... \n";
$coin->minePendingTransactions('steven');

echo "I have ".$coin->getWalletBalance('steven')." in my wallet. \n";

echo "Doing some more mining... \n";
$coin->minePendingTransactions('steven');

echo "Now I have ".$coin->getWalletBalance('steven')." in my wallet. \n";
