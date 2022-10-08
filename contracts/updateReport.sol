// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "../contracts/details.sol";

contract updateReport is details{


    // lab technician at approved lab can add a patient's med info
    function setMedInfoHash(  
        string memory _mHash,
        string memory _id    
    )public
    {
        address _patientAddress  = Id[_id];

        require(isPatient[_patientAddress], "not a patient" );
        require(isAllowed(_id) && isTech[msg.sender],"not a labTech");

        uint256 last = record[_patientAddress].totalRecord;
        last += 1;
        record[_patientAddress].medicalInfoHash[last].cid = _mHash;
        record[_patientAddress].totalRecord += last;
    }
    // patient or doctors at approved insti can see a patient medical info
    function getMedInfoHash(string memory _id,uint256 _reportId)
    public view 
    returns(string memory){
        address _patientAddress = Id[_id];
        require(isPatient[_patientAddress], "not a patient" );
        require(isHospital[worksAt[msg.sender]] || (isPatient[msg.sender] && msg.sender == _patientAddress) , "not allowed");
        require(isAllowed(_id),"not a valid request");
        return record[_patientAddress].medicalInfoHash[_reportId].cid;        
    }

    // doctors at approved hospitals can confirm the disease status
    function confirmDisease(
        string memory _id,
        uint256 _reportId,
        bool status)
        public
        onlyDoctor
    {
        address _patientAddress = Id[_id];
        require(isAllowed(_id) || 
        record[_patientAddress].medicalInfoHash[_reportId].refferedTo[msg.sender] == 2,"not allowed");
        require(isPatient[_patientAddress], "not a patient" );
        require(!record[_patientAddress].medicalInfoHash[_reportId].confirmedBy[msg.sender] , "have confirmed already");
        require(record[_patientAddress].totalRecord >= _reportId,"invalid report Id");
        record[_patientAddress].medicalInfoHash[_reportId].confirmedBy[msg.sender] = true;
        record[_patientAddress].medicalInfoHash[_reportId].consultationCnt++;
        if(status){
            record[_patientAddress].medicalInfoHash[_reportId].confirmationCnt++;
        }
        
    }

    
}
