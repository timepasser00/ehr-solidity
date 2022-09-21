import React , {useState} from 'react'

const MedInfo = () => {
    const [account,setAccount] = useState("");
    const [data , setData] = useState("");
    const [patientAccount,setPatientAccount] = useState("");
    const [flag, setFlag] = useState(false)
    const [status , setStatus] = useState("");
    

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
        setStatus(info.status);
    }
  return (
    <>
        <h1>Get Medical Info</h1>
        <label>Id : </label>
        <input 
        type="text" 
        onChange={(e) => setAccount(e.target.value)} 
        value={account}
        />
        <button onClick={getMedInfo}>Submit</button>
        {
            flag &&
            <>
            
             <h1> Medical Report</h1>
             <h4>Patient Id. {patientAccount}</h4>
             <h3>Glucose Level : {data}</h3>
             <h3>Expected Disease : {status}</h3>
            </>       
            
        }
    </>
  )
}

export default MedInfo