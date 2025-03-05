import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeFromCart } from '../../features/CartFeature/CartFeature';
import Loader from '../Loader/NormalLoader/Loader';
import { NavLink } from 'react-router-dom';
import { setPrice } from '../../features/BuyNow/BuyNow';

function Cart() {

  const dispatch = useDispatch()
  const { items, status, error } = useSelector((state) => state.cart)

  // console.log(items, status)
  console.log("length of cart", items.length)

  console.log("items in cart", items)

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  let totalPrice = 0;
  let priceBuyNow = 0;
  for (let i = 0; i < items.length; i++) {
    console.log(items[i]?.price)
    if (items[i]?.price) {
      totalPrice = Math.floor(totalPrice + items[i].price * 83)
      console.log("totalPrice", totalPrice)
      priceBuyNow = priceBuyNow + items[i].price
    }
  }

  const RemoveItemFromCart = (data) => {
    dispatch(removeFromCart(data))
    console.log(data.id)
  }

  //To send the price of the product to the buyNow page
  const buyNow = (price) => {
    dispatch(setPrice(price))
  }


  
  const changeMode = useSelector((state) => state.mode)

  let cartBody = document.querySelector('.cartBody')
  let cartHeading = document.querySelector('.cartHeading')
  useEffect(() => {
    if (changeMode.currentMode == 'light') {
      if (cartBody) {
        cartBody.style.color = 'black'
        cartBody.style.backgroundColor = '#DCFCE7'
        cartHeading.style.color = 'black'
      }
    }

    if (changeMode.currentMode == 'dark') {
      if(cartBody){
        cartBody.style.color = 'black'
        cartBody.style.backgroundColor = '#1e1e1e'
        cartHeading.style.color = 'white'
      }

    }

  }, [changeMode.currentMode]);


  return (
    <>
      <div className='cartBody min-h-[100vh] h-auto  bg-green-100 box-border flex flex-col '>
        <h1 className='cartHeading py-5 mt-14 text-2xl ml-10 self-start font-bold xl:ml-60 xl:text-4xl'>Welcome to Cart , Order Now</h1>
        <div className='h-auto flex flex-col gap-5 items-center mb-20' >
          {
            items ? items.map((data) => (
              <div className='searchedProduct w-[90vw] h-auto flex items-center flex-col ' key={data.id}>
                <div className='h-auto w-[90vw] lg:h-50 lg:w-[70vw] flex items-center bg-yellow-200 rounded-2xl' >
                  <div className='w-[35vw] lg:w-[14vw] lg:h-50 flex items-center justify-center bg-blue-200 rounded-l-2xl'>
                    <img src={data.image[0]} alt="" className='h-35  xl:h-[20vh] xl:w-auto ' />
                  </div>
                  <div className='lg:ml-10 ml-3 flex flex-col gap-1  w-[40vw]'>
                    <p className='text-l lg:text-xl font-bold'>{data.name}</p>
                    <p className='text-l lg:text-xl font-bold'>{Math.floor(data.price * 83)} ₹ </p>
                    <p className=' hidden text-s xl:flex'>{data.description}</p>
                  </div>

                  <div className='relative right-2 lg:right-5 font-medium  lg:ml-10'>
                    <button className='w-[25vw] bg-green-400 h-10 rounded-[7px] lg:w-[10vw] lg:font-bold cursor-pointer'
                      onClick={() => RemoveItemFromCart(data)}>Remove Item</button>
                  </div>
                </div>
              </div>
            )) :
              (
                <Loader />
              )
          }
        </div>
        <div className='h-[8vh] w-screen bg-gray-900 text-white fixed bottom-0 flex justify-between px-5 items-center text-[18px] font-bold lg:h-17'>
          <div className='w-[55vw] flex gap-10 text-[17px]'>
            <p>Total Amount</p>
            <p>₹ {totalPrice}</p>
          </div>
          <NavLink to='/buynow' className='lg:mr-20'>
            <button className='bg-green-400 px-4 py-2 text-black rounded-[7px]' onClick={buyNow(priceBuyNow)}>Order Now</button>
          </NavLink>
        </div>
      </div>

    </>
  );
}

export default Cart;
