import React , {useState} from 'react'
import MetaCheck from './MetaCheck'

const Home = () => {
    // const [walletAddress,setWalletAddress] = useState("");
  return (
    <div>
        <h1 style={{color: "blue"}}>Health Block </h1>
        <MetaCheck/>
    </div>
  )
}

export default Home