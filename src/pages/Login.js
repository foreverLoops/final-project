// import logo from "../media/logo.png";
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';
import { auth, db, googleSignin } from "../components/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { doc, getDoc } from "firebase/firestore";

export default function Login({userType,setUserType}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));

      if(userDoc.exists()){
        const userType = userDoc.data().userType;
        setUserType(userType); // Update userType in App

        if(userType === 'user'){
          navigate('/userportal'); 
          console.log("User logged in!");
        } else if(userType === 'organisation'){
          navigate('/orgportal');
          console.log("Organisation logged in!");
        } else {
          setError("Invalid user type.");
        }
        
      } else {
        setError("Login data not found.");
      }
    } catch (error) {
      setError(error.message); 
    }
  };
  const handleGoogleSignin = async () => {
    await googleSignin();
    navigate('/userportal');
    console.log("User logged in!");
  }
  const githubSignin = async () => {
    await googleSignin();
    navigate('/userportal');
    console.log("User logged in!");
  }

  return (
    <div className='bg-gradient-to-tr from-[#6CBE02] via-black via-[70%] to-black h-[100vh] w-full flex'>

      <div className='w-[55%] h-[100%] flex justify-center items-center'>
        {/* <img src={logo} alt="logo" /> */}
        <i className='bx bx-store text-[20rem] text-white'></i>
        <h1 className="text-white text-7xl font-bold">SHOP'SPHERE</h1>
      </div>

      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: -300 }}
        transition={{ duration: 0.5 }}
        className='w-[55%] h-[100%] flex flex-col justify-end items-end'
      >


        <div className='w-[55%] h-[80%] flex flex-col justify-end'>
          <div className='bg-[#6CBE02] w-[40vw] h-[90vh] rounded-t-lg shadow-white shadow-sm pt-10'>
            <h1 className='text-white text-3xl font-bold text-center pb-12'>Sign In</h1>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className='flex justify-center items-center space-x-4'>
              {/* <span
               
               className={`p-2 rounded-md cursor-pointer text-black ${userType === 'user' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' : 'border-2 border-white'}`}
               onClick={() => setUserType('user')}>User</span>
              <span 
              className={`p-2 rounded-md cursor-pointer text-black ${userType === 'organisation' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' : 'border-2 border-white'}`}
              onClick={() => setUserType('organisation')}>Organisation</span> */}
            </div>

            <form onSubmit={handleLogin} className='flex flex-col w-[80%] mx-auto'>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='mb-4 rounded-md py-2 placeholder:px-2 focus:outline-none focus:px-2 px-2' />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='mb-4 rounded-md py-2 placeholder:px-2 focus:outline-none focus:px-2 px-2' />
              <p>forgot password?</p>

              <button type='submit' className='bg-black text-white py-2 rounded-md mt-4'>Sign in</button>
            </form>
            <p className='text-black text-center mt-4'>Don't have an account?{""}
              <Link to='/signup' className='text-blue-900 cursor-pointer'>Register for free</Link></p>

            <p className='text-black text-center py-2'>or</p>
            <ul className='flex justify-center items-center space-x-5'>
              <li className='cursor-pointer px-4 py-2 rounded-md bg-white' onClick={handleGoogleSignin}><GoogleIcon /></li>
              <li className='cursor-pointer px-4 py-2 rounded-md bg-white' onClick={githubSignin}><GitHubIcon /></li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
