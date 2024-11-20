import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Logout from '../components/Logout'

export default function UserPortal() {
    return (
        <div>
            <nav className='bg-[#6CBE02]'>
                <h1 className='text-3xl font-bold mb-10 pt-3 pl-3'>MY ACCOUNT</h1>
                <ul className='flex text-white font-bold space-x-5 pl-1'>
                    <Link to={"/userportal/personalinfo"}><li className='hover:bg-black px-4 py-2 rounded-t-md cursor-pointer'>PERSONAL INFO</li></Link>
                    <Link to={"/userportal/orders"}><li className='hover:bg-black px-4 py-2 rounded-t-md cursor-pointer'>ORDERS</li></Link>
                    <Link to={"/userportal/wishlist"}><li className='hover:bg-black px-4 py-2 rounded-t-md cursor-pointer'>WISHLIST</li></Link>
                    <Link to={"/shopitems"}><li className='hover:bg-black px-4 py-2 rounded-t-md cursor-pointer'>SHOP</li></Link>
                    <Logout/>
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}
