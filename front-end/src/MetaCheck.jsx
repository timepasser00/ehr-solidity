import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BoxSubmit from './BoxSubmit';

const MetaCheck = () => {
    const navigate = useNavigate();
    const [flag , setFlag] = useState(false);
    const [walletAddress , setWalletAddress] = useState("")

    const mystyle = {
      backgroundColor: "#b3b4b5", 
      border: "",
      color: "black",
      borderRadius: "5px",
      padding: "15px 32px",
      textAlign: "center",
      fontSize: "16px",
      margin: "10px 10px 10px 10px"
    };

  async function ConnectMeta(){
    console.log("it's working ...");

    if(window.ethereum){

      try{
        const curr_accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        console.log(curr_accounts[0]);
        const x = await Promise.resolve(curr_accounts);
        setWalletAddress(x);
        console.log("wallet : " + walletAddress);
        const response = await fetch('http://localhost:3001/currentUser', {
          method: 'POST',
          body: JSON.stringify(curr_accounts),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        console.log("curr_wallet_address: " + walletAddress);
        const msg = await response.text();
        console.log(msg);
        
      }catch(error){
        console.log("Error connecting ..");
      }
    }else{
      console.log('not detected');
    } 
  }
  window.ethereum.on('accountsChanged',function(accounts){
    console.log(walletAddress);
  })
  

  
  const navigateOwner= async()=>{
    ConnectMeta();
    navigate('/owner');

  }
  const navigatePatient= async()=>{
    ConnectMeta();
    navigate('/patient');

  }

  const navigateHospital = async()=>{
    ConnectMeta();
    navigate('/hospital');
  }

  const navigateLabAssist = async()=>{
    ConnectMeta();
    navigate('/labAssist');
  }

  const navigateDoctor = async()=>{
    ConnectMeta();
    navigate('/doctors');
  }

  const checkCreditScore = async()=>{
    navigate('/creditScore')
  } 
  
  const getAccountId = async()=>{
    navigate('/getId')
  }
  
  return (
    <div>
        <button style={mystyle} onClick={navigateOwner}>navigateOwner</button>
        <button style={mystyle} onClick={navigatePatient}>navigatePatient</button>
        <button style={mystyle} onClick={navigateHospital}>navigateHospital</button>
        <button style={mystyle} onClick={navigateLabAssist}>navigateLabAssist</button>
        <button style={mystyle} onClick={navigateDoctor}>navigateDoctor</button>
        <button style={mystyle} onClick={checkCreditScore}>Check Patient's Credit Score</button>
        <button style={mystyle} onClick={getAccountId}>Check Account Id</button>
    </div>
  )
}

export default MetaCheck