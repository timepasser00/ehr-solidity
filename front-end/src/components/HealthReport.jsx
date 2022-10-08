import React , {useState} from 'react'
import { useEffect } from 'react';

const HealthReport = () => {
    const [len,setLen] = useState(0);
    let arr = [];
    useEffect(()=>{
        const getRecordCnt = async()=>{
            const response = await fetch('http://localhost:3001/getMedInfo', {
                method: 'GET'
            });
            const txt = await response.text();
            txt = txt.substring(1,txt.length-1);
            const x = parseInt(txt);
            setLen(x);
        }
        getRecordCnt();
    })
    for(let i = 1; i<len; i++){
        arr.push(i);
    }

  return (
    <>
        <h3>Health Report</h3>

        <select>
            <option value="">Record Id</option>
            {
                arr.map(val=>{
                    return  <option value={val}>{val}</option>
                })
            }
        </select>
        <button>Submit</button>
    </>
  )
}

export default HealthReport