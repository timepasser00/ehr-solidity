import React,{useState} from 'react'

const Remove = () => {
    const [account,setAccount] = useState("")
    const [msg, setMsg] = useState("");
    const [flag , setFlag] = useState(false)
    const remove = async (e) =>{
        e.preventDefault();
        const curr_account = {account};
        const response = await fetch('http://localhost:3001/remove', {
          method: 'POST',
          body: JSON.stringify(curr_account),
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
        <h1>Remove Hospitals And Labs</h1>
        <form className="create" onSubmit={remove}>
            <label>Institutional Id : </label>
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

export default Remove