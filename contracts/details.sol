// SPDX-License-Identifier: MIT

pragma solidity ^0.8;

import "../contracts/enroll.sol";

contract details is enroll{

    // set of functions revolving aroung patient's record

    struct institutions{
        address instiAddress;
        bool status;
    }
    struct medicalReport{
        string cid;
        uint256 consultationCnt;
        uint256 confirmationCnt;
    }

    struct patientRecord{
        string personalInfoHash;
        mapping(uint256=>medicalReport) medicalInfoHash;
        institutions[] permitted;
        uint256 credit;
        uint256 totalRecord;
    }

    mapping (address => patientRecord) public record;
    mapping (address => bool) public confirmedBy;

    
    // patient sets their personal info
    function setPersonalInfoHash(
        string memory _pinfo
    )public
    onlyPatient
    {
        record[msg.sender].personalInfoHash = _pinfo;

    }
    // workers at approved insti can see the patient info
    function getPersonalInfoHash(string memory _id)
    public
    view
    isAllowed(worksAt[msg.sender], _id)
    returns(string memory)
    {
        address _address = Id[_id];
        require(isPatient[_address], "not a patient" );
        return record[_address].personalInfoHash;
    }

    
    // anyone can see patient's credit score
    function getCreditScore(string memory _id) public view returns(uint256){
        address _patientAddress = Id[_id];
        require(isPatient[_patientAddress],"not a patient");
        return record[_patientAddress].credit;
    }

    
    // total numbers of doctors who can given their opinion on the medical report
    function totalConsulation(uint256 _reportId)public view returns(uint256){
        require(isPatient[msg.sender],"not a patient" );
        uint256 total = record[msg.sender].medicalInfoHash[_reportId].consultationCnt;
        return total;
    }
    // total number of doctors who agreed with the medical report 
    function totalConfirmation(uint256 _reportId)public view returns(uint256){
        require(isPatient[msg.sender],"not a patient" );
        uint256 positive = record[msg.sender].medicalInfoHash[_reportId].confirmationCnt;
        return positive;
    }

    // checks if the sender works at a insti approved by the patient
    modifier isAllowed(address _address , string memory _id ){
        address _patientAddress = Id[_id];
        require(isHospital[_address] || isLab[_address] , "not allowed");
        bool ok = false;
        for(uint256 i=0; i < record[_patientAddress].permitted.length; i++){
            address instiAddress = record[_patientAddress].permitted[i].instiAddress;
            bool _status = record[_patientAddress].permitted[i].status;
            if(instiAddress == _address && _status){
                ok = true;
                break;
            }

        }
        require(ok,"not allowed");
        _;
        
    }
    

}
