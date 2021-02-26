import * as Crypto from 'expo-crypto';

class Block {

    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp
        this.transactions = transactions
        this.previousHash = previousHash
        this.nonce = 0;
        this.hash = null;
    }

     calculateHash(){
        var x = new Promise(async resolve => {
            return await(Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256,
                this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce))
                .then(e => {
                    this.hash = e;
                    resolve(e);
                })
            });
        return x;
    }

    async mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++
            await this.calculateHash();
        }
        // console.log('Block mined: ' + this.hash);
    }

}

export default Block;
