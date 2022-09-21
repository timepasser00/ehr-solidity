import React , {useState} from 'react'


const BoxSubmit = () => {
    const [account,setAccount] = useState("");
    const [flag, setFlag] = useState("");
    const [credit , setCredit] = useState("");
    const  getCreditScore = async(e)=>{
        e.preventDefault()
        // console.log("getCreditScore func invoked");
        // console.log("acc  " + account);
        const curr_account = {account};
        console.log(curr_account);
        const response = await fetch('http://localhost:3001/creditScore', {
          method: 'POST',
          body: JSON.stringify(curr_account),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const val = await response.text();
        // console.log("credit " + val);
        if (response.ok) {
            setAccount('')
            setFlag(true);
            setCredit(val);
            
        }
    }
  return (
    <>
        <h2>Check Patient's Credit Score</h2>
        <form className="create" onSubmit={getCreditScore}>
            <label>Patient's Unique Id </label>
            <input 
            type="text" 
            onChange={(e) => setAccount(e.target.value)} 
            value={account}
            />
            <button>Submit</button>
        </form>

        {
            flag && 
            <h3>Credit Score : {credit}</h3>
        }
    </>
  )
}

export default BoxSubmit
