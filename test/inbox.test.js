const assert = require('assert');
const ganache = require('ganache');
const { Web3 } = require('web3');
const inboxContract = require('../compile');

const web3 = new Web3(ganache.provider());

let accounts, inbox;
const INIT_STRING = 'HI THERE';

beforeEach(async ()=> {
    //Get a list of accounts
    accounts = await web3.eth.getAccounts();

    //Use an acount to deploy contract
    inbox = await new web3.eth.Contract(inboxContract.abi)
    
    .deploy({
        data: inboxContract.evm.bytecode.object,
        arguments: [INIT_STRING]
    })

    .send({
        from: accounts[0],
        gas: '1000000'
    });

});

describe('Inbox', ()=>{

    it('deploys a contract', ()=>{
    //    console.log(inbox);
       assert.ok(inbox.options.address);
    });

    it('has a default message', async ()=>{
        const message = await inbox.methods.message().call();
        assert.equal(message, INIT_STRING)
    });

    it('can change the default message', async ()=> {
        const newMessage = 'Bye There';

        const hash = await inbox.methods.setMessage(newMessage).send({
            from: accounts[1],
            gas: '50000'
        });

        const message = await inbox.methods.message().call();
        assert.equal(message, newMessage);

        console.log('hash: %s', hash);
    });
});