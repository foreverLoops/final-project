import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Logout from '../components/Logout'

export default function OrgPortal() {
    return (
        <div>
            <nav className='bg-[#6CBE02]'>
                <h1 className='text-3xl font-bold mb-10 pt-3 pl-3'>MY ACCOUNT</h1>
                <ul className='flex text-white font-bold space-x-5 pl-1'>
                    <Link to={"/orgportal/orginfo"}><li className='hover:bg-black px-4 py-2 rounded-t-md cursor-pointer'>ORGANISATION INFO</li></Link>
                    <Link to={"/orgportal/sold"}><li className='hover:bg-black px-4 py-2 rounded-t-md cursor-pointer'>SOLD</li></Link>
                    <Link to={"/shopitems"}><li className='hover:bg-black px-4 py-2 rounded-t-md cursor-pointer'>SHOP</li></Link>
                    <Logout/>
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}
