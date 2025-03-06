import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchMobiles, setIndex } from '../../features/Mobiles/MobileSlice';
import { fetchShirts, setShirtIndex } from '../../features/Shirts/ShirtSlice';
import { fetchLaptops, setLaptopIndex } from '../../features/Laptops/LaptopSlice';
import { NavLink } from 'react-router-dom';
import ImageSlider from '../ImageSlider/ImageSlider';
import Skeleton from '../Loader/Skeleton/Skeleton';

function AllProducts() {

    const { isloading, shirtsData, isError } = useSelector((state) => state.allShirts); //the allShirts is geeting from the store , similarly to the remaining two i.e, allShirts & allMobiles
    // console.log(shirtsData)

    const laptopsData = useSelector((state) => state.allLaptops)
    // console.log(laptopsData.LaptopsData.products[0])

    const mobilesData = useSelector((state) => state.allMobiles)
    // console.log(mobilesData.mobilesData.products)

    const dispatch = useDispatch()  // dispatch se ham value bhejte hain

    useEffect(() => {
        dispatch(fetchMobiles())
        dispatch(fetchShirts())
        dispatch(fetchLaptops())
    }, [dispatch]);


    const handleSendComputerIndex = (index) => {
        dispatch(setIndex(index))   // we are sending the index to MobileSlice.js's setIndex function
    }

    const handleSendShirtsIndex = (index) => {
        dispatch(setShirtIndex(index))
    }

    const handleSendLaptopsIndex = (index) => {
        dispatch(setLaptopIndex(index))
    }


    const changeMode = useSelector((state) => state.mode)
    // console.log('mode in allproducts', changeMode.currentMode)

    if (changeMode.currentMode == 'light') {
        document.body.style.backgroundColor = '#dadada'
        document.body.style.color = 'black'

        let headings = document.querySelectorAll('.heading')
        headings.forEach((heading) => {
            heading.style.color = 'black'
        })

        let cards = document.querySelectorAll(".products-div")
        cards.forEach((card) => {
            card.style.backgroundColor = '#111827'
        })
    }

    if (changeMode.currentMode == 'dark') {
        document.body.style.backgroundColor = '#1e1e1e'
        document.body.style.color = 'white'

        let cards = document.querySelectorAll(".products-div")
        cards.forEach((card) => {
            card.style.backgroundColor = 'black'
        })

        let headings = document.querySelectorAll('.heading')
        headings.forEach((heading) => {
            heading.style.color = 'white'
        })
    }


    return (
        <>
            <ImageSlider />
            <div className='flex flex-col py-10 gap-20'>
                <div className='flex flex-col gap-8'>
                    <h1 className='heading ml-5 md:ml-8 text-3xl md:text-5xl lg:text-6xl lg:ml-20'>Mobile Phones</h1>
                    <div className="mainBody grid gap-10 grid-cols-2 sm:grid-cols-3 mx-7 md:mx-10  md:grid-cols-4 xl:grid-cols-5">
                        {
                            mobilesData.mobilesData?.products ? (
                                mobilesData.mobilesData.products.map((data) => (
                                    <NavLink to='/fullmobiledetails' key={data.id}>
                                        <div className='products-div w-[40vw] h-auto md:h-[20vh] md:w-[20vw] lg:h-65 lg:w-55 xl:w-60 xl:h-65 flex flex-col rounded-2xl bg-gray-900 text-white'
                                            onClick={() => handleSendComputerIndex(mobilesData.mobilesData.products.indexOf(data))}
                                        >
                                            <div className='h-auto flex justify-center rounded-t-2xl md:h-[10vh] lg:h-40 lg:w-55 xl:w-60 bg-white'>
                                                <img src={data.images[0]} alt="" className='h-23 md:h[] lg:h-40 ' />
                                            </div>
                                            <div className='p-3 h-auto lg:h-25 lg:p-5 flex flex-col justify-evenly'>
                                                <h1>{data.title.slice(0, 15)}</h1>
                                                <p>{Math.floor(data.price * 83)} ₹</p>
                                            </div>
                                        </div>
                                    </NavLink>
                                ))
                            ) : (
                                <h1 className='error w-[90vw] md:w-[90vw] lg:w-[90vw]'>
                                    <Skeleton />
                                    <Skeleton />
                                </h1>
                            )
                        }
                    </div>
                </div>


                <div className='flex flex-col gap-8'>
                    <h1 className='heading ml-5 md:ml-8 text-3xl md:text-5xl lg:text-6xl lg:ml-20'>Shirts</h1>
                    <div className="mainBody grid gap-10 grid-cols-2 sm:grid-cols-3 mx-7 md:mx-10  md:grid-cols-4 xl:grid-cols-5">

                        {
                            shirtsData.products ? (
                                shirtsData.products.map((data) => (
                                    <NavLink to='/fullshirtsdetails' key={data.id}>
                                        <div key={data.id} className='products-div w-[40vw] h-auto md:h-[20vh] md:w-[20vw] lg:h-65 lg:w-55 xl:w-60 xl:h-65 flex flex-col rounded-2xl bg-gray-900 text-white'
                                            onClick={() => handleSendShirtsIndex(shirtsData.products.indexOf(data))}>
                                            <div className='h-auto flex justify-center rounded-t-2xl md:h-[10vh] lg:h-40 lg:w-55 xl:w-60 bg-white'>
                                                <img src={data.images[0]} alt="" className='h-23 md:h[] lg:h-40 ' />
                                            </div>
                                            <div className='p-3 h-auto lg:h-25 lg:p-5 flex flex-col justify-evenly'>
                                                <h1>{data.title.slice(0, 15)}</h1>
                                                <p>{Math.floor(data.price * 83)} ₹</p>
                                            </div>
                                        </div>
                                    </NavLink>
                                ))
                            ) : (
                                <h1 className='error w-[90vw] md:w-[90vw] lg:w-[90vw]'>
                                    <Skeleton />
                                </h1>
                            )
                        }
                    </div>

                </div>

                <div className='flex flex-col gap-8'>
                    <h1 className='heading ml-5 md:ml-8 text-3xl md:text-5xl lg:text-6xl lg:ml-20'>Laptops</h1>
                    <div className="mainBody grid gap-10 grid-cols-2 sm:grid-cols-3 mx-7 md:mx-10  md:grid-cols-4 xl:grid-cols-5">
                        {
                            laptopsData.LaptopsData.products ? (
                                laptopsData.LaptopsData.products.map((data) => (
                                    <NavLink to='/fulllaptopdetails' key={data.id}>
                                        <div key={data.id} className='products-div w-[40vw] h-auto md:h-[20vh] md:w-[20vw] lg:h-65 lg:w-55 xl:w-60 xl:h-65 flex flex-col rounded-2xl bg-gray-900 text-white'
                                            onClick={() => handleSendLaptopsIndex(laptopsData.LaptopsData.products.indexOf(data))}
                                        >
                                            <div className='h-auto flex justify-center rounded-t-2xl md:h-[10vh] lg:h-40 lg:w-55 xl:w-60 bg-white'>
                                                <img src={data.images[0]} alt="" className='h-23 md:h[] lg:h-40 ' />
                                            </div>
                                            <div className="p-3 h-auto lg:h-25 lg:p-5 flex flex-col justify-evenly">
                                                <h1>{data.title.slice(0, 13)}</h1>
                                                <p>{data.price} ₹</p>
                                            </div>

                                        </div>
                                    </NavLink>
                                ))
                            ) : (
                                <h1 className='error w-[90vw] md:w-[90vw] lg:w-[90vw]'>
                                    <Skeleton />
                                </h1>
                            )
                        }
                    </div>
                </div>


            </div>

        </>
    );
}

export default AllProducts;
