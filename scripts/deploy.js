const {ethers, run, network} = require("hardhat");//here we import the hardhat package in the projects...here ether is also wrapped in the hardhat package....
require("dotenv").config();


async function main() {
  const simpleStorageFactory = await ethers.getContractFactory("Storage");//How we select the contract
  console.log("Contract is deploying....");
  
  const contractDeploy = await simpleStorageFactory.deploy();//code to deploy the contract on alchemy network
  await contractDeploy.deployed();//contarct is deployedd....
  const contractAddr = await contractDeploy.address;//returs the address of contract..
  console.log(`Address of deployed contract: ${contractAddr}`);
  //verification of the contract begins here...
  console.log(`Verification of contract started....`)
  if(network.config.chainId === 5 && process.env.ETHERSCAN__KEY__ALCHEMY){
    console.log("Waiting for the block confirmations...")
    await contractDeploy.deployTransaction.wait(6)
    await verify(contractDeploy.address, []);
  } 
  
  //functionality of contract begins...
  const contractRet = await contractDeploy.retrieve();
  console.log(`The current value of storage is: ${contractRet.toString()}`);
  const valStore = await contractDeploy.store(5);
  await valStore.wait(1);
  // await contractDeploy.retrieve();
  const storeRes= await contractDeploy.retrieve();
  console.log(storeRes.toString());
  console.log(network.config.chainId) //This is how we get the info about the network configuration 
}

//going to write a function to verify the contract using @nomiclabs-etherscan pkg...
const verify = async(contractAddress, args)=>{
console.log("Verifying contract....");//To run any task from "yarn hardhat " command using codeline, we can use run package 
try {
  await run("verify:verify",{
    address: contractAddress,
    constructorArgs: args
  })//This is the enough code require to verify the contract but there is possibility to get into an error from etherscan which is already verified as contract bytecodes are matched by the previous ones...So we're going to add try and catch...but the already verified error is the major error seen than other errors
} catch (e) {
  if(e.message.toLowerCase().includes("already verified")){
    console.log("Contract is already verified...")
  }
  else{
    console.log(e)
  }
}//The verification is not going to happen on hardhat network because the txn need to be scanned on etherscan...
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });



  //NOTES
  //to run deploy.js file(just to check and test the lines) line-by-line in the console...we just have to write yarn hardhat console and there we can run each nd every code just in the deploy.js

    