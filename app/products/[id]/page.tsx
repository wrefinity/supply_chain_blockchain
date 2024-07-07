'use client'
// import ButtonActions from '@/app/components/Products/ButtonActions'
// import React from 'react'

// const ProductDetail = () => {
//   return (
//     // <div className='my-8'>
//     //   {/* <h2 className='text-2xl font-bold my-4'> Product </h2> */}

//     //   <div className="card card-side bg-base-100 shadow-xl w-full">
//     //     <figure>
//     //       <img
//     //         src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
//     //         alt="Movie" />
//     //     </figure>
//     //     <div className="card-body">
//     //       <h2 className="card-title">New movie is released!</h2>
//     //       <p>Click the button to watch on Jetflix app.</p>
//     //       <div className="card-actions justify-end">
//     //         <ButtonActions/>
//     //         <button className="btn btn-primary">Order</button>
//     //       </div>
//     //     </div>
//     //   </div>
//     // </div>
    
//   )
// }

// export default ProductDetail

// pages/product/[id].tsx
import { useRouter, useSearchParams } from 'next/navigation';
import ProductDetails from '../../components/Products/ProductDetails';
import ProductStateChange from '../../components/Products/ProductStateChange';

const ProductPage = ({params}: {params: {id: any}}) => {
    const router = useRouter();
    // const searchParams = useSearchParams();
    // const { id } = searchParams;

    if (!params.id) return <div>Loading...</div>;

    return (
        <div className="product-page">
            <ProductDetails productId={parseInt(params.id as string, 10)} />
            <ProductStateChange productId={parseInt(params.id as string, 10)} />
        </div>
    );
};

export default ProductPage;

