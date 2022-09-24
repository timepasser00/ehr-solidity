// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
import "./helper.sol";
contract enroll is helper{

    // set of functions for the enrollment of participants in the network
    
    uint256 public patientCnt = 0 ;
    uint256 public hospitalCnt = 0;
    uint256 public doctorCnt = 0;
    uint256 public techCnt = 0;
    uint256 public labCnt = 0;
    mapping (address => bool) public isHospital;
    mapping (address => bool) public  isPatient;
    mapping (address => bool) public  isLab;
    mapping (address => bool) public  isDoctor;
    mapping (address => bool) public  isTech;
    mapping (address => bool) public isOwner;
    mapping (string => address) public  Id;
    mapping (address => address)public worksAt;
    mapping (address => string)public Address;
    // by admin
    

    modifier onlyAdmin(){
        require(isOwner[msg.sender],"sender is not owner");
        _;
    }
    
    modifier onlyPatient(){
        require(isPatient[msg.sender],"sender is not patient");
        _;
    }

    modifier onlyDoctor(){
        require(isDoctor[msg.sender],"sender is not a doctor");
        _;
    }

    modifier isValid(
        address _address)
    {
        require(_address != address(0x0),"null address found");
        require(!isDoctor[_address]
         && !isTech[_address]
         && !isLab[_address]
         && !isPatient[_address]
         && !isOwner[_address]
         && !isHospital[_address],
         "pre-existing address");
         _;
    
    }

    


    // owner add the hosptials , lab  and patients to the network
    function addClient(
        address _address,
        string memory category)
        public
        onlyAdmin
        isValid(_address)
    {
        if(compareStrings(category ,"hospital")){
            isHospital[_address] = true;
            hospitalCnt++;
            string memory idNo = uint2str(hospitalCnt);
            string memory id = concat("h",idNo);
            Id[id] = _address;
            Address[_address] = id;
        }else if(compareStrings(category ,"lab")){
            isLab[_address] = true;
            labCnt++;
            string memory idNo = uint2str(labCnt);
            string memory id = concat("l",idNo);
            Id[id] = _address;
            Address[_address] = id;
        }else if(compareStrings(category,"patient")){
            isPatient[_address] = true;
            patientCnt++;
            string memory idNo = uint2str(patientCnt);
            string memory id = concat("p",idNo);
            Id[id] = _address;
            Address[_address] = id;
        }
    }


    // enrollment by hospitals and labs

    function addEmployee(address _address)
        public
        isValid(_address)
    {
        require(isHospital[msg.sender] || isLab[msg.sender] ,"unauthorized access");
        if(isHospital[msg.sender]){
            doctorCnt++;
            isDoctor[_address] = true;
            string memory idNo = uint2str(doctorCnt);
            string memory id = concat("d",idNo);
            Id[id] = _address;
            Address[_address] = id;
        }else{
            isTech[_address] = true;
            techCnt++;
            string memory idNo = uint2str(techCnt);
            string memory id = concat("t",idNo);
            Id[id] = _address;
            Address[_address] = id;
        }
        
        worksAt[_address] = msg.sender;
    }

}
