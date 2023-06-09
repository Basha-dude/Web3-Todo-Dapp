
const hre = require("hardhat");

async function main() {
  

  const TodoApp = await hre.ethers.getContractFactory("TodoApp");
  const contract = await TodoApp.deploy();

  await contract.deployed();
  console.log("contract address to:",contract.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
