const Block = require("./block").default;
const Transaction  = require("./transaction")
import { pendingTransaction, updateChain } from '../blockchainClass';
import { createNewBlock } from '../generateNewBlock';


class BlockChain {

    constructor(chain,difficulty,miningReward, value) {
        this.chain = [chain];
        this.difficulty = difficulty;
        this.pendingTransactions = [];
        this.miningReward = miningReward;
        this.value = value
    }

    async createGenesisBlock() {
        var BlockReturn = new Block(Date.now(), 'Genesis Block', '0')
        await BlockReturn.calculateHash();
        this.chain.push(BlockReturn);
        updateChain(BlockReturn);
        pendingTransaction(new Transaction(null, "Brotex", 100000000));
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }

    async minePendingTransactions(miningRewardAddress, lastChain) {
        let block = new Block(Date.now(), this.pendingTransactions);
        await block.calculateHash();
        block.previousHash = lastChain;
        block.mineBlock(this.difficulty)
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ]
        updateChain(block);
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0
        Object.values(this.chain[0]).forEach(e => {
            Object.values(e.transactions).forEach(trans => {
                if (trans.fromAddress === address) {
                    balance -= trans.amount
                }
                if (trans.toAddress === address) {
                    balance += trans.amount
                }
            })
        });
        return balance
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]

            // Validation if some hash is not valid
            if (currentBlock.hash != currentBlock.calculateHash()) {
                return false
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false
            }
        }
        return true
    }

}

module.exports = BlockChain;