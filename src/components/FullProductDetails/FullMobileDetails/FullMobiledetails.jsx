import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import NotFound from '../../NotFound/NotFound';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';

function FullMobiledetails() {
    let Index, mobilesData, fullMobilesData;

    try {
        //we are getting the index that we want , getting from MobileSlice.js
        Index = useSelector((state) => state.allMobiles.fullMobiledataIndex)
        // console.log(Index)

        //getting the full data of the mobile
        mobilesData = useSelector((state) => state.allMobiles)
        // console.log(mobilesData.mobilesData?.products[Index])

        //initailzing the full data to a variable , so we don't need to write the whole i.e, mobilesData.mobilesData?.products[Index]
        fullMobilesData = mobilesData.mobilesData?.products[Index];
        console.log(fullMobilesData)
    } catch (error) {
        console.log(error)
    }

    const changeMode = useSelector((state) => state.mode)
    console.log('mode in allproducts', changeMode.currentMode)

    let table = document.querySelector('.table')

    useEffect(() => {
        if (changeMode.currentMode == 'light') {
            let fullMobileData = document.querySelector(".fullMobileData")
            if (fullMobileData) {
                fullMobileData.style.backgroundColor = '#dadada'
                fullMobileData.style.color = 'black'
            }
                if (table) {
                    table.style.color = 'black'
                    table.style.backgroundColor = '#86efac'
                }
        
        }

        if (changeMode.currentMode == 'dark') {
            let fullMobileData = document.querySelector(".fullMobileData")

            if (fullMobileData) {
                fullMobileData.style.color = 'white'
                fullMobileData.style.backgroundColor = '#1e1e1e'
            }
            if (table) {
                table.style.color = 'white'
                table.style.backgroundColor = '#1e1e1e'
                table.style.border = "2px solid green";
            }

        }
    }, [changeMode.currentMode]);


    //for viewing full Image 
    const [viewFullMobileImage, setViewFullMobileImage] = useState(null)
    // let viewFullImage = fullMobilesData.images[0]
    const firstImage = () => {
        setViewFullMobileImage(fullMobilesData.images[0])
    }

    const secondImage = () => {
        setViewFullMobileImage(fullMobilesData.images[1])
    }

    const thirdImage = () => {
        setViewFullMobileImage(fullMobilesData.images[2])
    }
    return (
        <>
            {
                mobilesData.mobilesData?.products[Index] ? (
                    // true
                    <div className='fullMobileData flex flex-col lg:flex-row '>
                        <div className='w-screen lg:w-1/2 flex overflow-hidden p-5 lg:p-20 justify-center items-center flex-col'>
                            <div className='flex flex-col h-[40vh] justify-center gap-5 lg:justify-between items-center  p-10 rounded-2xl mt-10 lg:mt-0  lg:h-[70vh] '>

                                {/* <img src={fullMobilesData.images[0]} alt="" className='w-[50vw] lg:h-100 lg:w-auto' /> */}

                                <div className='bg-blue-300 h-[30vh] w-[80vw] lg:w-[30vw] flex justify-center items-center rounded-2xl lg:h-[50vh]'>
                                    <img src={viewFullMobileImage ? (viewFullMobileImage) : (fullMobilesData.images[0])} alt="" className='h-[27vw] lg:h-70 lg:w-auto' />
                                </div>
                                <div className=' flex w-[80vw] h-[10vh] justify-between items-center lg:w-1/2 lg:gap-5'>
                                    <div className='w-[22vw] h-[10vh] border flex justify-center items-center rounded-xl bg-amber-300' onClick={firstImage}>
                                        <img src={fullMobilesData.images[0]} alt="" className="h-[7vh]  " />
                                    </div>
                                    <div className='w-[22vw] h-[10vh] border flex justify-center items-center rounded-xl bg-yellow-300' onClick={secondImage}>
                                        <img src={fullMobilesData.images[1]} alt="" className="h-[7vh] " />
                                    </div>
                                    <div className='w-[22vw] h-[10vh] border flex justify-center items-center rounded-xl bg-yellow-300' onClick={thirdImage}>
                                        <img src={fullMobilesData.images[2]} alt="" className="h-[7vh] " />
                                    </div>
                                </div>
                            </div>
                            <div className='h-30 w-[90vw] lg:w-[35vw] flex items-center justify-evenly '>
                                <button className='bg-yellow-500 h-13 w-45 rounded-xl cursor-pointer text-xl font-bold flex justify-center items-center gap-3 hover:border-2 text-black'> <i className="fa-solid fa-cart-shopping"></i>Add To Cart</button>
                                <NavLink to='/buynow'>
                                    <button className='bg-yellow-500 h-13 w-45 rounded-xl cursor-pointer text-xl font-bold flex justify-center items-center gap-3 hover:border-2 text-black' > <i className="fa-solid fa-money-check"></i> Buy Now</button>
                                </NavLink>
                            </div>
                        </div>
                        <div className='w-screen lg:w-1/2 p-5 lg:p-20 flex flex-col gap-10 '>
                            <div className='h-auto flex flex-col justify-between '>
                                <p className='font-bold text-3xl'>{fullMobilesData.title}</p>
                                <p>{fullMobilesData.description}</p>
                                <div>
                                    <div className="RatingCard">
                                        <div className="ratingNum">
                                            <p className="count">4.5</p>
                                        </div>
                                        <div className="starIcon">
                                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="star">
                                                <g data-name="Layer 2">
                                                    <g data-name="star">
                                                        <rect
                                                            opacity="0"
                                                            transform="rotate(90 12 12)"
                                                            height="23"
                                                            width="23"
                                                        ></rect>
                                                        <path
                                                            d="M17.56 21a1 1 0 0 1-.46-.11L12 18.22l-5.1 2.67a1 1 0 0 1-1.45-1.06l1-5.63-4.12-4a1 1 0 0 1-.25-1 1 1 0 0 1 .81-.68l5.7-.83 2.51-5.13a1 1 0 0 1 1.8 0l2.54 5.12 5.7.83a1 1 0 0 1 .81.68 1 1 0 0 1-.25 1l-4.12 4 1 5.63a1 1 0 0 1-.4 1 1 1 0 0 1-.62.18z"
                                                        ></path>
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col w-70 justify-between h-15'>
                                    <span className='flex w-65 justify-between'>Special discount <p className='text-green-800'>{fullMobilesData.discountPercentage} %Off</p></span>
                                    <p className='text-2xl font-bold'> ₹ {Math.floor(fullMobilesData.price * 83)}</p>
                                </div>
                            </div>
                            <div className="w-full px-2 sm:px-4 overflow-x-auto">
                                <table className="table min-w-full text-left bg-green-300 border border-gray-300">
                                    <tbody>
                                        <tr>
                                            <td>Category</td>
                                            <td>{fullMobilesData.category}</td>
                                        </tr>
                                        <tr>
                                            <td>Brand</td>
                                            <td>{fullMobilesData.brand}</td>
                                        </tr>
                                        <tr>
                                            <td>Return Policy </td>
                                            <td>{fullMobilesData.returnPolicy}</td>
                                        </tr>
                                        <tr>
                                            <td>Shipping</td>
                                            <td>{fullMobilesData.shippingInformation}</td>
                                        </tr>
                                        <tr>
                                            <td>Stock</td>
                                            <td>{fullMobilesData.stock > 1 ? ("Available") : ("Not available")}</td>
                                        </tr>
                                        <tr>
                                            <td>Warrenty</td>
                                            <td>{fullMobilesData.warrantyInformation}</td>
                                        </tr>
                                        <tr>
                                            <td>Weight</td>
                                            <td>{fullMobilesData.weight * 28.3} g</td>
                                        </tr>
                                    </tbody>

                                </table>
                            </div>

                        </div>
                    </div>
                ) : (
                    <NotFound />
                )
            }
        </>
    );
}

export default FullMobiledetails;
