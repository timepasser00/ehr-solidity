import React, { useState } from 'react'

const Pform = () => {
    const [name,setName] = useState("");
    const [email,setEmail]=useState("");
    const [contactNo,setContactNo]=useState("");
    const [msg, setMsg] = useState("");
    const [flag , setFlag] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault()
    
        const details = {name,email,contactNo}
        
        const response = await fetch('http://localhost:3001/patientDetails', {
          method: 'POST',
          body: JSON.stringify(details),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const txt = await response.text();
        setMsg(txt);
        if (response.ok) {
          setName('')
          setContactNo('')
          setEmail('')
          setFlag(true);
        }
    }

  return (
    <>
      <form className="create" onSubmit={handleSubmit}> 
        <h3>Patient Personal Info</h3>

      <label>Name</label>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name}
      />
      <label>Email Id</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email}
      />

      <label>Contact No</label>
      <input 
        type="text" 
        onChange={(e) => setContactNo(e.target.value)} 
        value={contactNo}
      />

      <button>Submit</button>
    </form>
    {
      flag && 
      <h3>Status : {msg} </h3>
      
    }

    </>
  )
}

export default Pform;