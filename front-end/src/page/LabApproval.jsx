import React, { useState } from "react";
import { useEffect } from "react";

const LabApproval = () => {
  const [account, setAccount] = useState("");
  const [cnt, setCnt] = useState(0);
  const [msg, setMsg] = useState("");
  const [flag, setFlag] = useState(false);
  const [action , setAction] = useState("");
  let cntArr = [];
  useEffect(() => {
    const labCnt = async () => {
      try {
        const response = await fetch("http://localhost:3001/labCnt", {
          method: "POST",
        });

        const actualOp = await response.text();
        setCnt(parseInt(actualOp.substring(1, actualOp.length - 1)));
        
      } catch (error) {
        console.log("some Error!!");
      }
    };
    labCnt();

    // console.log(cntArr);
  }, [cnt]);

  // console.log(cnt + "cnt");
  //   console.log(cnt);
  for (let i = 1; i <= cnt; i++) {
    cntArr.push({ value: `l${i}`, label: `l${i}` });
  }
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

console.log(cntArr);

  return (
    <>
      <h1>Approve Labs</h1>

      <form className="create" onSubmit={approve}>
        <label> Institutional Id : </label>
        {/* <input
          type="text"
          onChange={(e) => setAccount(e.target.value)}
          value={account}
        /> */}
        <select
          name="type"
          onChange={(e) => setAccount(e.target.value)}
          value={account}
        >
          <option value="">select lab</option>
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
      {/* <div>{ct}</div> */}
    </>
  );
};

export default LabApproval;