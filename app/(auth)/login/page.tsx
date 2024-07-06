import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { LoginIF } from '@/types';

const LoginPage: React.FC = () => {
  const { register, handleSubmit } = useForm();

  const submit : SubmitHandler<LoginIF> = (data: LoginIF) => {
    console.log(data);
  };
  return (

    <div>
      <form onSubmit={handleSubmit(submit)} className='flex flex-col items-center justify-center gap-5 mt-10'>
        <div className='bg-neutral-100 p-5 w-full max-w-lg'>
          <h2 className='text-2xl my-4 font-bold text-center'>Login</h2>
        </div>

        <input
          {...register("email", { required: true })}
          type="text"
          placeholder="enter email"
          className="input input-bordered w-full max-w-lg" />
        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="password"
          className="input input-bordered w-full max-w-lg" />

        <button type='submit' className='btn btn-primary w-full max-w-lg'> Login</button>

      </form>
    </div>
  )
}

export default LoginPage
