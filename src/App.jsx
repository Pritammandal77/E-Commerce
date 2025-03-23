import { Suspense } from 'react'
import React from 'react'
import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Loader from './components/Loader/NormalLoader/Loader'
import NotFound from './components/NotFound/NotFound'
import FullProductDetails from './components/FullProductDetails/FullProductDetails'

const AllProducts = React.lazy(() => import('./components/AllProducts/AllProducts'))
const Layout = React.lazy(() => import('./Layout'))
const SearchedProducts = React.lazy(() => import('./components/SearchedProducts/SearchedProducts'))
// const FullSearchedProdDetails = React.lazy(() => import('./components/FullSearchedProdDetails/FullSearchedProdDetails'))
// const FullLaptopDetails = React.lazy(() => import('./components/FullProductDetails/FullLaptopDetails/FullLaptopDetails'))
// const FullShirtDetails = React.lazy(() => import('./components/FullProductDetails/FullShirtDetails/FullShirtDetails'))
// const FullMobiledetails = React.lazy(() => import('./components/FullProductDetails/FullMobileDetails/FullMobiledetails'))
const BuyNow = React.lazy(() => import('./components/BuyNowForm/BuyNow'))
const SignUp = React.lazy(() => import('./components/Login/SignUp/SignUp'))
const SignIn = React.lazy(() => import('./components/Login/SignIn/SignIn'))
const Cart = React.lazy(() => import('./components/Cart/Cart'))
const OrderHistory = React.lazy(() => import('./components/OrderHistory/OrderHistory'))
const AboutUs = React.lazy(() => import('./components/AboutUs/AboutUs'))
const Categories = React.lazy(() => import('./components/ProductCategories/Categories'))

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<AllProducts />}></Route>
        <Route path='/searchedproducts' element={<SearchedProducts />}></Route>
        {/* <Route path='/fullsearchedproductdetails' element={<FullSearchedProdDetails />}></Route>
        <Route path='/fullmobiledetails' element={<FullMobiledetails />}></Route>
        <Route path='/fulllaptopdetails' element={<FullLaptopDetails />}></Route>
        <Route path='/fullshirtsdetails' element={<FullShirtDetails />}></Route> */}
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/buynow' element={<BuyNow />}></Route>
        <Route path='/signin' element={<SignIn />}></Route>
        <Route path='/loader' element={<Loader />}></Route>
        <Route path='/notfound' element={<NotFound />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/orderhistory' element={<OrderHistory />}></Route>
        <Route path='/aboutus' element={<AboutUs />}></Route>
        <Route path='/category' element={<Categories />}></Route>
        <Route path='/fullProductDetails' element={<FullProductDetails />}></Route>
      </Route>
    )
  )

  return (

    <>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  )
}

export default App
