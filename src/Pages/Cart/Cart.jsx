import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeFromCart } from '../../features/CartFeature/CartFeature';
import Loader from '../../components/Loader/NormalLoader/Loader';
import { NavLink } from 'react-router-dom';
import { setPrice, setProductData } from '../../features/BuyNow/BuyNow';
import { toast } from 'react-toastify';

function Cart() {

  const { items, status, error } = useSelector((state) => state.cart)
  const currentMode = useSelector((state) => state.mode.currentMode)
  
  const dispatch = useDispatch()

  // console.log("length of cart", items.length)
  // console.log("items in cart", items)

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  let totalPrice = 0;
  let priceBuyNow = 0;
  for (let i = 0; i < items.length; i++) {
    if (items[i]?.product.price) {
      totalPrice = Math.floor(totalPrice + items[i].product.price * 83)
      priceBuyNow = priceBuyNow + items[i].product.price
    }
  }

  const RemoveItemFromCart = (data) => {
    dispatch(removeFromCart(data))
      .then(() => {
        toast("item removed from cart !!")
      })
  }

  //To send the price of the product to the buyNow page
  const buyNowItem = (price, data) => {
    dispatch(setPrice(price))
    dispatch(setProductData(data))
  }

  return (
    <>
      <div className={`cartBody min-h-[100vh] h-auto box-border flex flex-col 
           ${currentMode === 'dark' ? 'bg-[#1d1d1d] text-white' : 'bg-[#dadada] text-black'}`}>
        {
          items?.length >= 1 && <div className='cartHeading py-5 mt-14 text-3xl ml-10 self-center font-bold  xl:text-5xl flex gap-3 bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text'>
            <h1 className=''>Welcome to Cart</h1>
            <p>({items.length})</p>
          </div>
        }
        <div className='h-auto flex flex-col gap-5 items-center mb-20' >
          {
            items?.length >= 1 ? items.map((data) => (
              <div className='searchedProduct w-[90vw] h-auto flex items-center flex-col ' key={data.id}>
                <div className={`h-auto w-[90vw] lg:h-50 lg:w-[70vw] flex items-center rounded-2xl
                   ${currentMode === 'dark' ? 'bg-[#000000] text-white' : 'bg-white text-black'} `} >

                  <div className='w-[35vw] lg:w-[14vw] lg:h-50 flex items-center justify-center bg-blue-200 rounded-l-2xl'>
                    <img src={data.product.images[0]} alt="" className='h-35  xl:h-[20vh] xl:w-auto ' />
                  </div>
                  <div className='lg:ml-10 ml-3 flex flex-col gap-1  w-[40vw]'>
                    <p className='text-l lg:text-xl font-bold'>{data.product.title}</p>
                    <p className='text-l lg:text-xl font-bold'>{Math.floor(data.product.price * 83)} ₹ </p>
                    <p className=' hidden text-s xl:flex'>{data.product.description}</p>
                  </div>

                  <div className="relative right-2 lg:right-5 font-medium lg:ml-10 flex flex-col gap-2 text-black">

                    <button className='w-[25vw] bg-yellow-500 h-10 rounded-[7px] lg:w-[10vw] lg:font-bold cursor-pointer border-2 border-transparent hover:border-black'
                      onClick={() => RemoveItemFromCart(data)}>
                      <i className="fa-solid fa-trash"></i> Remove </button>

                    <NavLink to='/buynow'>
                      <button className='w-[25vw] bg-yellow-500 h-10 rounded-[7px] lg:w-[10vw] lg:font-bold cursor-pointer border-2 border-transparent hover:border-black'
                        onClick={() => buyNowItem(data.product.price, data.product)}>
                        <i className="fa-solid fa-money-check"></i>  Buy Now</button>
                    </NavLink>

                  </div>
                </div>
              </div>
            )) :
              (
                items?.length < 1 ? (
                  <div className=' h-[100vh] flex justify-center items-center lg:mt-10'>
                    <h1 className='text-3xl lg:text-4xl font-bold'>Your cart is empty 😊!!</h1>
                  </div>
                ) : (
                  <Loader />
                )
              )
          }
        </div>
      </div>

      {/* For loading state */}
      <div className=' top-0 left-0 mt-10 z-100 fixed'>
        {
          status == 'pending' && <Loader />
        }
      </div>
    </>
  );
}

export default Cart;