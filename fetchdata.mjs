import { create } from 'ipfs-http-client';
// import * as fs from 'fs';
// const create = require('ipfs-http-client');
// var fs = require('fs');
// const client = create()

// 

// push data to ipfs
// const data = fs.readFileSync('./test1.json')


export const uploadfile = async(data)=>{
    const client = create(new URL('http://127.0.0.1:5002'))
    // const client = create()
    const result = await client.add(data);
    // console.log("from function :" + result.cid);
    // return Promise.resolve(result);
    return result;
}

export const getFile = async(cid) =>{
    const client = create(new URL('http://127.0.0.1:5002'))
    const bytes = [];
    for await (const chunk of client.cat(cid)){
        bytes.push(chunk);
    }
    return Buffer.concat(bytes).toString();
}

// uploadfile(data);

// get cid
// const cid = result.cid.toString();

// publish cid
// console.log("Cid :" + cid);

// retrieve the file from ipfs
// const bytes = [];
// for await (const chunk of client.cat(cid)){
//     bytes.push(chunk);
// }
// console.log(Buffer.concat(bytes).toString());

// module.exports = {
//     uploadfile,
//     getFile
// }