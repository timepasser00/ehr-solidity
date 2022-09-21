import React,{useState} from 'react'

const LabApproval = () => {
    const labCnt = async()=>{
        try{
            const response = await fetch('http://localhost:3001/labCnt',{
                method :'POST'
            })

            const actualOp = await response.text();
            console.log(actualOp);
        }catch(error){
            console.log("some Error!!")
        }
    }
    // labCnt();
  return (
    <>
        <h1>Approve Hospitals And Labs</h1>
        <button onClick={labCnt}>lCnt</button>
    
    {/* <div>{ct}</div> */}
   
    </>
  )
}

export default LabApproval