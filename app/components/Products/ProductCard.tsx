import Link from 'next/link'
import React from 'react'

const ProductCard = () => {
    return (
        <div className="card w-full bg-base-100 shadow-xl border">
            <figure>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                    <Link href={"/products/1"}>
                        <button className="btn btn-primary">Buy Now</button>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default ProductCard
