class Blockchain(object):
    def __init__(self):
        self.chain = []
        self.current_transactions = []

    def new_block(self):
        pass
    
    def new_transactions(self, sender, recipient, amount):
        """
            Creates a new transaction to go inside the next mined block
        """
        self.current_transactions.append({
            'sender': sender,
            'recipient': recipient,
            'amount': amount
        })
        return self.last_block['index'] + 1

    @staticmethod
    def hash(block):
        pass
    
    @property
    def last_block(self):
        pass