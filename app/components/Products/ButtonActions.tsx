import React from 'react'
import {Pencil, Trash} from "lucide-react"
import Link from 'next/link'

const ButtonActions = () => {
  return (
    <div>
        <Link href={"product/id/edit"} className='btn mr-2'>
        <Pencil/> Edit
        </Link>

        <button className='btn btn-error'>
            <Trash /> Delete
        </button>
      
    </div>
  )
}

export default ButtonActions
