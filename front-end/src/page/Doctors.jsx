import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import MedInfo from '../components/MedInfo';


const Doctors = () => {
    const [flag1,setFlag1] = useState(false);
    const [status,setStatus] = useState("");
    
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
    
    

    const navigate=useNavigate();
    const getPDetails=() =>{
        navigate('/personalDetais')
    }

    const getMDetails = () =>{
      navigate('/GMInfo')
      
    }


  return (
    <>
        <h1>Doctor</h1>
        <button style={mystyle} onClick={getMDetails} >See Medical Report</button>
        <button style={mystyle} onClick={getPDetails} >See Personal Info</button>   
    </>
  )
}

export default Doctors