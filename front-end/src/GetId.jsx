import React , {useState} from 'react'

const GetId = () => {
    const [account,setAccount] = useState("");
    const [flag, setFlag] = useState(false);
    const [id, setId] = useState("");

    const  getId = async(e)=>{
        e.preventDefault()
        // console.log("getCreditScore func invoked");
        // console.log("acc  " + account);
        const curr_account = {account};
        console.log(curr_account);
        const response = await fetch('http://localhost:3001/getId', {
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
            setId(val);
            
        }
    }

  return (
    <>
        <h2>Get Account Id</h2>
        <form className="create" onSubmit={getId}>
            <label>Account No.</label>
            <input 
            type="text" 
            onChange={(e) => setAccount(e.target.value)} 
            value={account}
            />
            <button>Submit</button>
        </form>

        {
            flag && 
            <h3>Id : {id}</h3>
        }
    </>
  )
}

export default GetId