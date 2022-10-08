import React from 'react'
import { useState } from 'react';

const GetPInfo = () => {
    const [account , setAccount] = useState("");
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [contact,setContact] = useState("");
    const [flag, setFlag] = useState("");

    const getPInfo = async(e)=>{
        e.preventDefault();
        console.log("get med info triggered")
        const  curr_account= {account};
        const response = await fetch('http://localhost:3001/getPInfo', {
          method: 'POST',
          body: JSON.stringify(curr_account),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if(response.ok){
            setFlag(true) 
            const tmp = await response.text();
            const info = JSON.parse(tmp);
            setName(info.name);
            setEmail(info.email);
            setContact(info.contactNo)
        }
        
        
    }
  return (
    <>
        <h1>Get Patient's Personal Info</h1>
        <label>Patient's Unique Id </label>
        <input 
        type="text" 
        onChange={(e) => setAccount(e.target.value)} 
        value={account}
        />
        <button onClick={getPInfo}>Submit</button>
        {
            flag &&
            <>
            
             <h1>P..</h1>
             <h4>Name :  {name}</h4>
             <h4>Email : {email}</h4>
             <h4>Contact Number : {contact}</h4>
            </>       
            
        }
    </>
  )
}

export default GetPInfo