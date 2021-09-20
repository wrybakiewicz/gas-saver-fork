// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";

contract GasContract is Ownable {
    uint256 public totalSupply;

    address [5] public administrators;
    enum PaymentType { Unknown, BasicPayment, Refund, Dividend, GroupPayment }
    PaymentType constant defaultPayment = PaymentType.Unknown;

    mapping(address => uint256) public balances;
    mapping(address => Payment[]) payments;
    mapping(address=>uint256) lastUpdate; // when a payment record was last for a user   


    struct Payment {
      uint256 paymentID;
      PaymentType paymentType;
      address recipient;
      string recipientName;  // max 10 characters
      uint256 amount;
      

    }

    event supplyChanged(uint256);
    event Transfer(address indexed, uint256);
   
   constructor(address[] memory _admins) {
      totalSupply = 10000;
       balances[msg.sender] = totalSupply;
      setUpAdmins(_admins);
   }
   
   function welcome() public returns (string memory){
       return "hello !";
   }
   
    function setUpAdmins(address[] memory _admins) public onlyOwner{
        for (uint256 ii = 0;ii<administrators.length ;ii++){
            if(_admins[ii] != address(0)){ 
                administrators[ii] = _admins[ii];
            } 
        }
    }

   function updateTotalSupply() private onlyOwner {
      totalSupply = totalSupply + 1000;
      balances[msg.sender] = totalSupply;
      emit supplyChanged(totalSupply);
   }

   function checkForAdmin(address _user) public view returns (bool) {
       bool admin = false;
       for (uint256 ii = 0; ii< administrators.length;ii++ ){
          if(administrators[ii] ==_user){
              admin = true;
          }
       }
       return admin;
   }
   
   function transfer(address _recipient, uint256 _amount) public {
      require(balances[msg.sender] >= _amount,"Transfer function - Sender has insufficient Balance");
      balances[msg.sender] -= _amount;
      balances[_recipient] += _amount;
      emit Transfer(_recipient, _amount);
      Payment memory payment;
      payment.paymentType = PaymentType.BasicPayment;
      payment.recipient = _recipient;
      payment.amount = _amount;
      payments[msg.sender].push(payment);
   }
     
   function getPayments(address _user) public view returns (Payment[] memory) {
       return payments[_user];
   }
}