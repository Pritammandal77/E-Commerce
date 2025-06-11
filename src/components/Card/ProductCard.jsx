import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../features/CartFeature/CartFeature';
import { toast } from 'react-toastify';
import { setPrice, setProductData } from '../../features/BuyNow/BuyNow';

function ProductCard(props) {

  const currentMode = useSelector((state) => state.mode.currentMode)
  const user = auth.currentUser
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addProductTocart = (data) => {
    if (user) {
      dispatch(addToCart(data)).then(() => {
        toast("Item Added To cart !!")
      })
    } else {
      toast("Please log in to continue shopping !!")
    }
  }


  const buyNow = (price, data) => {
    if (user) {
      dispatch(setPrice(price))
      dispatch(setProductData(data))
      navigate("/buynow")
    } else {
      toast("Please log in to continue shopping !!")
    }
  }

  return (
    <>
      <div className={`h-50 lg:h-75 w-[48vw] md:w-[27vw]  lg:w-[22vw] xl:w-[16vw] border-1  rounded-2xl 
         ${currentMode == 'dark' ? 'bg-[#0F1214] text-white border-gray-700' : 'bg-white text-black border-gray-400'} `} 
        onClick={props.onClick}>
        <NavLink to='/fullProductDetails'>
          <div className='h-[45%] lg:h-[60%] w-[100%]  flex items-center justify-center bg-blue-300 rounded-t-2xl'>
            <img src={props.image} alt="" className='h-[90%] lg:h-40' />
          </div>
          <div className='flex flex-col px-3 py-1 items-start '>
            <p className='text-[16px] md:text-xl'>{props.productTitle.slice(0, 15)}</p>
            <p className='text-[14px] md:text-[16px]'>{props.price} ₹
              <span className='text-green-700 px-3'>
                {props.discount.toString().slice(0, -1)} % off
              </span>
            </p>
          </div>
        </NavLink>
        <div className='flex flex-row items-center py-2 justify-evenly w-full text-[10px] md:text-[12px] lg:text-[14px]'>
          <button className='bg-yellow-500 text-black py-2 px-2 rounded-[8px] cursor-pointer' onClick={() => addProductTocart(props.fullProductData)}>
            <i className="fa-solid fa-cart-shopping px-1"></i>
            Add to Cart
          </button>
          <button className='bg-yellow-500 text-black py-2 px-2 rounded-[8px] cursor-pointer' onClick={() => buyNow(props.price, props.fullProductData)}>
            <i className="fa-solid fa-money-check px-1"></i>
            Buy now
          </button>
        </div>
      </div>

    </>
  );
}

export default ProductCard;
