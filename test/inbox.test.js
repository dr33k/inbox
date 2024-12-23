const assert = require('assert');
const ganache = require('ganache');
const { Web3 } = require('web3');
const inboxContract = require('../compile');

const web3 = new Web3(ganache.provider());

let accounts, inbox;

beforeEach(async ()=> {
    //Get a list of accounts
    accounts = await web3.eth.getAccounts();

    //Use an acount to deploy contract
    inbox = await new web3.eth.Contract(inboxContract.abi)
    
    .deploy({
        data: inboxContract.evm.bytecode.object,
        arguments: ['Hi There']
    })

    .send({
        from: accounts[0],
        gas: '1000000'
    });

});

describe('Inbox', ()=>{

    it('deploys a contract', ()=>{
       console.log(inbox);
       assert.ok(inbox.options.address);
    });

    it('has a default message', async ()=>{
        const message = await inbox.methods.message.call();
    })
});