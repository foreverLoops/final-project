import React, { useState } from 'react';
// import logo from "../media/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {auth, db, googleSignin} from "../components/firebase/firebase"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { doc, setDoc } from 'firebase/firestore';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();


  const handleSubmit = async (e) =>{
    e.preventDefault();

    if(password !== confirmPassword){
      setError("Passwords do not match");
      return;
    }

    try{
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        userType: 'user'
      })

      navigate('/');
      console.log("You have signed up!")
    }catch(error){
      setError(error.message);
    }
  };

  const handleGoogleSignin = async () => {
    await googleSignin();
    navigate('/userportal');
  }

  return (
    <div className='bg-gradient-to-tl from-[#6CBE02] via-black via-[70%] to-black h-[100vh] w-full flex'>
      
      <motion.div
        initial={{ rotateY: 90 }}
        animate={{ rotateY: 0 }}
        transition={{ duration: 1.5}}
        className='w-[55%] h-[100%] flex flex-col justify-end items-end'
      >
        <div className='bg-[#6CBE02] w-[40vw] h-fit rounded-t-lg shadow-white shadow-sm pt-4 pb-4'>
          <h1 className='text-white text-3xl font-bold text-center pb-2'>Sign Up</h1>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className='flex flex-col w-[80%] mx-auto'>
            <label htmlFor="name">Full Name</label>
            <input 
            type="text" 
            placeholder='Full Name' 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='mb-3 rounded-md py-2 placeholder:px-2 focus:outline-none focus:px-2 px-2'
            />

            <label htmlFor="email">Email</label>
            <input 
            type="text" 
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            className='mb-3 rounded-md py-2 placeholder:px-2 focus:outline-none focus:px-2 px-2' 
            />

            <label htmlFor="password">Password</label>
            <input 
            type="password" 
            placeholder='Password' 
            security='password' 
            pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='mb-3 rounded-md py-2 placeholder:px-2 focus:outline-none focus:px-2 px-2' 
            />

            <label htmlFor="password">Confirm Password</label>
            <input 
            type="password" 
            placeholder='Confirm Password' 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='mb-3 rounded-md py-2 placeholder:px-2 focus:outline-none focus:px-2 px-2' 
            />

            <button 
            type='submit' 
            className='bg-black text-white py-2 rounded-md mt-4'>Sign Up</button>
          </form>

          <p className='text-black text-center mt-4'>
            Already have an account? 
            <Link to='/' className='text-blue-900 cursor-pointer'>Sign in</Link>
          </p>
          <p className='text-black text-center py-2'>or</p>
          <ul className='flex justify-center items-center space-x-5'>
            <li className='cursor-pointer px-4 py-2 rounded-md bg-white' onClick={handleGoogleSignin}><GoogleIcon/></li>
            <li className='cursor-pointer px-4 py-2 rounded-md bg-white'><GitHubIcon/></li>
          </ul>
          <p className='text-center mt-2'>
          Are you an organisation?<Link to='/orgsignup' className='text-blue-900 cursor-pointer '>Sign up here</Link>
          </p>
        </div>
      </motion.div>

 
      <div className='w-[55%] h-[100%] flex justify-center items-center'>
        {/* <img src={logo} alt="logo" /> */}
        <i className='bx bx-store text-[20rem] text-white'></i>
        <h1 className="text-white text-7xl font-bold">SHOP'SPHERE</h1>
      </div>
    </div>
  );
}
