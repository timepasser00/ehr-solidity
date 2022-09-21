import React from 'react'
import { useState } from 'react';

const LabAssist = () => {
    const [account,setAccount] = useState("");
    const [value,setValue] = useState("");
    const [status,setStatus] = useState("");
    const [msg, setMsg] = useState("");
    const [flag , setFlag] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
    
        const details = {account,value,status}
        
        const response = await fetch('http://localhost:3001/setMedInfo', {
          method: 'POST',
          body: JSON.stringify(details),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const txt = await response.text();
        setMsg(txt);
        if (response.ok) {
          setAccount('');
          setValue('');
          setStatus('');
          setFlag(true);
        }
    }

  return (
    <form className="create" onSubmit={handleSubmit}> 
    <h3>Add Patient Medical Report</h3>

    <label>Patient Account No.</label>
    <input 
      type="text" 
      onChange={(e) => setAccount(e.target.value)} 
      value={account}
    />
    <br></br>
    <label>Glucose Level</label>
    <input 
      type="text" 
      onChange={(e) => setValue(e.target.value)} 
      value={value}
    />
    <br></br>
    <label>Expected Disease   </label>
    <input 
      type="text" 
      onChange={(e) => setStatus(e.target.value)} 
      value={status}
    />
    <br></br>
    <button>Submit</button>
    {
            flag && 
            <h3>Status : {msg} </h3>
    }
  </form>
    
  )
}

export default LabAssist