import React from 'react'
import { useState } from 'react'

const Hospital = () => {
    const [account,setAccount] = useState("");
    const [category,setCategory] = useState("");
    const [msg, setMsg] = useState("");
    const [flag , setFlag] = useState(false)
    const [fi, setFi] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault()
    
        const details = {account,category}
        console.log(details);
        const response = await fetch('http://localhost:3001/institution', {
          method: 'POST',
          body: JSON.stringify(details),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const txt = await response.text();
        setMsg(txt);
        if (response.ok) {
          setFi(category.substring(0,1));
          setAccount('')
          setCategory('')
          setFlag(true)
        //   console.log('new details added:', json)
        }
    }
  return (
    <>
        <form className="create" onSubmit={handleSubmit}> 
            <h1>Hospital/Lab </h1>
            <h3>Enroll</h3>

            <label>Employee Account No. </label>
            <input 
            type="text" 
            onChange={(e) => setAccount(e.target.value)} 
            value={account}
            />
            <select name="type" onChange={(e) => setCategory(e.target.value)} 
                value={category}>
                <option value="">Category</option>
                <option value="doctor">Doctor</option>
                <option value="tech">Lab Technician</option>
            </select>
            <button>Submit</button>
        </form>

        {
            flag && 
            <h3>Status/EnrolledId : {fi+msg.substring(1,2)} </h3>
        }
    </>
  )
}

export default Hospital