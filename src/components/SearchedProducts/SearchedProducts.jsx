import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchProducts, setSearchedDataIndex } from '../../features/SearchProducts/SearchProductSlice';
import { NavLink } from 'react-router-dom';
import './SearchedProducts.css'
import NotFound from '../NotFound/NotFound';
import Loader from '../Loader/NormalLoader/Loader';

function SearchedProducts() {

  const { isloading, SearchProducts, isError, query } = useSelector((state) => state.searchProduct)
  console.log("Searched Product is", SearchProducts.products)
  console.log("Searched Product is", SearchProducts.products?.length)
  // console.log(query)
  const dispatch = useDispatch()

  // useEffect(() => {
  //     dispatch(fetchSearchProducts())
  // }, []);

  const handleSendFullDataIndex = (index) => {
    // console.log(index)
    dispatch(setSearchedDataIndex(index))
  }

  //we are getting the state od mode from our mode store
  const changeMode = useSelector((state) => state.mode)

  let searchedProduct = document.querySelectorAll(".searchedProduct")
  let searchedProductPage = document.querySelectorAll(".searchedProductPage")

  if (changeMode.currentMode == 'light') {
    searchedProduct.forEach((product) => {
      product.style.backgroundColor = '#efefef'
      product.style.color = 'black'

    })
  }

  if (changeMode.currentMode == 'dark') {
    searchedProduct.forEach((product) => {
      product.style.backgroundColor = '#343434'
      product.style.color = 'white'
    })

  }

  return (
    <>
      <div className='searchedProductPage py-10 min-h-[100vh] lg:p-20 mt-10 md:mt-10 flex flex-col justify-center items-center gap-3 lg:gap-0'>
        {
          SearchProducts.products?.length >= 1 ? (
            SearchProducts.products.map((data) => (
              <NavLink to='/fullsearchedproductdetails' key={data.id}>
                <div className='searchedProduct w-[90vw] h-auto flex items-center flex-col' onClick={() => handleSendFullDataIndex(SearchProducts.products.indexOf(data))}>
                  <div className='h-auto w-[90vw] lg:h-50 lg:w-[70%] flex lg:px-10 items-center' >
                    <div className='w-[30vw] lg:w-[14vw]'>
                      <img src={data.images[2]} alt="" className='h-35 w-[30vw] lg:w-[15vw] bg-blue-200' />
                    </div>
                    <div className='lg:ml-10 ml-3 flex flex-col gap-1  w-[50vw]'>
                      <p className='text-l lg:text-xl font-bold'>{data.title}</p>
                      <p className='text-l lg:text-xl font-bold'>{Math.floor(data.price * 83)} ₹ </p>
                      <p className='hidden lg:flex'>{data.description}</p>
                    </div>
                  </div>
                </div>
              </NavLink>
            ))
          ) : (
            SearchProducts.products?.length == 0 ? (
              <div>
                <h1 className='text-4xl font-bold'>No Products Found 💩</h1>
                <h2 className='text-3xl font-bold'>Please Search Some Another Products 😅😅 !! </h2>
              </div>

            ) : (
              <h1>Loading ...</h1>
            )
          )
        }
      </div>

    </>
  );
}

export default SearchedProducts;
