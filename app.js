const BlockChain  = require("./class/blockchain")
const Transaction  = require("./class/transaction")

// Name of the wallet.
let newBlockChainWallet = new BlockChain();

// Amount of the criptos to create a new transaction.
let amountCriptos = 10;

// Create a new transaction from adress1 to adress2
newBlockChainWallet.createTransaction(new Transaction('address1', 'address2', amountCriptos))

// Mine the transaction
newBlockChainWallet.minePendingTransactions('mario-address')

// Get Balance from any account, in this example addres1
console.log('Balance of the wallet', newBlockChainWallet.getBalanceOfAddress('address1'))

