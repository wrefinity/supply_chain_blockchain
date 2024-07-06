import { ethers } from "ethers";

const contractAddress = "YOUR_CONTRACT_ADDRESS";
const contractABI = [
  // ABI of the contract
];

let provider;
let signer;
let contract;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);
} else {
    provider = new ethers.providers.JsonRpcProvider("YOUR_INFURA_OR_ALCHEMY_URL");
    contract = new ethers.Contract(contractAddress, contractABI, provider);
}

export const createProduct = async (name, price, description, category, quantity) => {
    const tx = await contract.createProduct(
        name,
        price,
        description,
        category,
        quantity
    );
    await tx.wait();
};

export const dispatchProduct = async (productId) => {
    const tx = await contract.dispatchProduct(productId);
    await tx.wait();
};

export const inTransitProduct = async (productId) => {
    const tx = await contract.inTransitProduct(productId);
    await tx.wait();
};

export const deliverProduct = async (productId, newOwner) => {
    const tx = await contract.deliverProduct(productId, newOwner);
    await tx.wait();
};

export const getProduct = async (productId) => {
    return await contract.products(productId);
};
