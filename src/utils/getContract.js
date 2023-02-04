import ContractAbi from "../artifacts/contracts/OurTube.sol/OurTube.json";
import { ethers } from "ethers";

export default function getContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  let contract = new ethers.Contract(
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    ContractAbi.abi,
    signer
  );
  console.log(contract);
  return contract;
}
