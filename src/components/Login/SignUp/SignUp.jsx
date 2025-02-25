import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { handleCreateUser, handleSignInWithGoogle } from '../../../features/Auth/SignUp/SignUp';
import { auth } from '../../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

import Swal from 'sweetalert2'

function SignUp() {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const { user, email, password, status } = useSelector((state) => state.auth)
    // console.log(user ? (user) : ("user not found"))

    console.log("status", status)

    if (status == 'succeeded') {
        Swal.fire({
            title: "Signed Up Successfully !",
            icon: "success",
            draggable: true
        });
    }

    const dispatch = useDispatch()


    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("Data ", userEmail, userPassword)
        dispatch(handleCreateUser({ email: userEmail, password: userPassword }));
    }

    const handleWithgoogle = () => {
        dispatch(handleSignInWithGoogle())
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                //     console.log(user)
                //   const uid = user.uid;
                //   console.log(uid)
                //   console.log(user.email)
                //   console.log(user.displayName)
                //   console.log(user.photoURL)
            } else {
                console.log('user is logged out')
            }
        });

    }, [auth]);


    console.log(email && "this is email", email)
    return (
        <>
            <div className='h-screen w-full flex justify-center items-center mt-5 text-white'>
                <div className='h-150 w-280 lg:bg-gray-300 rounded-2xl flex'>
                    <div className='w-1/2 h-full bg-gray-800 rounded-l-2xl hidden lg:flex flex-col items-center justify-center gap-20 '>
                        <div className='text-center'>
                            <h1 className='text-white text-5xl'>Welcome to MetaMart !</h1> <br />
                            <p className='text-2xl'>Please Login To Continue Shopping</p>
                        </div>
                        <img src="login.svg" alt="" className='w-70' />
                    </div>
                    <div className='w-[90vw] mx-auto lg:w-1/2 h-full bg-white rounded-2xl flex items-center justify-center text-black' >
                        <div className="w-full max-w-sm p-6 bg-white rounded-lg ">
                            <h2 className="text-4xl font-semibold text-center text-gray-800">Sign Up</h2>

                            <form className="mt-4" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Email</label>
                                    <input type="email" className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email"
                                        value={userEmail}
                                        onChange={(e) => setUserEmail(e.target.value)} />
                                </div>

                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-600">Password</label>
                                    <input type="password" className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your password"
                                        value={userPassword}
                                        onChange={(e) => setUserPassword(e.target.value)} />
                                </div>

                                <button className="w-full px-4 py-2 mt-4 font-semibold text-white bg-gray-800 rounded-lg hover:bg-blue-600" type="submit" >Login</button>
                            </form>

                            <div className="mt-4 text-center text-gray-500">OR</div>

                            <div className="mt-4 text-center">
                                <button className="flex items-center justify-center gap-5 w-full px-4 py-2 font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"
                                    onClick={handleWithgoogle}>
                                    <img src="google.png" alt="" className='w-5 ' />
                                    Login with Google
                                </button>
                                <button className=" flex items-center justify-center gap-5 w-full px-4 py-2 mt-2 font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800">
                                    <img src="facebook.png" alt="" className='w-5' />
                                    Login with Facebook</button>
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
