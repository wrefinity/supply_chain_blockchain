"use client"
import ProductForm from '@/app/components/Products/ProductForm'
import { ProductIF } from '@/types'
import React from 'react'
import { SubmitHandler } from 'react-hook-form'

const Product = () => {
  const handleProductCreate:SubmitHandler<ProductIF> = (data)=>{
    console.log(data)
  }
  return (
    <div>
        <h2 className='text-2xl my-4 font-bold text-center'>Create Product</h2>
      <ProductForm submit={handleProductCreate} isEditing={false}/>
    </div>
  )
}

export default Product
