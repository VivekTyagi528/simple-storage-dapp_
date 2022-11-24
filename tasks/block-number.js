//Here we are going to create our custom tasks, like the functions we've seen in "yarn hardhat" command....
//In this task, we're going to find the block number of the block mined currently..

const{task} = require("hardhat/config");

task ("block-number", "prints the current block number").setAction(
    async(taskArgs, hre)=>{
        const blockNum =await hre.ethers.provider.getBlockNumber();
        console.log(`The current block number:${blockNum}`)//If we're going to check block number on the local network like hardhat...it always comes to be zero...but when you run it on any testnet then you're going to get a significant figure
        //most of the time, it is preferred to use the scripts instead of task for our project..
    }
)
