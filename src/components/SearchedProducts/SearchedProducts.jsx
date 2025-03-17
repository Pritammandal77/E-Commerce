import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchProducts, setSearchedDataIndex } from '../../features/SearchProducts/SearchProductSlice';
import { NavLink } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';
import Loader from '../Loader/NormalLoader/Loader';

function SearchedProducts() {

  const { isloading, SearchProducts, isError, query } = useSelector((state) => state.searchProduct)

  const dispatch = useDispatch()

  const handleSendFullDataIndex = (index) => {
    dispatch(setSearchedDataIndex(index))
  }

  //we are getting the state of mode from our modeSlice
  const currentMode = useSelector((state) => state.mode.currentMode)

  return (
    <>
      <div className={`searchedProductPage py-10 min-h-[100vh] lg:p-20 mt-10 md:mt-10 flex flex-col justify-center items-center gap-3 
          ${currentMode === "dark" ? 'bg-[#1e1e1e] text-white' : 'bg-[#dadada] text-black'}`}>
        {
          SearchProducts.products?.length >= 1 ? (
          SearchProducts.products.map((data) => (
            <NavLink to='/fullsearchedproductdetails' key={data.id}>
              <div className={`searchedProduct w-[90vw] lg:w-[70vw] h-auto flex flex-col rounded-2xl self-start
                ${currentMode === "dark" ? 'bg-black text-white' : 'bg-white text-black'}`} 
                onClick={() => handleSendFullDataIndex(SearchProducts.products.indexOf(data))}>
                <div className='h-auto w-[90vw] lg:h-50 lg:w-[100%] flex items-center ' >
                  <div className='w-[30vw] lg:w-[14vw] lg:h-50 bg-blue-200 flex justify-center rounded-l-2xl p-2'>
                    <img src={data.images[2]} alt="" className='h-[15vh] lg:h-auto w-auto max-w-[25vw] lg:w-auto lg:max-w-[12vw] rounded-2xl' />
                  </div>
                  <div className='lg:ml-10 ml-3 flex flex-col gap-1  w-[50vw]'>
                    <p className='text-l md:text-xl font-bold'>{data.title}</p>
                    <p className='text-l md:text-xl font-bold'>{Math.floor(data.price * 83)} ₹ </p>
                    <p className='hidden lg:flex'>{data.description}</p>
                  </div>
                </div>
              </div>
            </NavLink>
          ))
        ) : (
          SearchProducts.products?.length == 0 ? (
            <div className='text-center px-5'>
              <h1 className='text-3xl lg:text-4xl font-bold'>No Products Found 💩</h1>
              <h2 className='text-3xl font-bold'>Please Search Some <br className='lg:hidden'/> Another Products 😅😅 !! </h2>
            </div>
          ) : (
            <h1 className='text-3xl lg:text-4xl font-bold'>Search Something 😊 !!</h1>
          )
        )
        }
      </div >

    </>
  );
}

export default SearchedProducts;
