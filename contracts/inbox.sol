//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Inbox {
    string public message;

    constructor(string memory newMessage) {
        message = newMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}
