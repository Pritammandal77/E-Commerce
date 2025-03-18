import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NotFound from '../NotFound/NotFound';
import { NavLink } from 'react-router-dom';
import { addToCart } from '../../features/CartFeature/CartFeature';
import { setPrice, setProductData } from '../../features/BuyNow/BuyNow';
import { auth } from '../../config/firebase';
import { toast } from 'react-toastify';
import Loader from '../Loader/NormalLoader/Loader';

function FullSearchedProdDetails() {

  const currentMode = useSelector((state) => state.mode.currentMode)
  const { isItemAdded, status } = useSelector((state) => state.cart)

  const user = auth.currentUser;
   
  const dispatch = useDispatch()

  //We are getting the Index of the searched product
  let SearchedIndex , searchedData;

  try {
    SearchedIndex = useSelector((state) => state.searchProduct.SearchedDataIndex)
    searchedData = useSelector((state) => state.searchProduct?.SearchProducts?.products[SearchedIndex])
  } catch (error) {
    console.log(error)
  }

  //For Image layout
  const [viewFullSearchedImage, setViewFullSearchedImage] = useState(null)

  const firstShirtImage = () => {
    setViewFullSearchedImage(searchedData.images[0])
  }

  const secondShirtImage = () => {
    setViewFullSearchedImage(searchedData.images[1])
  }

  const thirdShirtImage = () => {
    setViewFullSearchedImage(searchedData.images[2])
  }


  const addProductToCart = (data) => {
    if (user) {
      dispatch(addToCart(data)).then(() => {
        toast("Item added to cart  !!")
      })
    } else {
      toast("Please log in to continue shopping !!")
    }
  }


  //sending the price , and the full data to buyNowSlice
  const buyNow = (price, productData) => {
    if (user) {
      dispatch(setPrice(price))
      dispatch(setProductData(productData))
    } else {
      toast("Please log in to continue shopping !!")
    }
  }

  //if user not looged in then show this message
  const userNotLoggedIn = () => {
    toast("Please log in to continue shopping !!")
  }

  return (
    <>
      {
        searchedData ? (
          <div className={` flex flex-col items-center justify-center xl:flex-row lg:pb-20 xl:pb-5
            ${currentMode == 'dark' ? 'bg-[#0F1214] text-white' : 'bg-[#dadada] text-black'}`}>
            <div className=' w-screen xl:w-[40vw] flex overflow-hidden pt-5 xl:p-20 justify-center items-center flex-col'>
              <div className='flex flex-col h-[40vh] justify-center gap-5 xl:justify-between items-center  p-10 rounded-2xl mt-10 xl:mt-0  xl:h-[70vh] '>
                <div className='bg-blue-300 h-[30vh] w-[80vw] xl:w-[30vw] flex justify-center items-center rounded-2xl xl:h-[50vh]'>
                  <img src={viewFullSearchedImage ? (viewFullSearchedImage) : (searchedData.images[0])} alt="" className='h-[27vw] xl:h-70 xl:w-auto' />
                </div>
                <div className=' flex w-[80vw] h-[10vh] justify-between items-center xl:w-1/2 xl:gap-5'>
                  <div className='w-[22vw] h-[10vh] border flex justify-center items-center rounded-xl bg-yellow-300' onClick={firstShirtImage}>
                    <img src={searchedData.images[0]} alt="" className="h-[7vh]  " />
                  </div>
                  <div className='w-[22vw] h-[10vh] border flex justify-center items-center rounded-xl bg-yellow-300' onClick={secondShirtImage}>
                    <img src={searchedData.images[1]} alt="" className="h-[7vh] " />
                  </div>
                  <div className='w-[22vw] h-[10vh] border flex justify-center items-center rounded-xl bg-yellow-300' onClick={thirdShirtImage}>
                    <img src={searchedData.images[2]} alt="" className="h-[7vh] " />
                  </div>
                </div>
              </div>
              <div className={`xl:bg-transparent h-auto w-screen p-3 fixed bottom-0 xl:relative xl:h-30 xl:w-[40vw] flex items-center justify-evenly gap-2 sm:gap-0 
                                ${currentMode == 'dark' ? 'bg-black text-white' : 'bg-gray-900 text-black'}`}>
                <button className='bg-yellow-500 h-13 w-[45vw] xl:w-50 rounded-xl cursor-pointer text-xl font-bold flex justify-center items-center gap-3 hover:border-2 text-black'
                  onClick={() => addProductToCart(searchedData)}> <i className="fa-solid fa-cart-shopping"></i>Add To Cart
                </button>
                {
                  !user && <button className='bg-yellow-500 h-13 w-[45vw] xl:w-50 rounded-xl cursor-pointer text-xl font-bold flex justify-center items-center gap-3 hover:border-2 text-black' onClick={userNotLoggedIn}> <i className="fa-solid fa-money-check"></i> Buy Now</button>
                }
                {
                  user && <NavLink to="/buynow">
                    <button className='bg-yellow-500 h-13 w-[45vw] xl:w-50 rounded-xl cursor-pointer text-xl font-bold flex justify-center items-center gap-3 hover:border-2 text-black' onClick={buyNow(searchedData.price, searchedData)}> <i className="fa-solid fa-money-check"></i> Buy Now</button>
                  </NavLink>
                }


              </div>
            </div>
            <div className='absolute top-0 left-0'>
              {
                status == "Pending" && <Loader />
              }
            </div>
            <div className='w-screen xl:w-[40vw] px-5 xl:p-20 md:px-20 flex flex-col'>
              <div className='h-auto flex flex-col justify-between gap-3'>
                <p className='font-bold text-3xl'>{searchedData.title}</p>
                <p>{searchedData.description}</p>
                <div>
                  <div className="RatingCard">
                    <div className="ratingNum">
                    <p className="count">{searchedData.rating}</p>
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
                  <span className='flex w-65 justify-between'>Special discount <p className='text-green-800'>{searchedData.discountPercentage} %Off</p></span>
                  <p className='text-2xl font-bold'> ₹ {Math.floor(searchedData.price * 83)}</p>
                </div>
              </div>
              <div>
                <table className="table min-w-full text-left bg-green-300 border border-gray-300">
                  <tbody>
                    <tr>
                      <td className='font-bold'>Category</td>
                      <td>{searchedData.category}</td>
                    </tr>
                    <tr className='bg-gray-400'>
                      <td className='font-bold'>Brand</td>
                      <td>{searchedData.brand}</td>
                    </tr>
                    <tr>
                      <td className='font-bold'>Return Policy </td>
                      <td>{searchedData.returnPolicy}</td>
                    </tr>
                    <tr className='bg-gray-400'>
                      <td className='font-bold'>Shipping</td>
                      <td>{searchedData.shippingInformation}</td>
                    </tr>
                    <tr>
                      <td className='font-bold'>Stock</td>
                      <td>{searchedData.stock > 1 ? ("Available") : ("Not available")}</td>
                    </tr>
                    <tr className='bg-gray-400'>
                      <td className='font-bold'>Warrenty</td>
                      <td>{searchedData.warrantyInformation}</td>
                    </tr>
                    <tr>
                      <td className='font-bold'>Weight</td>
                      <td>{searchedData.weight * 28.3} g</td>
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

export default FullSearchedProdDetails;
