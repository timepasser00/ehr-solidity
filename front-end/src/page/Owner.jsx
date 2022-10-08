import React from 'react'
import { useState } from 'react'

const Owner = () => {

    const [account,setAccount] = useState("");
    const [category,setCategory] = useState("");
    const [msg,setMsg] = useState("");
    const [fi, setFi] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault()
    
        const details = {account,category}
        
        const response = await fetch('http://localhost:3001/owner', {
          method: 'POST',
          body: JSON.stringify(details),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        
        const tmp = await response.text();
        setMsg(tmp);

        if (response.ok) {
          setFi(category.substring(0,1));
          setAccount('')
          setCategory('')
        }
    } 
  return (
    <>
      <form className="create" onSubmit={handleSubmit}> 
        <h1>Owner</h1>
        <h3>Enroll</h3>

        <label>Client Account No. </label>
        <input 
          type="text" 
          onChange={(e) => setAccount(e.target.value)} 
          value={account}
        />
        <select name="type" onChange={(e) => setCategory(e.target.value)} 
          value={category}>
            <option value="">Client Category</option>
            <option value="patient">Patient</option>
            <option value="hospital">Hospital</option>
            <option value="lab">Lab</option>
        </select>
        <button>Submit</button>
      
      </form>

      <h3>Id : {msg}</h3>
    </>
  )
}

export default Owner