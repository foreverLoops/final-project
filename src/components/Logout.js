import { signOut } from 'firebase/auth';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from './firebase/firebase';


export default function Logout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/");
            console.log("you are logged out!");
        } catch (error) {
            console.error("Error logging out: ", error.message);
        }
    }

    return (

        <li onClick={handleLogout} className='hover:bg-black px-4 py-2 rounded-t-md cursor-pointer'>LOGOUT</li>

    )
}
