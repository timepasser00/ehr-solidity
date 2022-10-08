import React , {useState} from 'react'
// import { useEffect } from 'react';

const MedInfo = () => {
    const [account,setAccount] = useState("");
    const [data , setData] = useState("");
    const [patientAccount,setPatientAccount] = useState("");
    const [flag, setFlag] = useState(false)
    const [status , setStatus] = useState("");
    const [flag2, setFlag2] = useState(false);
    // const [rcnt , setrCnt] = useState(0);
    const [rcntArr , setrcntArr] = useState([]);
    const [rId , setrId] = useState(0);

    const recordCnt = async (e) => {
      e.preventDefault();
      try {
        const details = {account};
        // console.log(details);
        const response = await fetch("http://localhost:3001/getMedRecordCnt", {
          method: "POST",
          body: JSON.stringify(details),
          headers: {
            "Content-Type": "application/json",
          }
        });

        const actualOp = await response.text();
        // console.log(actualOp);
        setFlag2(true);
        const rCntval =  parseInt(actualOp.substring(1, actualOp.length - 1));
        // setrCnt(rCntval);
        //  console.log(len);
        // console.log(flag3);
        var tmpArr = []
        for (let i = 1; i <= rCntval; i++) {
          tmpArr.push({ value: i, label: i });
        }
        setrcntArr(tmpArr);
        
        console.log(rcntArr);
      } catch (error) {
        console.log("some Error!!");
      }
    };

    const getMedInfo = async(e)=>{
        e.preventDefault();
        console.log("get med info triggered")
        const  curr_account= {account,rId};
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
        <button onClick={recordCnt}>Submit</button>
        {
          flag2 && <form className="create" onSubmit={getMedInfo}>
        <label> Record Id : </label>
          <select
            name="type"

            onChange={(e) => setrId(e.target.value)}
            value={rId}
          >
            <option value="">select record id</option>
            {rcntArr.map(({ value, label }) => (
              <option key = {value} value={value}>{label}</option>
            ))}
          </select>
          <button>Submit</button>
        </form>
        }{
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