'use client';
import React, { FC } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { ProductIF } from '@/types';

interface ProductFormProps {
    submit: SubmitHandler<ProductIF>,
    isEditing:boolean
}


const ProductForm: FC<ProductFormProps> = ({ submit, isEditing }) => {

    const { register, handleSubmit } = useForm<ProductIF>()
    // const submit = (data:any)=>console.log(data)
    return (
        <form onSubmit={handleSubmit(submit)} className='flex flex-col items-center justify-center gap-5 mt-10'>

            <input
                type="text"
                {...register("name", { required: true })}
                placeholder="product name..."
                className="input input-bordered w-full max-w-lg" />
            <input
                type="text"
                {...register("price", { required: true })}
                placeholder="product price..."
                className="input input-bordered w-full max-w-lg" />
            <input
                type="text"
                {...register("quantity", { required: true })}
                placeholder="product quantity"
                className="input input-bordered w-full max-w-lg" />

            <select
                {...register("category", { required: true })}
                defaultValue={""}
                className="select select-bordered w-full max-w-lg">
                <option disabled value={""}> product category</option>
                <option>Grains</option>
                <option>Legumes</option>
                <option>Tubers</option>
            </select>

            <textarea
                {...register("description", { required: true })}
                className="textarea textarea-bordered w-full max-w-lg"
                placeholder="product descriptions"></textarea>
            <button type="submit" className='btn btn-primary w-full max-w-lg'> {isEditing ? "Edit": "Create"} Farm Product</button>

        </form>
    )
}

export default ProductForm
