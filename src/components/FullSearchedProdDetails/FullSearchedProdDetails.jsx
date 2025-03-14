import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchProducts } from '../../features/SearchProducts/SearchProductSlice';
import NotFound from '../NotFound/NotFound';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { addToCart, getProductDataFromComponents, setIsItemAdded } from '../../features/CartFeature/CartFeature';
import { setPrice, setProductData } from '../../features/BuyNow/BuyNow';
import Swal from 'sweetalert2'
import { auth } from '../../config/firebase';
import { toast } from 'react-toastify';
import Loader from '../Loader/NormalLoader/Loader';

function FullSearchedProdDetails() {

  //We are getting the Index of the searched product
  let SearchedIndex;
  // console.log("index", SearchedIndex)

  let searchedData;
  try {
    SearchedIndex = useSelector((state) => state.searchProduct.SearchedDataIndex)
    searchedData = useSelector((state) => state.searchProduct?.SearchProducts?.products[SearchedIndex])
    // console.log(searchedData)
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


  const currentMode = useSelector((state) => state.mode.currentMode)

  const user = auth.currentUser;

  const dispatch = useDispatch()
  const addProductToCart = (data) => {
    if (user) {
      dispatch(getProductDataFromComponents(data))
      dispatch(addToCart(data)).then(() => {
        toast("Item added to cart  !!")
      })
    } else {
      toast("Please log in to continue shopping !!")
    }
  }

  const navigate = useNavigate()

  //sending the price , and the full data to buyNowSlice
  const buyNow = (price, productData) => {
    if (user) {
      dispatch(setPrice(price))
      dispatch(setProductData(productData))

    } else {
      toast("Please log in to continue shopping !!")
    }
  }


  const { isItemAdded, status } = useSelector((state) => state.cart)
  // console.log("item added", isItemAdded)
  //If our item successfully added to cart , then fire an popup
  // if (isItemAdded) {
  //   Swal.fire({
  //     position: "center",
  //     icon: "success",
  //     title: "Item saved to Cart",
  //     showConfirmButton: false,
  //     timer: 1200
  //   }).then(() => {
  //     dispatch(setIsItemAdded(false)); // Reset After popup is closed
  //   });
  // }

  //if user not looged in then show this message
  const userNotLoggedIn = () => {
    toast("Please log in to continue shopping !!")
  }

  return (
    <>
      {/* <div className="h-screen w-full text-xl bg-yellow-10 mt-10"> */}
      {
        searchedData ? (
          <div className={`fullShirtData flex flex-col lg:flex-row 
            ${currentMode == 'dark' ? 'bg-[#0F1214] text-white' : 'bg-[#dadada] text-black'}`}>
            <div className='w-screen lg:w-1/2 flex overflow-hidden p-5 lg:p-20 justify-center items-center flex-col'>
              <div className='flex flex-col h-[40vh] justify-center gap-5 lg:justify-between items-center  p-10 rounded-2xl mt-10 lg:mt-0  lg:h-[70vh] '>
                <div className='bg-blue-300 h-[30vh] w-[80vw] lg:w-[30vw] flex justify-center items-center rounded-2xl lg:h-[50vh]'>
                  <img src={viewFullSearchedImage ? (viewFullSearchedImage) : (searchedData.images[0])} alt="" className='h-[27vw] lg:h-70 lg:w-auto' />
                </div>
                <div className=' flex w-[80vw] h-[10vh] justify-between items-center lg:w-1/2 lg:gap-5'>
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
              <div className={`lg:bg-transparent h-auto w-screen p-3 fixed bottom-0 lg:relative lg:h-30 lg:w-[40vw] flex items-center justify-evenly gap-2 sm:gap-0 
                                ${currentMode == 'dark' ? 'bg-black text-white' : 'bg-gray-900 text-black'}`}>
                <button className='bg-yellow-500 h-13 w-[45vw] lg:w-50 rounded-xl cursor-pointer text-xl font-bold flex justify-center items-center gap-3 hover:border-2 text-black'
                  onClick={() => addProductToCart(searchedData)}> <i className="fa-solid fa-cart-shopping"></i>Add To Cart
                </button>
                {
                  !user && <button className='bg-yellow-500 h-13 w-[45vw] lg:w-50 rounded-xl cursor-pointer text-xl font-bold flex justify-center items-center gap-3 hover:border-2 text-black' onClick={userNotLoggedIn}> <i className="fa-solid fa-money-check"></i> Buy Now</button>
                }
                {
                  user && <NavLink to="/buynow">
                    <button className='bg-yellow-500 h-13 w-[45vw] lg:w-50 rounded-xl cursor-pointer text-xl font-bold flex justify-center items-center gap-3 hover:border-2 text-black' onClick={buyNow(searchedData.price, searchedData)}> <i className="fa-solid fa-money-check"></i> Buy Now</button>
                  </NavLink>
                }


              </div>
            </div>
            <div className='absolute w-screen '>
              {
                status == "Pending" && <Loader />
              }
            </div>
            <div className='w-screen lg:w-1/2 p-5 lg:p-20 flex flex-col gap-10'>
              <div className='h-auto flex flex-col justify-between '>
                <p className='font-bold text-3xl'>{searchedData.title}</p>
                <p>{searchedData.description}</p>
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
                  <span className='flex w-65 justify-between'>Special discount <p className='text-green-800'>{searchedData.discountPercentage} %Off</p></span>
                  <p className='text-2xl font-bold'> ₹ {Math.floor(searchedData.price * 83)}</p>
                </div>
              </div>
              <div className="w-full px-2 sm:px-4 overflow-x-auto">
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
      {/* </div> */}

    </>
  );
}

export default FullSearchedProdDetails;
