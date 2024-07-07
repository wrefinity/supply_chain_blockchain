// components/ProductDetails.tsx
'use client'
import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';

interface ProductDetailsProps {
    productId: number;
}

const ProductDetails: FC<ProductDetailsProps> = ({ productId }) => {
    const [product, setProduct] = useState<any>(null);

    console.log('productId:', productId);
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.post('/api/interact', {
                    action: 'getProductDetails',
                    params: { productId }
                });
                if (response.data.success) {
                    setProduct(response.data.product);
                } else {
                    alert('Failed to fetch product details');
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
                alert('An error occurred while fetching product details.');
            }
        };

        fetchProductDetails();
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col ">
            <h1 className='text-2xl font-bold'>Product Details</h1>
            <p>Name: {product.name}</p>
            <p>Price: {product.price}</p>
            <p>Category: {product.category}</p>
            <p>Description: {product.description}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Farmer: {product.farmer}</p>
            <p>Distributor: {product.distributor}</p>
            <p>Retailer: {product.retailer}</p>
            <p>State: {product.state}</p>
        </div>
    );
};

export default ProductDetails;
