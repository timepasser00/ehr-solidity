import React,{useState} from 'react'
import { useEffect } from 'react';


const Approval = () => {
    const [account,setAccount] = useState("")
    const [msg, setMsg] = useState("");
    const [flag , setFlag] = useState(false)
    const approve = async (e) =>{
        e.preventDefault();
        const currAccount = {account};
        console.log(currAccount);
        const response = await fetch('http://localhost:3001/approve', {
          method: 'POST',
          body: JSON.stringify(currAccount),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const txt = await response.text();
        setMsg(txt);
        if (response.ok) {
            setAccount('')
            setFlag(true)
        }
    }
  return (
    <>
        <h1>Approve Hospitals And Labs</h1>
        <form className="create" onSubmit={approve}>
            <label> Institutional Id : </label>
            <input 
            type="text" 
            onChange={(e) => setAccount(e.target.value)} 
            value={account}
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

export default Approval