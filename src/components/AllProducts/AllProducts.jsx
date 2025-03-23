import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchMobiles } from '../../features/Mobiles/MobileSlice';
import { fetchShirts } from '../../features/Shirts/ShirtSlice';
import { fetchLaptops } from '../../features/Laptops/LaptopSlice';
import { NavLink } from 'react-router-dom';
import ImageSlider from '../ImageSlider/ImageSlider';
import Skeleton from '../Loader/Skeleton/Skeleton';
import './AllProducts.css'
import { setFullProductData } from '../../features/fullProductDetails/FullProductDetails';

function AllProducts() {

    const { isloading, shirtsData, isError } = useSelector((state) => state.allShirts); //the allShirts is getting from the store , similarly to the remaining two i.e, allShirts & allMobiles
    const laptopsData = useSelector((state) => state.allLaptops)
    const mobilesData = useSelector((state) => state.allMobiles)
    const currentMode = useSelector((state) => state.mode.currentMode)

    const dispatch = useDispatch()  // dispatch se ham value bhejte hain

    useEffect(() => {
        dispatch(fetchMobiles())
        dispatch(fetchShirts())
        dispatch(fetchLaptops())
    }, [dispatch]);


    const sendDataToFullProductsDetails = (data) => {
        dispatch(setFullProductData(data))
    }


    let headings = document.querySelectorAll('.heading')
    let cards = document.querySelectorAll(".products-div")

    if (currentMode == 'light') {
        document.body.style.backgroundColor = '#dadada'
        document.body.style.color = 'black'

        headings.forEach((heading) => {
            heading.style.color = 'black'
        })

        cards.forEach((card) => {
            card.style.backgroundColor = '#111827'
            card.style.color = "white"
        })
    }

    if (currentMode == 'dark') {
        document.body.style.backgroundColor = '#1d1d1d'
        document.body.style.color = 'white'

        cards.forEach((card) => {
            card.style.backgroundColor = 'black'
        })

        headings.forEach((heading) => {
            heading.style.color = 'white'
        })
    }


    return (
        <>
            <ImageSlider />
            <div className='flex flex-col py-10 gap-20 items-center '>

                <div className='flex flex-col gap-8'>
                    <h1 className='heading self-center lg:self-start md:ml-8 text-3xl font md:text-5xl lg:ml-20 '>Premium Mobile Phones</h1>
                    <div className="mainBody grid gap-10 grid-cols-2 mx-7 sm:grid-cols-3  md:mx-10  md:grid-cols-4 xl:grid-cols-5">
                        {
                            mobilesData.mobilesData?.products ? (
                                mobilesData.mobilesData.products.map((data) => (
                                    <NavLink to='/fullProductDetails' key={data.id}>
                                        <div className='products-div w-[40vw] h-auto md:h-[17vh] md:w-[20vw] lg:h-65 lg:w-55 xl:w-60 xl:h-65 flex flex-col rounded-2xl bg-gray-900 text-white'
                                            onClick={() => sendDataToFullProductsDetails(data)}
                                        >
                                            <div className='h-auto flex justify-center rounded-t-2xl md:h-[10vh] lg:h-40 lg:w-55 xl:w-60 bg-white'>
                                                <img src={data.images[0]} alt="" className='h-23 md:h[] lg:h-40 ' />
                                            </div>
                                            <div className='p-3 h-auto lg:h-25 lg:p-5 flex flex-col justify-evenly'>
                                                <h1 className='text-l lg:text-xl'>{data.title.slice(0, 15)}</h1>
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
                    <h1 className='heading self-center lg:self-start md:ml-8 text-3xl font md:text-5xl lg:ml-20'>Exclusive Premium Shirts</h1>
                    <div className="mainBody grid gap-10 grid-cols-2 sm:grid-cols-3 mx-7 md:mx-10  md:grid-cols-4 xl:grid-cols-5">

                        {
                            shirtsData.products ? (
                                shirtsData.products.map((data) => (
                                    <NavLink to='/fullProductDetails' key={data.id}>
                                        <div key={data.id} className='products-div w-[40vw] h-auto md:h-[17vh] md:w-[20vw] lg:h-65 lg:w-55 xl:w-60 xl:h-65 flex flex-col rounded-2xl bg-gray-900 text-white'
                                            onClick={() => sendDataToFullProductsDetails(data)}>
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
                    <h1 className='heading self-center lg:self-start md:ml-8 text-3xl font md:text-5xl lg:ml-20'>Exciting & Trending Laptops</h1>
                    <div className="mainBody grid gap-10 grid-cols-2 sm:grid-cols-3 mx-7 md:mx-10  md:grid-cols-4 xl:grid-cols-5">
                        {
                            laptopsData.LaptopsData.products ? (
                                laptopsData.LaptopsData.products.map((data) => (
                                    <NavLink to='/fullProductDetails' key={data.id}>
                                        <div key={data.id} className='products-div w-[40vw] h-auto md:h-[17vh] md:w-[20vw] lg:h-65 lg:w-55 xl:w-60 xl:h-65 flex flex-col rounded-2xl bg-gray-900 text-white'
                                            onClick={() => sendDataToFullProductsDetails(data)}
                                        >
                                            <div className='h-auto flex justify-center rounded-t-2xl md:h-[10vh] lg:h-40 lg:w-55 xl:w-60 bg-white'>
                                                <img src={data.images[0]} alt="" className='h-23 md:h[] lg:h-40 ' />
                                            </div>
                                            <div className="p-3 h-auto lg:h-25 lg:p-5 flex flex-col justify-evenly">
                                                <h1>{data.title.slice(0, 13)}</h1>
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


                <div className=' flex flex-col items-center p-5 gap-10 w-[100%] '>
                    <h1 className='text-3xl md:text-5xl font-bold'>Our Happy Customers</h1>

                    <div className=' h-auto w-[100%]  flex  flex-col md:flex-row justify-evenly items-center text-black gap-5 md:gap-0'>

                        <div className={`reviewsContainer md:w-[30%] lg:w-[25%] md:h-[27vh] lg:h-[36vh] xl:h-[27vh] p-5 flex flex-col justify-evenly gap-3 
                                   ${currentMode === 'dark' ? 'text-white ' : ' text-black'}`}>
                            <div className='flex items-center gap-3'>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDAhOJUamES8K6nBUcoxkSCTFLjxuw--ukzQ&s" alt=""
                                    className='w-13 rounded-[50%]' />
                                <div>
                                    <p className='text-[19px]'>Hemant Sharma</p>
                                    <p className='text-[18px]'>⭐⭐⭐⭐</p>

                                </div>
                            </div>

                            <div className='text-[16px]'>
                                <p>"Absolutely love this product! The quality is top-notch, and the delivery was super fast. Will definitely order again!"</p>
                            </div>
                        </div>


                        <div className={`reviewsContainer md:w-[30%] lg:w-[25%] md:h-[27vh] lg:h-[36vh] xl:h-[27vh] p-5 flex flex-col justify-evenly gap-3
                                   ${currentMode === 'dark' ? 'text-white' : ' text-black'}`}>
                            <div className='flex items-center gap-3'>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1zQ374bP5QCpWwasc_KLsqhAXI_AfRe_SUA&s" alt=""
                                    className='w-13 rounded-[50%]' />
                                <div>
                                    <p className='text-[19px]'>Sushmita Varma</p>
                                    <p className='text-[18px]'>⭐⭐⭐⭐⭐</p>
                                </div>
                            </div>

                            <div className='text-[16px]'>
                                <p>"Great product, exactly as described. The packaging could be a bit better, but overall, I'm satisfied with my purchase."</p>
                            </div>
                        </div>


                        <div className={`reviewsContainer md:w-[30%] lg:w-[25%] md:h-[27vh] lg:h-[36vh] xl:h-[27vh] p-5 flex flex-col justify-evenly gap-3
                                   ${currentMode === 'dark' ? 'text-white' : ' text-black'}`}>
                            <div className='flex items-center gap-3'>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGojvRu6zk7vUycPeQQOYBlE2B7u8hEWlyQA&s" alt=""
                                    className='w-13 rounded-[50%]' />
                                <div>
                                    <p className='text-[19px]'>Diya Singh</p>
                                    <p className='text-[18px]'>⭐⭐⭐⭐</p>

                                </div>
                            </div>

                            <div className='text-[16px]'>
                                <p>"Decent product for the price. It works fine, but I expected slightly better quality. Good for casual use."</p>
                            </div>
                        </div>

                    </div>
                </div>



            </div>

        </>
    );
}

export default AllProducts;
