import React, { useState } from "react";
import { useEffect } from "react";
const HospApproval = () => {
    const [account, setAccount] = useState("");
    const [cnt, setCnt] = useState(0);
    const [msg, setMsg] = useState("");
    const [flag, setFlag] = useState(false);
    const [action , setAction] = useState("");
    let cntArr = [];
    useEffect(() => {
        const hospCnt = async () => {
          try {
            const response = await fetch("http://localhost:3001/hCnt", {
              method: "POST",
            });
    
            const actualOp = await response.text();
            setCnt(parseInt(actualOp.substring(1, actualOp.length - 1)));
           
          } catch (error) {
            console.log("some Error!!");
          }
        };
        hospCnt();
    
        // console.log(cntArr);
      }, [cnt]);
      for (let i = 1; i <= cnt; i++) {
        cntArr.push({ value: `h${i}`, label: `h${i}` });
      }
      console.log(cntArr);
      const approve = async (e) => {
        e.preventDefault();
        const details = { account , action};
        const response = await fetch("http://localhost:3001/approve", {
          method: "POST",
          body: JSON.stringify(details),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const txt = await response.text();
        setMsg(txt);
        if (response.ok) {
          setAccount("");
          setFlag(true);
          cntArr = [];
        }
      };
  return (
    <>
      <h1>Approve Hospital</h1>

      <form className="create" onSubmit={approve}>
        <label> Institutional Id : </label>
       
        <select
          name="type"
          onChange={(e) => setAccount(e.target.value)}
          value={account}
        >
          <option value="">select Hospital</option>
          {cntArr.map(({ value, label }, index) => (
            <option value={value}>{label}</option>
          ))}
         
        </select>
        <select onChange={(e) => setAction(e.target.value)}
          value={action}>
            <option value="">Action</option>
            <option value="remove">Remove</option>
            <option value="approve">Approve</option>
        </select>

        <button>Submit</button>
      </form>
      {flag && <h3>Status : {msg} </h3>}
     
    </>
 

   
  )
}

export default HospApproval