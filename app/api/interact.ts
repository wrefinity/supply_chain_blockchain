// pages/api/interact.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import { PrismaClient, State } from '@prisma/client';

const prisma = new PrismaClient();
const provider = new ethers.providers.JsonRpcProvider('https://YOUR_ETHEREUM_NODE_URL');
const signer = provider.getSigner();
const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const contractABI: any = [
    // Your contract ABI
];

const contract = new ethers.Contract(contractAddress, contractABI, signer);

type CreateProductParams = {
    name: string;
    price: number;
    description: string;
    category: string;
    quantity: number;
    farmer: string;
    distributor: string;
    retailer: string;
};

type UpdateQuantityParams = {
    productId: number;
    newQuantity: number;
};

type UpdateProductStateParams = {
    productId: number;
    state: State;
};

type GetProductDetailsParams = {
    productId: number;
};

type RequestBody = {
    action: 'createProduct' | 'updateQuantity' | 'updateProductState' | 'getProductDetails';
    params: CreateProductParams | UpdateQuantityParams | UpdateProductStateParams | GetProductDetailsParams;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'POST':
            const { action, params } = req.body as RequestBody;

            try {
                let transaction;

                switch (action) {
                    case 'createProduct':
                        const createParams = params as CreateProductParams;
                        transaction = await contract.createProduct(
                            createParams.name,
                            createParams.price,
                            createParams.description,
                            createParams.category,
                            createParams.quantity,
                            createParams.farmer,
                            createParams.distributor,
                            createParams.retailer
                        );
                        await transaction.wait();

                        await prisma.product.create({
                            data: {
                                name: createParams.name,
                                price: createParams.price,
                                description: createParams.description,
                                category: createParams.category,
                                quantity: createParams.quantity,
                                farmer: createParams.farmer,
                                distributor: createParams.distributor,
                                retailer: createParams.retailer,
                                state: State.CREATED,
                            }
                        });

                        res.status(200).json({ success: true });
                        break;

                    case 'updateQuantity':
                        const updateParams = params as UpdateQuantityParams;
                        transaction = await contract.updateQuantity(updateParams.productId, updateParams.newQuantity);
                        await transaction.wait();

                        await prisma.product.update({
                            where: { id: updateParams.productId },
                            data: { quantity: updateParams.newQuantity }
                        });

                        res.status(200).json({ success: true });
                        break;

                    case 'updateProductState':
                        const stateParams = params as UpdateProductStateParams;
                        transaction = await contract.updateProductState(stateParams.productId, stateParams.state);
                        await transaction.wait();

                        await prisma.product.update({
                            where: { id: stateParams.productId },
                            data: { state: stateParams.state, updatedAt: new Date() }
                        });

                        res.status(200).json({ success: true });
                        break;

                    case 'getProductDetails':
                        const getParams = params as GetProductDetailsParams;
                        const productId = getParams.productId;

                        // Fetch product details from the blockchain
                        const productFromChain = await contract.products(productId);
                        const productDetails = {
                            id: productFromChain.id.toNumber(),
                            name: productFromChain.name,
                            price: productFromChain.price.toNumber(),
                            description: productFromChain.description,
                            category: productFromChain.category,
                            quantity: productFromChain.quantity.toNumber(),
                            farmer: productFromChain.farmer,
                            distributor: productFromChain.distributor,
                            retailer: productFromChain.retailer,
                            state: productFromChain.state,
                            createdAt: new Date(productFromChain.createdAt.toNumber() * 1000),
                            updatedAt: new Date(productFromChain.updatedAt.toNumber() * 1000)
                        };

                        // Fetch product details from the database
                        const productFromDB = await prisma.product.findUnique({
                            where: { id: productId }
                        });

                        res.status(200).json({ productFromChain: productDetails, productFromDB });
                        break;

                    default:
                        res.status(400).json({ error: 'Invalid action' });
                        break;
                }
            } catch (error) {
                res.status(500).json({ error: (error as Error).message });
            }
            break;

        default:
            res.status(405).json({ error: `Method ${method} not allowed` });
            break;
    }
}
