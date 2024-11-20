import React, { useState } from 'react';
import { auth, db, githubSignin, googleSignin } from "../components/firebase/firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
// import logo from "../media/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';




export default function OrgSignUp() {
    const [orgName, setOrgName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [organizationName, setOrganizationName] = useState('');
    // const [organizationEmail, setOrganizationEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    // const [ownerName, setOwnerName] = useState('');
    const [address, setAddress] = useState('');
    // const [productType, setProductType] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const formFields = [
        {
            label: 'Owner Name',
            type: 'text',
            placeholder: 'Full Name',
            value: orgName,
            onChange: (e) => setOrgName(e.target.value),
        },
        {
            label: 'Organization Name',
            type: 'text',
            placeholder: 'Organization Name',
            value: organizationName,
            onChange: (e) => setOrganizationName(e.target.value),
        },
        {
            label: 'Organization Email',
            type: 'email',
            placeholder: 'Organization Email',
            value: email,
            onChange: (e) => setEmail(e.target.value),
        },
        {
            label: 'Phone Number',
            type: 'tel',
            placeholder: 'Phone Number',
            value: phoneNumber,
            onChange: (e) => setPhoneNumber(e.target.value),
        },
        {
            label: 'Physical Address',
            type: 'textarea',
            placeholder: 'Physical Address',
            value: address,
            onChange: (e) => setAddress(e.target.value),
        },
        // {
        //     label: 'Type of Products',
        //     type: 'select',
        //     options: ['Apparel', 'Handicrafts', 'Electronics', 'Other'],
        //     value: productType,
        //     onChange: (e) => setProductType(e.target.value),
        //     isMulti: true,
        // },
        {
            label: 'Password',
            type: 'password',
            placeholder: 'Password',
            value: password,
            onChange: (e) => setPassword(e.target.value),
            pattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
        },
        {
            label: 'Confirm Password',
            type: 'password',
            placeholder: 'Confirm Password',
            value: confirmPassword,
            onChange: (e) => setConfirmPassword(e.target.value),
        },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save organization data with userType as "organisation"
            await setDoc(doc(db, "users", user.uid), {
                orgName: orgName,
                email: email,
                userType: "organisation"
            });

            navigate('/orgportal');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogleSignin = async () => {
        await googleSignin();
        navigate('/userportal');
    }
    const handleGithubSignin = async () => {
        await githubSignin();
        navigate('/userportal');
    }

    return (
        <div className='bg-gradient-to-tl from-[#6CBE02] via-black via-[70%] to-black h-[100vh] w-full flex'>

            <motion.div
                initial={{ rotateY: -90 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 1.5 }}
                className='w-[55%] h-[100%] flex flex-col justify-end items-end'
            >
                <div className='no-scrollbar bg-[#02be95] w-[40vw] h-[92vh] overflow-y-auto  rounded-t-lg shadow-white shadow-sm pt-4 pb-4'>
                    <h1 className='text-white text-3xl font-bold text-center pb-2'>Org Sign Up</h1>

                    {error && <p className="text-red-500 text-center">{error}</p>}

                    <form onSubmit={handleSubmit} className='flex flex-col w-[80%] mx-auto'>
                        {formFields.map((field, index) => (
                            <div key={index} className="flex flex-col w-[100%] mx-auto">
                                <label htmlFor={field.label.toLowerCase().replace(' ', '-')}>{field.label}</label>
                                <input
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    value={field.value}
                                    onChange={field.onChange}
                                    className='mb-3 rounded-md py-2 placeholder:px-2 focus:outline-none focus:px-2 px-2'
                                    pattern={field.pattern || undefined}
                                />
                            </div>
                        ))}
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
                        <li className='cursor-pointer px-4 py-2 rounded-md bg-white' onClick={handleGoogleSignin}><GoogleIcon /></li>
                        <li className='cursor-pointer px-4 py-2 rounded-md bg-white' onClick={handleGithubSignin}><GitHubIcon /></li>
                    </ul>
                    <p className='text-center mt-2'>
                        Are you a user?<Link to='/signup' className='text-blue-900 cursor-pointer '>Sign up here</Link>
                    </p>
                </div>
            </motion.div>

            {/* Right side  */}
            <div className='w-[55%] h-[100%] flex justify-center items-center'>
            {/* <img src={logo} alt="logo" /> */}
            <i className='bx bx-store text-[20rem] text-white'></i>
            <h1 className="text-white text-7xl font-bold">SHOP'SPHERE</h1>
          </div>
        </div>
    );
}
