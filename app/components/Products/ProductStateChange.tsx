import React, { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

interface ProductStateChangeProps {
    productId: number;
}

interface StateChangeForm {
    state: number;
}

const ProductStateChange: FC<ProductStateChangeProps> = ({ productId }) => {
    const { register, handleSubmit } = useForm<StateChangeForm>();

    const onSubmit: SubmitHandler<StateChangeForm> = async (data) => {
        try {
            const response = await axios.post('/api/interact', {
                action: 'updateProductState',
                params: {
                    productId,
                    state: data.state,
                }
            });

            if (response.data.success) {
                alert('Product state updated successfully!');
            } else {
                alert('Failed to update product state');
            }
        } catch (error) {
            console.error('Error updating product state:', error);
            alert('An error occurred while updating the product state.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center justify-center gap-5 mt-10'>
            <select {...register("state", { required: true })} className="select select-bordered w-full max-w-lg">
                <option value="0">Created</option>
                <option value="1">In Transit</option>
                <option value="2">Delivered</option>
            </select>
            <button type="submit" className='btn btn-primary w-full max-w-lg'>
                Change Product State
            </button>
        </form>
    );
};

export default ProductStateChange;
