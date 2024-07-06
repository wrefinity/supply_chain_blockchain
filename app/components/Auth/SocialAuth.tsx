import React from 'react'
import {socialLogins} from "../../utils/helpers"
const SocialAuth = () => {
  return (
    <div  className='flex flex-col items-center justify-center gap-5 mt-10'>

{/*  */}
      <form  action={socialLogins}>
        <h2 className='text-1xl font-bond text-center mb-2'> Social Authentication</h2>
      <button className='btn btn-danger w-full max-w-lg m-2 bg-pink-600 text-lime-50' name="action" value="google">SignIn with Google</button>
      <button className='btn btn-success w-full max-w-lg m-2' name="action" value="github">SignIn with Github</button>

      </form>
    </div>
  )
}

export default SocialAuth
