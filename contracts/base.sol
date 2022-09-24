// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
import "../contracts/permission.sol";
import "../contracts/updateReport.sol";

contract base is permission{

    // sets the owner of the network
    string id_hash;
    address public owner;

    constructor(){
        owner = msg.sender;
        isOwner[msg.sender] = true;
    }
    

}
