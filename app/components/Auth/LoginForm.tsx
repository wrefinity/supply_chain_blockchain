import React from 'react'

const LoginForm = () => {
  return (
    <div>
      <form className='flex flex-col items-center justify-center gap-5 mt-10'>
      <div className='bg-neutral-100 p-5 w-full max-w-lg'>
        <h2 className='text-2xl my-4 font-bold text-center'>SignIn</h2>
      </div>

        <input
          type="text"
          placeholder="enter email"
          className="input input-bordered w-full max-w-lg" />
        <input
          type="password"
          placeholder="password"
          className="input input-bordered w-full max-w-lg" />

        <button className='btn btn-primary w-full max-w-lg bg-green-600 text-white border-green-600'> Login Now!!!</button>
      </form>
    </div>

  )
}

export default LoginForm
