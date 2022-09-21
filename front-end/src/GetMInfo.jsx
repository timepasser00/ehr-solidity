import React , {useState} from 'react'

const GetMInfo = (props) => {
    const [account,setAccount] = useState("");
    const [data , setData] = useState("");
    const [patientAccount,setPatientAccount] = useState("");
    const [flag, setFlag] = useState(false)
    const [status , setStatus] = useState("");
    const [flag2 , setFlag2] = useState(false);
    const [msg,setMsg] = useState("");
    const [disease, setDisease] = useState("");

    const getMedInfo = async(e)=>{
        e.preventDefault();
        console.log("get med info triggered")
        const  curr_account= {account};
        const response = await fetch('http://localhost:3001/getMedInfo', {
          method: 'POST',
          body: JSON.stringify(curr_account),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if(response.ok){
            setFlag(true)
        }
        
        const tmp = await response.text();
        const info = JSON.parse(tmp);
        setPatientAccount(info.account);
        setData(info.value);
        setDisease(info.status);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        const details = {patientAccount,status}
        console.log(details);
        const response = await fetch('http://localhost:3001/confirm', {
          method: 'POST',
          body: JSON.stringify(details),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const txt = await response.text();
        setMsg(txt);
        if (response.ok) {
          setAccount('')
          setStatus();
          setFlag2(true);
        }
    }
  return (
    <>
        <h1>Get Medical Info</h1>
        <label>Patient's Unique Id : </label>
        <input 
        type="text" 
        onChange={(e) => setAccount(e.target.value)} 
        value={account}
        />
        <button onClick={getMedInfo}>Submit</button>
        {
            flag &&
            <>
             <h1>Medical Report</h1>
             <h4>Patient's Unique Id :  {patientAccount}</h4>
             <h3>Glucose Level : {data}</h3>
             <h3>Expected Disease : {disease}</h3>
             <form className="create" onSubmit={handleSubmit}> 
             <select name="type" onChange={(e) => setStatus(e.target.value)} 
                value={status}>
                <option value="">staus</option>
                <option value="true">Positive</option>
                <option value="false">Negative</option>
            </select>
            <button>Submit</button>
            </form>
            </>       
            
        }
        {
            flag2 && 
            <h4>Status : {msg}</h4>
        }
    </>
  )
}

export default GetMInfo