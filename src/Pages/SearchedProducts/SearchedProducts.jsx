import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDefaultProduct, sortByPriceInAscending, sortByPriceInDescending } from '../../features/SearchProducts/SearchProductSlice';
import { NavLink } from 'react-router-dom';
import { setFullProductData } from '../../features/fullProductDetails/FullProductDetails';

function SearchedProducts() {

  const { isloading, SearchProducts, isError, query } = useSelector((state) => state.searchProduct)
  const currentMode = useSelector((state) => state.mode.currentMode)

  const dispatch = useDispatch()

  const handleSendDataToFullProductSlice = (data) => {
    dispatch(setFullProductData(data))
  }

  const [selectedFilter, setSelectedFilter] = useState("");

  //For changing products filter
  const handleFilterChange = (event) => {

    const selectedValue = event.target.value;
    setSelectedFilter(selectedValue);

    if (selectedValue === "low-to-high") {
      dispatch(sortByPriceInAscending());
    } else if (selectedValue === "high-to-low") {
      dispatch(sortByPriceInDescending())
    } else if (selectedValue === "default") {
      dispatch(setDefaultProduct())
    }
  };

  return (
    <>
      <div className={`top-15 left-2 p-2 rounded-md fixed w-screen flex z-10 justify-between items-center px-5 md:px-10 xl:px-15
         ${currentMode == 'dark' ? 'bg-[#1e1e1e] text-white' : 'bg-[#dadada] text-black'} `} >
        <div>
          <h1 className='text-[25px] lg:text-[30px] fonr-bold'> Products({SearchProducts.products?.length >= 1 ? SearchProducts.products?.length : 0})</h1>
        </div>
        <div>
          <select
            className={`w-45 md:w-50 mt-1 p-2 border rounded  ${currentMode == 'dark' ? 'bg-black text-white' : 'bg-gray-900 text-white'}`}
            value={selectedFilter}
            onChange={handleFilterChange}
          >
            <option className={` ${currentMode == 'dark' ? 'bg-black text-white' : 'bg-gray-900 text-white'} `} value="default">Default</option>
            <option className={` ${currentMode == 'dark' ? 'bg-black text-white' : 'bg-gray-900 text-white'} `} value="low-to-high">Price : Low to High</option>
            <option className={` ${currentMode == 'dark' ? 'bg-black text-white' : 'bg-gray-900 text-white'} `} value="high-to-low">Price : High to Low</option>
          </select>
        </div>

      </div>

      <div className={`searchedProductPage py-20 min-h-[100vh] lg:p-20 mt-15 md:mt-15 flex flex-col justify-center items-center gap-3 
          ${currentMode === "dark" ? 'bg-[#1e1e1e] text-white' : 'bg-[#dadada] text-black'}`}>
        {
          SearchProducts.products?.length >= 1 ? (
            SearchProducts.products.map((data) => (
              <NavLink to='/fullProductDetails' key={data.id}>
                <div className={`searchedProduct w-[90vw] lg:w-[70vw] h-auto flex flex-col rounded-2xl self-start
                ${currentMode === "dark" ? 'bg-black text-white' : 'bg-white text-black'}`}
                  onClick={() => handleSendDataToFullProductSlice(data)}>
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
                <h2 className='text-3xl font-bold'>Please Search Some <br className='lg:hidden' /> Another Products 😅😅 !! </h2>
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