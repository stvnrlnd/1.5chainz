<?php
require_once(__DIR__.'/../blockchain.php');

$coin = new Blockchain();

echo "Create test trasactions... \n";
$coin->createTransaction(new Transaction('john', 'thomas', 10));
$coin->createTransaction(new Transaction('paige', 'emily', 20));

echo json_encode($coin, JSON_PRETTY_PRINT);