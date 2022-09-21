// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "../contracts/details.sol";

contract updateReport is details{


    // lab technician at approved lab can add a patient's med info
    function setMedInfoHash(  
        string memory _mHash,
        string memory _id
        
    )public
    isAllowed(worksAt[msg.sender],_id)
    {
        address _patientAddress  = Id[_id];

        require(isPatient[_patientAddress], "not a patient" );
        require(isTech[msg.sender],"not a labTech");

        uint256 last = record[_patientAddress].totalRecord;
        last += 1;
        record[_patientAddress].medicalInfoHash[last].cid = _mHash;
        record[_patientAddress].medicalInfoHash[last].consultationCnt = 0;
        record[_patientAddress].medicalInfoHash[last].confirmationCnt = 0;
    }
    // patient or doctors at approved insti can see a patient medical info
    function getMedInfoHash(string memory _id,uint256 _reportId)
    public view 
    returns(string memory){
        address _patientAddress = Id[_id];
        require(isPatient[_patientAddress], "not a patient" );
        require(isHospital[worksAt[msg.sender]] || (isPatient[msg.sender] && msg.sender == _patientAddress) , "not allowed");
        bool ok = false;
        if(_patientAddress == msg.sender){
            ok = true;
        }else{
            for(uint256 i=0; i < record[_patientAddress].permitted.length; i++){
                address instiAddress = record[_patientAddress].permitted[i].instiAddress;
                bool _status = record[_patientAddress].permitted[i].status;
                if(instiAddress == worksAt[msg.sender] && _status){
                    ok = true;
                    break;
                }

            }
        }
        require(ok,"not a valid request");
        return record[_patientAddress].medicalInfoHash[_reportId].cid;        
    }

    // doctors at approved hospitals can confirm the disease status
    function confirmDisease(
        string memory _id,
        uint256 _reportId,
        string memory status)
        public
        isAllowed(worksAt[msg.sender],_id)
    {
        address _patientAddress = Id[_id];
        require(isPatient[_patientAddress], "not a patient" );
        require(isDoctor[msg.sender],"not a doctor");
        require(!confirmedBy[msg.sender] , "have confirmed already");
        require(record[_patientAddress].totalRecord >= _reportId,"invalid report Id");
        confirmedBy[msg.sender] = true;
        record[_patientAddress].medicalInfoHash[_reportId].consultationCnt++;
        if(compareStrings(status ,"true")){
            record[_patientAddress].medicalInfoHash[_reportId].confirmationCnt++;
        }
        
    }
}
