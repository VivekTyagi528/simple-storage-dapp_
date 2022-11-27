import { ethers } from "./ethers-5.6.esm.mkn.js";
import { abi, contractAddress } from "./constants.js";

console.log("This is the dapp");
const buttonSel = document.querySelector("#walletButton");
const ethAmtSel = document.querySelector("#eth_amount");
const fundBtnSel = document.querySelector("#fundBtn");

//Wallet Connection...
buttonSel.addEventListener("click", async () => {
  if (typeof window.ethereum !== undefined) {
    console.log("Connecting....");
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      console.log("Wallet connected!!!");
      buttonSel.innerHTML = "<span>Connected</span>";
    } catch (error) {
      console.log(`Error Occured ${error}`);
    }
  } else {
    console.log("No metamask wallet present");
    buttonSel.innerHTML = "<p>Not Connected</p>";
  }
});

//Fund Amount Function
fundBtnSel.addEventListener("click", async () => {
  if (window.ethereum !== undefined) {
    const amt = "0.5";
    console.log(`Funding the program with ${amt} ethers`);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log(signer);
    const contract = new ethers.Contract(contractAddress, abi, signer);
    console.log("signer has been acceptedd!!!");
    console.log(ethAmtSel.value);
    const transact = await contract.fund({
      value: ethers.utils.parseEther(amt),
    });
    console.log("Transaction successfull");
    await listenForTransactionMined(transactionResponse, provider);
  } else {
    alert("You can't leave the Eth Field empty");
    console.log("You can't leave the Eth Field empty");
  }
});

//Listener
function listenForTransactionMined(transactionResponse, provider) {
  console.log(`Mining for the ${transactionResponse.hash}...`);
  // Here wait for the txn to be mined...
  provider.once(transactionResponse.hash, (transactionReceipt) => {
    console.log(
      `Fulfilled with ${transactionReceipt.confirmations} confirmations...`
    );
  });
}
