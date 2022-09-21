
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);

const  contract = require('@truffle/contract')
const  Web3 = require('web3');
const contract_data = require("./build/contracts/base.json");

// ipfs 
// const ipfsClient = require('ipfs-http-client');
// const {globSource} = ipfsClient;

// const create =  require('ipfs-http-client');
// const fs =  require('fs');

const localhost = "http://127.0.0.1:9545";
const web3 = new Web3(localhost);
const provider = new Web3.providers.HttpProvider(localhost);


//create smart contract
const contract_address = '0x672c260E062C2760B928538900ecE8cbd84B07dc'
const base = contract(contract_data);
base.setProvider(provider);

let temp={};
let instance = {};
let accounts = {};

async function main(){

    accounts = await web3.eth.getAccounts();
    instance = await base.at(contract_address); 
    const owner = await instance.owner();
    // return Promise.resolve(owner);
    //console.log(owner);

    //connect to ipfs

    // const client = create()
    const data = fs.readFileSync('./test1.json')

    // // connect to a different API
    // // const client = create({ url: "http://127.0.0.1:5002/api/v0" });

    // // connect using a URL
    const client = create(new URL('http://127.0.0.1:5002'))

    // // call Core API methods
    const result = await client.add(data);

    // const tx = await instance.setCid(result.cid.toString(), {from: alice})
    const cid = result.cid.toString();

    // const cid = await instance.cid();
    console.log("Cid :" + cid);

    // // retrieve the file from ipfs
    const bytes = [];
    for await (const chunk of client.cat(cid)){
        bytes.push(chunk);
    }
    console.log(Buffer.concat(bytes).toString());

    //process.exit();
}


main();
// module.exports = {
//     main
// }
