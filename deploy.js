const HDWalletProvider = require('@truffle/hdwallet-provider');
const {Web3} = require('web3');
const inboxContract  = require('./compile');

const provider = new HDWalletProvider(
    process.env.SEPOLIA_MMN,
    process.env.SEPOLIA_TEST_LINK
);

const web3 = new Web3(provider);

const deploy = async ()=> {
const accounts = await web3.eth.getAccounts();

console.log('Attempting to deploy contract from account ', accounts[0]);

const inbox = await new web3.eth.Contract(inboxContract.abi)
    .deploy({
        data: inboxContract.evm.bytecode.object,
        arguments: ['Init']
})
    .send({
        from: accounts[0],
        gas: '1000000'
    });

console.log('Address : ', inbox.options.address);

};

deploy();
provider.engine.stop() 