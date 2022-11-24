const {ethers} = require("hardhat");
const {assert, expect} = require("chai");

describe("Simple_storage_testing", function(){
  let simpleStorage, simpleStorageDep;
  beforeEach(async function(){
    simpleStorage = await ethers.getContractFactory("Storage");
    simpleStorageDep = await simpleStorage.deploy();

  })

  it("number value should be zero initially", async function(){
   const currentValue = await simpleStorageDep.retrieve();
   const expectedVal = "0"; 
   //We can use assert as well as expect keyword ...but the assert preferred more than expect..
   //These keywords mainly import using 'chai' framework
   assert.equal(currentValue.toString(), expectedVal);
  })

  it("number should be updated",async function(){
   const updateVal = "5";
   const storeFunc = await simpleStorageDep.store(updateVal);
   await storeFunc.wait(1);
 
   const retVal = await simpleStorageDep.retrieve();

   assert.equal(retVal.toString(), updateVal);

  })
  
  it.only("sum should be added correctly", async function(){

    const newNum = "4";
    const sumFunc_1 = await simpleStorageDep.sumStor(newNum);
    await sumFunc_1.wait(1);
    const newVal = await simpleStorageDep.retrieve(); 
    assert.equal(newVal.toString(), newNum);
    



    
  })

  // describe("strings",function(){
  //   //....
  // })
})