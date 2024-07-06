import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ethers } from 'ethers';
import { PrismaClient, Product } from '@prisma/client';

const prisma = new PrismaClient();

interface ProductFormInputs {
  name: string;
  category: string;
  description: string;
  price: number;
}

const Home = ({ products }: { products: FarmProduct[] }) => {
  const { register, handleSubmit } = useForm<ProductFormInputs>();
  const [loading, setLoading] = useState(false);

  const submitProduct: SubmitHandler<ProductFormInputs> = async (data) => {
    setLoading(true);

    try {
      // Connect to Ethereum wallet
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Replace with your contract ABI and address
      const contractAddress = 'YOUR_CONTRACT_ADDRESS';
      const contractABI = [ /* ABI Array */ ];
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // Interact with the smart contract
      const tx = await contract.addProduct(data.name, data.category, data.description, ethers.utils.parseEther(data.price.toString()));
      await tx.wait();

      // Get the product ID from the smart contract event
      const productId = tx.events[0].args.id.toNumber();

      // Save product in the database
      await prisma.product.create({
        data: {
          name: data.name,
          category: data.category,
          description: data.description,
          price: data.price,
          owner: await signer.getAddress(),
          blockchainId: productId
        }
      });

      setLoading(false);
      alert('Product added successfully');
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert('Failed to add product');
    }
  };

  return (
    <div>
      <h1>FarmProduct Tracking</h1>
      <form onSubmit={handleSubmit(submitProduct)}>
        <input type="text" {...register('name')} placeholder="Product Name" required />
        <input type="text" {...register('category')} placeholder="Category" required />
        <input type="text" {...register('description')} placeholder="Description" required />
        <input type="number" {...register('price')} placeholder="Price" required />
        <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
      </form>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.category} - {product.description} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export async function getServerSideProps() {
  const products = await prisma.farmProduct.findMany();
  return { props: { products } };
}

export default Home;
