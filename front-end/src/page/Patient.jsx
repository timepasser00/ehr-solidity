import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

const Patient = () => {
  
    const [flag , setFlag] = useState(false)
    const [total,setTotal] = useState("");
    const [positive , setPositive] = useState("");
    const mystyle = {
      backgroundColor: "#b3b4b5", /* Green */
      border: "",
      color: "black",
      borderRadius: "5px",
      padding: "15px 32px",
      textAlign: "center",
      fontSize: "16px",
      margin: "10px 10px 10px 10px"
    };

    const checkStatus = async (e) =>{
      e.preventDefault();
    
      const response = await fetch('http://localhost:3001/status', {
        method: 'GET'
      })
      
      const tmp = await response.text();
      const info = JSON.parse(tmp);
      if (response.ok) {
          setFlag(true);
          setTotal(info.total);
          setPositive(info.positive);
      }
  }
  

    const navigate=useNavigate();
    const pInfoHandler=() =>{
        navigate('/patient/patientInfo')
    }

    const approve = () =>{
      navigate('/patient/approve')
    }
    const approveLab = () =>{
      navigate('/patient/approveLab')
    }
    const approveHospital = () =>{
      navigate('/patient/approveHospital')
    }
    
    const remove = () =>{
        navigate('/patient/remove');
    }

    const getMedInfo = ()=>{
        navigate('/getMedInfo')
    }

    const getStatus = ()=>{
      navigate('/healthReport');
    }
    
  return (
    <>
      <h1>Patients</h1>
      <button style={mystyle} onClick={pInfoHandler}>Add personal Info</button>
      <button style={mystyle} onClick={approveHospital}>Approve/Remove Hospital</button>
      <button style={mystyle} onClick={approveLab}>Approve/Remove Lab</button>
      <button style={mystyle} onClick={remove}>Remove Lab/Hospital</button>
      <button style={mystyle} onClick={getStatus}>Check Health Status</button>
      <button style={mystyle} onClick={getMedInfo}>Medical Record</button>
        {
            flag && 
            <>
              <h3>Total Consultation : {total} </h3>
              <h3>Total Positive Result : {positive} </h3>
              <h3>Probabilty : {(positive/total)*100} %</h3>
            </>
        }
  </>
  )
}

export default Patient