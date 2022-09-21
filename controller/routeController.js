const  contract = require('@truffle/contract');
const { response } = require('express');
const  Web3 = require('web3');
const contract_data = require("../build/contracts/base.json");

const localhost = "http://127.0.0.1:9545";
const web3 = new Web3(localhost);
const provider = new Web3.providers.HttpProvider(localhost);

const contract_address = '0x17199D74a993FB3F4FACB1a11b26a1a98799ad7b'
const base = contract(contract_data);
base.setProvider(provider);


let currentUserAccount;

const labCnt = async(req,res)=>{
    try{
        const instance = await base.at(contract_address);
        const lCnt = await instance.labCnt();
        res.send(lCnt); 
    }catch(error){
        res.send("Invalid Request");
        console.log("This is error message : " + error);

    }
}


// patient sets it's personal information
const setPInfo = async(req,res) =>{
    // uploading the json to ipfs
    try{
        const {uploadfile} = await import('../fetchdata.mjs'); 
        const data = JSON.stringify(req.body);
        const result = await uploadfile(data);

        console.log(req.body);

        // getting the cid
        const cid = result.cid.toString();
        //calling the contract and updating the cid;
        const instance = await base.at(contract_address); 
        console.log("patient : " + currentUserAccount);
        await instance.setPersonalInfoHash(cid,{from:currentUserAccount[0]});
        res.send("Personal Information Updated");
        // console.log(cid);
    }catch(error){
        res.send("Invalid Request");
        console.log("This is error message : " + error);
    }
   
}

//owner enrolls the clients.
const addClient = async(req,res) =>{
    const{account,category} = req.body;
    // console.log(req.body);
    try{
        const instance = await base.at(contract_address);
        await instance.addClient(account,category,{from:currentUserAccount[0]})
        console.log("Client enrolled");
        // const id = await instance.Id(account);
        const id = await instance.Address(account);
        await console.log(id)
        res.send(id);
    }catch(error){
        res.send("Invalid Request");
        console.log("This is error message : " + error);
    }
}


// get the hospital count 

const hospitalCnt = async(req,res)=>{
    
    try{
        console.log("here");
        const instance = await base.at(contract_address);
        const hCnt = await instance.hospitalCnt();
        res.send(hCnt); 
       
    }catch(error){
        res.send("Invalid Request");
        console.log("This is error message : " + error);
    }
}


//to know who is the msg sender
const currentUser = async(req,res)=>{
    console.log("curr_account " + req.body);
    currentUserAccount = req.body;
    
    res.send("Welcome !!");
}

const addEmployee = async(req,res)=>{
    const curr_account = JSON.stringify(req.body);
    // console.log(req.body);
   
    try{
        const curr =  JSON.parse(curr_account);
        const instance = await base.at(contract_address);
        await instance.addEmployee(curr.account,{from:currentUserAccount[0]})
        console.log("Doctor/Tech enrolled");
        const id = await instance.Address(curr.account);
        res.send(id); 
       
    }catch(error){
        res.send("Invalid Request");
        console.log("This is error message : " + error);

    }
    

}

const approve = async(req,res)=>{
    
    // console.log("sent data " + account,category,currentUserAccount);
    const curr_account = JSON.stringify(req.body);
    try{
        const curr =  JSON.parse(curr_account);
        // console.log("curr: "+ curr.account , currentUserAccount[0]);    
        
        const instance = await base.at(contract_address);
        // const val = await instance.Id(curr.account);
        // console.log("val " + val);
        await instance.appprove(curr.account,{from:currentUserAccount[0]})
        console.log("Approved by patient");
        res.send("Successfully Approved");
    }catch(error){
        res.send("Invalid Request");
        console.log("This is error message : " + error);

    }
}


const remove = async(req,res) =>{
    const curr_account = JSON.stringify(req.body);

    try{
        const curr =  JSON.parse(curr_account);
        const instance = await base.at(contract_address);
        await instance.remove(curr.account,{from:currentUserAccount[0]})
        console.log("Removed by patient");
        res.send("Successfully Removed");
    }catch(error){
        res.send("Invalid Request");
        console.log("This is error message : " + error);

    }

}

const setMedInfo = async (req,res)=>{
    const info = JSON.stringify(req.body);
    try{
        var curr =  JSON.parse(info);
        console.log("this is setMed info");
        const {uploadfile} = await import('../fetchdata.mjs'); 
        console.log("patient :" + curr.account);
        console.log(info);
        const result = await uploadfile(info);
        const cid = result.cid.toString();
        console.log("cid " + cid);
        const instance = await base.at(contract_address);
        // console.log("isPatient" + status);
        await instance.setMedInfoHash(cid,curr.account,{from:currentUserAccount[0]})
        console.log("Med info updated by lab tech. ");
        res.send("Medical Report Updated");
    }catch(error){
        res.send("Invalid Request");
        console.log("This is error message : " + error);
    }
}


const getMedInfo = async(req,res)=>{
    const curr_account = JSON.stringify(req.body);
    
    try{
        const curr =  JSON.parse(curr_account);
        const instance = await base.at(contract_address);
        const cid = await instance.getMedInfoHash(curr.account,{from:currentUserAccount[0]})
        console.log("cid " + cid);
        const {getFile} = await import('../fetchdata.mjs')
        const file = await getFile(cid);
        console.log("this is file " + file);
        res.send(file);
        // return file;
    }catch(error){
        res.send("Invalid Request")
        console.log("this is error message" + error);
    }


}

const getPInfo = async(req,res)=>{
    const curr_account = JSON.stringify(req.body);
    
    try{
        const curr =  JSON.parse(curr_account);
        console.log(curr);
        const instance = await base.at(contract_address);
        const cid = await instance.getPersonalInfoHash(curr.account,{from:currentUserAccount[0]})
        console.log("cid " + cid);
        const {getFile} = await import('../fetchdata.mjs')
        const file = await getFile(cid);
        console.log("this is file " + file);
        res.send(file);
        // return file;
    }catch(error){
        res.send("Invalid Request")
        console.log("this is error message" + error);
    }


}

const getCreditScore = async(req,res) => {
    // console.log("get fun :: ")
    const curr_account = JSON.stringify(req.body);
    var acc = JSON.stringify(req.body);
    console.log("req : " + acc);
    try{
       
        const curr =  JSON.parse(curr_account);
        const instance = await base.at(contract_address);
        const val = await instance.getCreditScore(curr.account)
        console.log("Client enrolled");
        res.send(val);
        console.log("enrolled");
    }catch(error){
        res.send("Not a patient address");
        console.log("This is error message : " + error);
    }
}
// doctors confirms the disease
const confirmDisease = async(req,res)=>{
    const data = JSON.stringify(req.body);
    try{
       
        const curr =  JSON.parse(data);
        // console.log(curr);
        console.log(curr.status);
        const instance = await base.at(contract_address);
        await instance.confirmDisease(curr.patientAccount,curr.status,{from:currentUserAccount[0]})
        res.send("Successfully confirmed");
    }catch(error){
        res.send("Invalid Request");
        console.log("This is error message : " + error);
    }
}

// given the total consultation , cofirmation count and probabilty 
const healthStatus = async(req,res)=>{
    try{
       
        const instance = await base.at(contract_address);
        const total  = await instance.totalConsulation({from:currentUserAccount[0]})
        const positive = await instance.totalConfirmation({from:currentUserAccount[0]})
        
        res.json({
            "total":total,
            "positive":positive
        });

        console.log("Health Staus returned");
    }catch(error){
        res.send("Invalid Request");
        console.log("This is error message : " + error);
    }
}
// for a given account no. one can get it's  unique id
const getId = async(req,res)=>{
    const id = JSON.stringify(req.body);
    
    try{
        console.log("getId fun invoked");
        const curr =  JSON.parse(id);
        console.log("curr :" + curr.account);
        const instance = await base.at(contract_address);
        const val = await instance.Address(curr.account)
        if(val == "0"){
            res.send("Not a registered Account");
        }else{
            res.send(val);
        }
        
    }catch(error){
        res.send("Please Enter a Valid Account No.");
        console.log("This is error message : " + error);
    }
}


module.exports={setPInfo,
    addClient,
    currentUser,
    addEmployee,
    approve,
    remove,
    setMedInfo,
    getMedInfo,
    getCreditScore,
    confirmDisease,
    healthStatus,
    getId,
    getPInfo,
    hospitalCnt,
    labCnt
}
