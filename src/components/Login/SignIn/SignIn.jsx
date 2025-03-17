import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleSignInUser } from '../../../features/Auth/SignUp/SignUp';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../config/firebase';

import Swal from 'sweetalert2'
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SignIn() {

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const { user, status, error } = useSelector((state) => state.auth)
    const currentMode = useSelector((state) => state.mode.currentMode)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(handleSignInUser({ email: userEmail, password: userPassword }))
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                Swal.fire({
                    title: "Signed In Successfully !",
                    icon: "success",
                    draggable: true
                }).then(() => {
                    navigate('/')
                })
            }
        });

    }, [auth]);

    // if our login is failed , then popup this message
    if (status == "failed") {
        toast("Something went wrong")
    }

    return (
        <>
            <div className={`signUpBody h-screen w-full flex justify-center items-center mt-5 text-red 
                ${currentMode == 'dark' ? 'bg-[#0F1214] text-white' : 'bg-[#dadada] text-black'}`}>
                <div className={`xl:h-150 xl:w-280 w-[90vw] md:w-[60vw] h-auto py-10  xl:py-0 rounded-2xl flex
                   ${currentMode == 'dark' ? 'bg-[#ebebeb] text-white' : 'bg-white text-black border-1'} `}>

                    <div className='w-1/2 h-full bg-gray-800 rounded-l-2xl hidden xl:flex flex-col items-center justify-center gap-20 '>
                        <div className='text-center'>
                            <h1 className='text-white text-4xl'>Welcome Again to MetaMart !</h1> <br />
                            <p className='text-3xl text-white'>Please login to your account</p>
                        </div>
                        <img src="login.svg" alt="" className='w-70' />
                    </div>

                    <div className='w-[80vw] mx-auto xl:w-1/2 md:py-15 lg:py-25 h-full rounded-2xl flex items-center justify-center text-black'  >
                        <div className="w-full max-w-sm p-6 rounded-lg ">
                            <h2 className="text-5xl font-semibold text-center text-gray-900">Sign In</h2>
                           
                            <form className="mt-4" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Email</label>
                                    <input type="email" className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email"
                                        value={userEmail} required
                                        onChange={(e) => setUserEmail(e.target.value)} />
                                </div>

                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-600">Password</label>
                                    <input type="password" className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your password"
                                        value={userPassword} required
                                        onChange={(e) => setUserPassword(e.target.value)} />
                                </div>

                                <button className="w-full px-4 py-2 mt-4 cursor-pointer font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-600" type="submit" >Login</button>
                            </form>

                            <div className="mt-4 text-center text-gray-500">OR</div>

                            <div className="mt-4">
                                <p className='text-[19px] mt-3 text-center'>Create an Account ?
                                    <NavLink to='/signup' className='text-blue-600'> SignUp</NavLink>
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default SignIn;
