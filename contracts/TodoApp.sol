// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
//import "hardhat/console.sol";
   
//0x1aBfBfA9C7b5791Ef2797138F5220842E7ef942E

contract TodoApp {
    uint256 public todoCount;

    mapping(uint => address) public taskOwner ;
    struct TodoList {
    uint256 todoId;
    string message;
    bool isCompleted;
  }
     TodoList[] public tasks;
     

     event AddTask(uint256 indexed todoId,string message,bool isCompleted);
     event DeleteTask(uint256 id, bool isCompleted);

      function addTodo( string memory _message,uint256 taskId) public {
           taskId = tasks.length ;
           tasks.push(TodoList(taskId,_message,false));
           taskOwner[taskId] = msg.sender;
           emit AddTask(taskId,_message,false);

    }
    function getMyTasks() public view  returns (TodoList[] memory) {
            TodoList[] memory temporary = new TodoList[](tasks.length);
            uint256 counter;
               for (uint i = 0; i < tasks.length; i++) {
              if (taskOwner[i] == msg.sender &&  tasks[i].isCompleted == false) {
              temporary[counter] = tasks[i];
                counter++;
                   }        
            }
            return temporary;
            
        }    
   function deleteTask(uint256 _id, bool isCompleted ) external {
      if (taskOwner[_id] == msg.sender) {
          tasks[_id].isCompleted = isCompleted;
          emit DeleteTask(_id,isCompleted);

      }
     
      
   }
   
}
