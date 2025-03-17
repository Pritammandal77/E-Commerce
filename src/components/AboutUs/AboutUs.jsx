import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function AboutUs() {

    const currentMode = useSelector((state) => state.mode.currentMode)

    return (
        <>
            <div className={`mt-14 text-justify flex flex-col gap-20 lg:gap-0 items-center
                ${currentMode == 'dark' ? "bg-[#0F1214] text-white" : "bg-[#dadada] text-black"}`} >

                <div className='flex flex-col-reverse lg:flex-row items-center lg:py-30'>
                    <div className='w-[90vw] lg:w-[50vw] flex flex-col justify-center items-center gap-3 lg:pl-20'>
                        <h1 className="text-5xl lg:text-6xl font-bold self-start bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text">About AuraMart</h1>
                        <p className="text-xl mb-4">
                            <strong>AuraMart</strong> is a modern E-Commerce platform built with React.js & Firebase , designed to provide a smooth and user-friendly shopping experience. This app allows users to explore various products, search product according to their choice , Login & logout feature , add items to their cart saved on cloud firestore, Order Products & view order history and manage their purchases effortlessly .
                            <br />   This website is created only for learning purpose , all the products in this website are fake , the prodcts are from dummyJSON API
                        </p>
                        <NavLink to="/" className="self-center lg:self-start">
                            <button className=" cursor-pointer text-[18px] px-3 py-3 text-white font-bold rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 transition duration-300">
                                Start Shopping
                            </button>
                        </NavLink>

                    </div>
                    <div className='w-[80vw] h-[40vh] lg:height-auto lg:w-[40vw] flex justify-center items-center '>
                        <img src="aboutPage1.svg" alt="image not found" className='h-120' />
                    </div>
                </div>

                <div className='h-auto flex flex-col-reverse lg:flex-row items-center lg:py-30'>
                    <div className='hidden w-[80vw] h-[40vh] lg:height-auto lg:w-[40vw] lg:flex justify-center items-center '>
                        <img src="techStack.svg" alt="" className='h-120' />
                    </div>
                    <div className='w-[90vw] lg:w-[50vw] flex flex-col justify-center items-center gap-3 '>
                        <h1 className="text-4xl lg:text-5xl font-bold  bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text">Tech Stack</h1>
                        <ul className="list-disc pl-6 text-[19px]">
                            <li><strong>Frontend:</strong> React.js, Redux.js ,Tailwind CSS</li>
                            <li><strong>Backend:</strong> Firebase (for authentication & database)</li>
                            <li><strong>API:</strong> Dummy JSON API for product data</li>
                            <li> <b>Others</b> : font awesome icon , uiverse.io , react toastify, swalalert</li>
                        </ul>
                    </div>

                </div>

                <div className='h-auto flex flex-col-reverse lg:flex-row items-center lg:py-30 mb-20'>
                    <div className='w-[90vw] lg:w-[50vw] flex flex-col justify-center items-center gap-3 '>
                        <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text">Key Features</h1>
                        <ul className="list-disc pl-6 text-[19px]">
                            <li>Browse and search products</li>
                            <li>View products by Categories</li>
                            <li>View product details</li>
                            <li>Firebase authentication (SignIn/SignUp)</li>
                            <li>Add products to the cart</li>
                            <li>Order Products</li>
                            <li>Order history</li>
                            <li>Dark & light mode</li>
                            <li>Dynamic UI with smooth user interactions</li>
                            <li>Responsive design for all devices</li>
                        </ul>
                    </div>
                    <div className='hidden w-[80vw] h-[40vh] lg:height-auto lg:w-[40vw] lg:flex justify-center items-center '>
                        <img src="features.svg" alt="image not found" className='h-120' />
                    </div>
                </div>

            </div>
        </>
    );
}

export default AboutUs;
