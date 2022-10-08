import React , {useState,useEffect} from 'react'

const GetMInfo = (props) => {
  // account is patient's id p1 , p2 ...
    const [account,setAccount] = useState("");
    const [data , setData] = useState("");
    const [patientAccount,setPatientAccount] = useState("");
    const [flag, setFlag] = useState(false)
    const [status , setStatus] = useState("");
    const [flag2 , setFlag2] = useState(false);
    const [msg,setMsg] = useState("");
    const [disease, setDisease] = useState("");
    const [cnt,setCnt] = useState(0);
    const [rcnt,setrCnt] = useState(0);
    const [rId , setrId] = useState(0);
    const [flag3 , setFlag3] = useState(false);
    const [flag4 , setFlag4] = useState(false);
    let cntArr = [];
    // let rcntArr = [];
    const [rcntArr , setrcntArr] = useState([])
    useEffect( () => {
      const patientCnt = async () => {
        try {
          const response = await fetch("http://localhost:3001/patientCnt", {
            method: "POST",
          });
  
          const actualOp = await response.text();
          setCnt(parseInt(actualOp.substring(1, actualOp.length - 1)));
          
        } catch (error) {
          console.log("some Error!!");
        }
      };
      patientCnt();
      // console.log(cntArr);
    }, [cnt,rcnt]);
    
    for (let i = 1; i <= cnt; i++) {
      cntArr.push({ value: `p${i}`, label: `p${i}` });
    }
    
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
        console.log(actualOp);
        setFlag3(true);
        const rCntval =  parseInt(actualOp.substring(1, actualOp.length - 1));
        setrCnt(rCntval);
        //  console.log(len);
        console.log(flag3);
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
        setDisease(info.status);
    }

    const rexam = async()=>{
      const  curr_account= {account,rId,status};
      try{
        const response = await fetch('http://localhost:3001/reExam', {
            method: 'POST',
            body: JSON.stringify(curr_account),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        if(response.ok){
          setFlag4(true);
        }
      }catch(error){
        console.log("some error !! ")
      }
        

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        const  curr_account= {account,rId,status};
        // console.log(details);
        const response = await fetch('http://localhost:3001/confirm', {
          method: 'POST',
          body: JSON.stringify(curr_account),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const txt = await response.text();
        setMsg(txt);
        if (response.ok) {
          // setStatus();
          setFlag2(true);
        }
    }
  return (
    <>
        <h1>Get Medical Info</h1>
        {!flag3 && <form className="create" onSubmit={recordCnt}>
        <label> Patient Id : </label>
          <select
            name="type"
            onChange={(e) => setAccount(e.target.value)}
            value={account}

          >
            <option value="">select patient id</option>
            {cntArr.map(({ value, label }) => (
              <option key = {value} value={value}>{label}</option>
            ))}
          </select>
          <button>Submit</button>
        </form>}
        {flag3 && <form className="create" onSubmit={getMedInfo}>
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
        </form>}
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
            <br></br>
            <button onClick={rexam}>Rexam</button>
            {
              flag4 && <>
                  <select name="type" onChange={(e) => setStatus(e.target.value)} 
                value={status}>
                <option value="">staus</option>
                <option value="true">Positive</option>
                <option value="false">Negative</option>
            </select>
            <button>Submit</button>
              </>
            }
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