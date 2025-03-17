import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { handleCreateUser, handleSignInWithGoogle } from '../../../features/Auth/SignUp/SignUp';
import { auth } from '../../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

import Swal from 'sweetalert2'
import { toast } from 'react-toastify';

function SignUp() {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const currentMode = useSelector((state) => state.mode.currentMode)
    const { user, email, password, status } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    if (status == 'succeeded') {
        Swal.fire({
            title: "Signed Up Successfully !",
            icon: "success",
            draggable: true
        });
    }

    // if our Sign Up is failed , then popup this message
    if (status == "failed") {
        toast("Something went wrong")
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(handleCreateUser({ email: userEmail, password: userPassword }));
    }

    const handleWithgoogle = () => {
        dispatch(handleSignInWithGoogle())
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                //when user is successfully signed up , then redirect to homepage
                navigate('/')
            }
        });
    }, [auth]);


    return (
        <>
            <div className={`signUpBody h-screen w-full flex justify-center items-center mt-5 text-red 
                ${currentMode == 'dark' ? 'bg-[#0F1214] text-white' : 'bg-[#dadada] text-black'}`}>

                <div className={`xl:h-150 xl:w-280 w-[90vw] md:w-[60vw] h-auto py-10  xl:py-0 rounded-2xl flex
                   ${currentMode == 'dark' ? 'bg-[#ebebeb] text-white' : 'bg-white text-black border-1'} `}>

                    <div className='w-1/2 h-full bg-gray-800 rounded-l-2xl hidden xl:flex flex-col items-center justify-center gap-20 '>
                        <div className='text-center'>
                            <h1 className='text-white text-5xl'>Welcome to MetaMart !</h1> <br />
                            <p className='text-2xl text-white'>Please Create an account</p>
                        </div>
                        <img src="login.svg" alt="" className='w-70' />
                    </div>

                    <div className='w-[80vw] mx-auto xl:w-1/2 md:py-15 lg:py-25 h-full rounded-2xl flex items-center justify-center text-black' >
                        <div className="w-full max-w-sm p-6 rounded-lg ">
                            <h2 className="text-3xl lg:text-4xl font-semibold text-center text-gray-800">Create an Account</h2>

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

                                <button className="w-full px-4 py-2 mt-4 font-semibold text-white hover:bg-gray-800 rounded-lg bg-blue-600 cursor-pointer" type="submit" >Create Account</button>
                            </form>

                            <div className="mt-4 text-center text-gray-500">OR</div>

                            <div className="mt-4 text-center">
                                <button className="flex items-center justify-center gap-5 w-full px-4 py-2 font-semibold text-black bg-gray-100 border-2 rounded-lg hover:bg-gray-300 cursor-pointer"
                                    onClick={handleWithgoogle}>
                                    <img src="google.png" alt="" className='w-5 ' />
                                    Continue with Google
                                </button>
                                <p className='text-[19px] mt-3'>already have an account ?
                                    <NavLink to='/signin' className='text-blue-600'> SignIn</NavLink>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;
