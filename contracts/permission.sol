// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
import "./details.sol";

contract permission is details{

    // patient adds or removes the insti who can update their medical report
    function appprove(string memory t,  string memory _id)
        public 
        onlyPatient  
    {
        address _address = Id[_id];
        if(compareStrings(t, "h")){
            require(isHospital[_address],"Not a hospital");
        }
        
        // checks weather the entered id of lab or hospital
        require(isLab[_address] || isHospital[_address] ,"Not a valid address");
        institutions memory tmp;
        // address instiAddre = Id[_address];
        tmp.instiAddress = _address;
        tmp.status = true;
        // labList[msg.sender].push(tmp);
        record[msg.sender].permitted.push(tmp);
        record[msg.sender].credit++;

    }
    // patient remove the approved hospitals and labs 
    function remove(string memory _id)
        public 
        onlyPatient
    {
        address _address = Id[_id];
        bool ok = false;
        // confirms if the given address is of a hospital or a lab
        require(isLab[_address] || isHospital[_address] ,"Not a valid address");
        for(uint256 i=0; i<record[msg.sender].permitted.length; i++){
            if(record[msg.sender].permitted[i].instiAddress == _address){
                uint256 n = record[msg.sender].permitted.length;
                record[msg.sender].permitted[i] = record[msg.sender].permitted[n-1];
                record[msg.sender].credit--;
                record[msg.sender].permitted.pop();
                ok = true;
            }
        }
        require(ok, "invalid request");
    }

    

}
