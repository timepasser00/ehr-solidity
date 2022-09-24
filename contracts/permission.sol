// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
import "./details.sol";

contract permission is details{

    // patient adds or removes the insti who can update their medical report
    // patient adds or removes the insti who can update their medical report
    function modifyStatus(string memory _id,string memory status)
        public 
        onlyPatient  
    {
        address _address = Id[_id];
        // checks weather the entered id of lab or hospital
        require(isLab[_address] || isHospital[_address],"Not a valid address");
        bool ok = false;
        bool bad = false;
        for(uint256 i=0; i<record[msg.sender].permitted.length; i++){
            if(record[msg.sender].permitted[i] == _address && compareStrings(status,"approve")){
                bad = true;
                break;
            }
            
            if(record[msg.sender].permitted[i] == _address && compareStrings(status,"remove")){
                uint256 n = record[msg.sender].permitted.length;
                record[msg.sender].permitted[i] = record[msg.sender].permitted[n-1];
                record[msg.sender].credit--;
                record[msg.sender].permitted.pop();
                ok = true;
                break;
            }
        }
        if(!bad && compareStrings(status,"approve")){
            record[msg.sender].permitted.push(_address);
            record[msg.sender].credit++;
            ok = true;
        }
        require(ok, "invalid request");
        

    }

    

}
