import Link from 'next/link'
import React from 'react'

const NavBar = () => {
    return (
        <div className="navbar bg-neutral-100">

            <div className='container'>
                <div className="flex-1">
                    <Link className="btn btn-ghost text-xl" href={"/"}>P-Track</Link>
                </div>
                <div className="flex-none ">
                    <ul className="menu menu-horizontal px-1 justify-items-left">
                        <li><a>About</a></li>
                        <li><Link href={"/products/create"}>create product</Link></li>
                        <li><Link href={"/register"}>SignUp</Link></li>
                        {/* <li>
                            <details>
                                <summary>Auth</summary>
                                <ul className="bg-base-100 rounded-t-none p-2">
                                    <li><Link href={"/login"}>Login</Link></li>
                                    <li><Link href={"/register"}>SignUp</Link></li>
                                </ul>
                            </details>
                        </li> */}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavBar
