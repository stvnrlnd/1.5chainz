import hashlib
import json
from time import time

class Blockchain(object):
    def __init__(self):
        self.chain = []
        self.current_transactions = []

        self.new_block(previous_hash=1, proof=100)

    def new_block(self, proof, previous_hash=None):
        """
            Create a new block

            :param proof: <int> Value given by the PoW algorithm
            :param previous_hash: (optional) <str> Hash of previous block
            :return: <dict> New block
        """
        block = {
            'index': len(self.chain) + 1,
            'timestamp': time(),
            'transactions': self.current_transactions,
            'proof': proof,
            'previous_hash': previous_hash or self.hash(self.chain[-1])
        }

        self.current_transactions = []

        self.chain.append(block)
        return block
    
    def new_transactions(self, sender, recipient, amount):
        """
            Creates a new transaction to go inside the next mined block

            :param sender: <str> Address of the sender
            :param recipient: <str> Address of the recipient
            :param amount: <str> Amount
            :return: <int> Index of the block that holds transaction
        """
        self.current_transactions.append({
            'sender': sender,
            'recipient': recipient,
            'amount': amount
        })
        return self.last_block['index'] + 1

    @staticmethod
    def hash(block):
        """
            Creates SHA256 hash of block

            :param block: <dict> The block
            :return: <str>
        """
        block_string = json.dumps(block, sort_keys=True).encode()
        return hashlib.sha256(block_string).hexdigest()
    
    @property
    def last_block(self):
        return self.chain[-1]