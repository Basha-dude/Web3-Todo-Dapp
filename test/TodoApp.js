// SPDX-License-Identifier: UNLICENSED


// Import the necessary Hardhat components
const { expect } = require('chai');
const { ethers } = require('hardhat');

// Define the test suite
describe("TodoApp", function() {
    // Define the necessary variables
    let todoApp;
    let owner;
    let user1;
    let user2;

    
    
    
    // Deploy a new instance of the contract before each test
    beforeEach(async function() {
        [owner] = await ethers.getSigners();
        const TodoApp = await ethers.getContractFactory("TodoApp");
        todoApp = await TodoApp.deploy();
        await todoApp.deployed();
        
    });
    
    // Test the addTodo function
    describe("addTodo", () =>  {
        let receipt,tx
        it("Should add a new task to the list of tasks", async function() {
            // Define the necessary variables
            
            
            const message = "Test Task";
             let taskId = 0;
          
            // Add a new task to the list of tasks
         await todoApp.addTodo(message, taskId);
            
            // Get the task from the list of tasks
        const task = await todoApp.tasks(taskId);
            // Add a new task to the list of tasks
             tx = await todoApp.addTodo(message, taskId);
             receipt = await tx.wait();
            
          
            
            // Verify that the task was added correctly
            expect(task.todoId).to.equal(taskId);
            expect(task.message).to.equal(message);
            expect(task.isCompleted).to.equal(false);
        });
        
        it("Should emit an AddTask event when a new task is added", async function() {
            // Define the necessary variables
            const message = "Test Task";
            let taskId = 0;
            
            // Add a new task to the list of tasks
            const tx = await todoApp.addTodo(message, taskId);
            const receipt = await tx.wait();
            const event = receipt.events[0];
            console.log("event is", event.event)
            const args = event.args;
            expect(event.event).to.equal("AddTask");
            expect(args.todoId).to.equal(0);
            expect(args.message).to.equal("Test Task");
            expect(args.isCompleted).to.equal(false);
            
            

            
        });
        
        it("should delete the task ",async() => {
            const message = "Test Task";
            let taskId = 0;
            const TASK_ID = 0;
            const TASK_DELETED = true;
             let transaction,result
            let AddTask =  await todoApp.addTodo(message, taskId); 
            transaction = await todoApp.deleteTask(TASK_ID,TASK_DELETED)
            result = await transaction.wait();
            console.log(transaction);
            let task = await todoApp.tasks();

            expect(task[0].isCompleted).to.eq(true)

        })
      
            
      
    })
})
   
