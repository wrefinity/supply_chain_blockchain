import { ethers } from 'ethers';

// Replace with your contract ABI and address
const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const contractABI = [ /* ABI Array */];

export const getContract = (signer: ethers.Signer) => {
    return new ethers.Contract(
        contractAddress,
        contractABI,
        signer
    );
};
