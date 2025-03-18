import React, { useEffect, useState } from 'react';
import './Header.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchProducts, setQuery } from '../../features/SearchProducts/SearchProductSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { handleLogout } from '../../features/Auth/SignUp/SignUp';
import { setMode } from '../../features/themeMode/themeMode';
import Swal from 'sweetalert2'
import { fetchCart } from '../../features/CartFeature/CartFeature';
import { fetchOrderHistory } from '../../features/Orders/OrderSlice';


function Header() {

    const { items, status, error } = useSelector((state) => state.cart)
    const { products } = useSelector((state) => state.orders)
    const query = useSelector((state) => state.searchProduct.query)
    const currentMode = useSelector((state) => state.mode.currentMode)
    const { user, isloggedOut } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate();

    //getting user input , and sending(dispatching) to the searchproductslice
    let value;
    const handleChange = (e) => {
        value = e.target.value
        dispatch(setQuery(value))
    }

    useEffect(() => {
        if (query.trim()) {
            dispatch(fetchSearchProducts(query)); // Fetch API when input changes
        }
    }, [query, dispatch]);


    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            navigate(`/searchedproducts`); // Navigate on Enter key press
        }
    };

    //to open & clode hamburger
    let hamburgerDiv = document.querySelector(".HamburgerDiv")
    const HandleOpenHamburger = () => {
        hamburgerDiv.style.display = "flex";
    }

    const HandleCloseHamburger = () => {
        hamburgerDiv.style.display = "none";
    }

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userImage, setUserImage] = useState(null)
    const [userEmail, setUserEmail] = useState(null)
    const [userName, setUserName] = useState(null)

    //Getting data of user when the auth state changes
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // console.log(user)
                setUserImage(user.photoURL)
                setUserEmail(user.email)
                setIsLoggedIn(true)
                setUserName(user.displayName)

                //if we have user logged in, then we are fetching the cart , & the users order history
                dispatch(fetchCart())
                dispatch(fetchOrderHistory())
            } else {
                console.log('no user logged in')
            }
        });
    }, [auth, isloggedOut]);


    //if user clicks on logout button then dispatch logout
    const handleLogOut = () => {
        dispatch(handleLogout()).then(() => {
            //popup message , when the user logs out
            Swal.fire({
                title: "Logged Out Successfully",
                icon: "success",
                draggable: true
            });
            location.reload();
        })
    }

    //code for setting modes
    const handleLightMode = () => {
        dispatch(setMode('light'))
    }
    const handleDarkMode = () => {
        dispatch(setMode('dark'))
    }

    const [lengthOfCart, setLengthOfCart] = useState(null)
    const [lengthOfOrder, setLengthOfOrders] = useState(0)

    // whenever the user add something to cart , or order something the quantity to that thing increases
    useEffect(() => {
        setLengthOfCart(items.length);
        setLengthOfOrders(products.length)
    }, [items, products]); 

    return (
        <>
            <header className={`header z-20 flex  h-15 justify-between items-center text-white fixed w-[100vw] top-0 left-0 p-0 md:px-10 lg:px-20 xl:px-10
                 ${currentMode == 'dark' ? 'bg-black ' : 'bg-gray-900'}`}>
                <div className='flex text-2xl font-semibold cursor-pointer text-white px-3'>
                    <NavLink to=''>AuraMart</NavLink>
                </div>
                <div className='mr-2 md:mr-0 lg:mr-0 xl:mr-0'>
                    <ul className='flex items-center gap-5 mr-5 lg:gap-15 '>
                        <li className='flex bg-yellow-500 text-black items-center w-[50vw] md:w-[45vw] xl:w-[42.5vw] rounded-xl' >
                            <input type="text" className='input flex bg-white w-[40vw] h-9 rounded-l-xl px-2 text-[18px] lg:text-xl'
                                value={query} onChange={handleChange}
                                onKeyDown={handleKeyDown} />
                            <NavLink to='/searchedproducts'><i className="fa-solid fa-magnifying-glass ml-2 text-xl cursor-pointer"></i></NavLink>
                        </li>
                        <li className=' hidden md:flex gap-2 '>
                            <NavLink to='/cart' className='flex gap-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#ffffff"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"
                                    className='cursor-pointer' /></svg>
                                <p className='text-white text-xl'>Cart</p>
                                <p className='bg-red-500 px-2 rounded-full text-xl'>{lengthOfCart}</p>
                            </NavLink>

                        </li>

                        <li className="iconToOpenHamburger">
                            <i className="fa-solid fa-bars text-[25px] mr-0 cursor-pointer" id='menuIcon' style={{ color: 'white' }} onClick={HandleOpenHamburger}></i>
                        </li>

                        <div className={`HamburgerDiv hidden h-[100vh] w-[55vw] lg:w-[25vw] absolute top-0 right-0 
                             ${currentMode == 'dark' ? 'bg-black ' : 'bg-gray-900'}`}>
                            <div className='HamburgerBody flex flex-col h-[100vh] w-[55vw] lg:w-[25vw] absolute top-0 right-0 '>
                                <i className="fa-solid fa-xmark text-white xMark self-end mt-5 mr-4 
                                text-[25px] lg:mr-14 cursor-pointer" onClick={HandleCloseHamburger}></i>

                                <ul className="Hamburgerul flex flex-col w-full gap-5 lg:gap-4 pl-5 mt-10 lg:pl-10 ">
                                    <li className='self-center'>
                                        <img src={userImage ? (userImage) : ('data:image/jpeg;base64,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')} alt="not found"
                                            className='rounded-full w-20 text-white' />
                                    </li>
                                    <li onClick={HandleCloseHamburger} className='self-center flex flex-col justify-center items-center'>
                                        {
                                            isLoggedIn ? (
                                                <h1 className='text-xl text-white'>Welcome</h1>
                                            ) : (
                                                <NavLink to='/signup'>
                                                    <button className='bg-green-400 h-10 w-30 text-black rounded-2xl cursor-pointer text-xl'>Login</button>
                                                </NavLink>
                                            )
                                        }
                                        <p className='self-center text-white text-xl'>
                                            {userName ? (userName) : ''}
                                        </p>
                                        <p className='text-white self-center text-[15px] md:text-xl' >
                                            {userEmail ? (userEmail) : ('')}
                                        </p>
                                    </li>
                                    <hr className='w-[80%] self-center text-gray-500' />


                                    <li onClick={HandleCloseHamburger}>
                                        <NavLink to='/' className='flex items-center gap-2 text-xl'
                                            style={({ isActive }) => ({
                                                color: isActive ? "#4ade80" : "white",
                                                fontWeight: isActive ? "600" : "400",
                                            })}
                                        >
                                            <i className="fa-solid fa-house"></i>
                                            <p className=' text-xl'>Home</p>

                                        </NavLink>
                                    </li>
                                    <li onClick={HandleCloseHamburger}>
                                        <NavLink to='/category' className='flex items-center gap-2 text-xl'
                                            style={({ isActive }) => ({
                                                color: isActive ? "#4ade80" : "white",
                                                fontWeight: isActive ? "600" : "400",
                                            })}
                                        >
                                            <i className="fa-solid fa-list"></i>
                                            <p className=' text-xl'>Categories</p>

                                        </NavLink>
                                    </li>
                                    <li onClick={HandleCloseHamburger}>
                                        <NavLink to='/cart' className='flex items-center gap-2 text-xl'
                                            style={({ isActive }) => ({
                                                color: isActive ? "#4ade80" : "white",
                                                fontWeight: isActive ? "600" : "400",
                                            })}
                                        >
                                            <i className="fa-solid fa-cart-shopping"></i>
                                            <p className=' text-xl'>Cart</p>
                                            <p className='bg-red-600 text-white px-2 rounded-full text-xl'>{lengthOfCart}</p>
                                        </NavLink>
                                    </li>
                                    <li onClick={HandleCloseHamburger}>
                                        <NavLink to='/orderhistory' className='text-white flex items-center gap-2 text-xl'
                                            style={({ isActive }) => ({
                                                color: isActive ? "#4ade80" : "white",
                                                fontWeight: isActive ? "600" : "400",
                                            })}
                                        >
                                            <i className="fa-solid fa-bag-shopping "></i>
                                            <p>Orders</p>
                                            <p className='bg-red-600 text-white px-2 rounded-full text-xl'>{lengthOfOrder}</p>
                                        </NavLink>
                                    </li>
                                    <li onClick={HandleCloseHamburger}>
                                        <NavLink to='/aboutus' className='text-white flex items-center gap-2 text-xl'
                                            style={({ isActive }) => ({
                                                color: isActive ? "#4ade80" : "white",
                                                fontWeight: isActive ? "600" : "400",
                                            })}
                                        >
                                            <i className="fa-solid fa-info-circle"></i>
                                            <p>About Us</p>

                                        </NavLink>
                                    </li>
                                    {isLoggedIn &&
                                        <li>
                                            <p className='text-white flex items-center gap-2 text-xl cursor-pointer' onClick={handleLogOut}>
                                                <i className="fa-solid fa-right-from-bracket text-white"></i> Sign Out
                                            </p>
                                        </li>
                                    }
                                    <li className='flex gap-2 items-center'>
                                        <i className="fa-solid fa-circle-half-stroke text-white text-xl"></i>
                                        <div className="theme-popup">
                                            <input type="radio" name="theme" id="default" />
                                            <input type="radio" name="theme" id="light" defaultChecked />
                                            <input type="radio" name="theme" id="dark" />
                                            <input type="checkbox" id="checkbox" />
                                            <label htmlFor="checkbox" className="theme-popup__button">
                                                <span className="theme-popup__icons">
                                                    <svg className="default" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.5 2.52267C6.13332 2.64713 4.86254 3.27802 3.9372 4.29146C3.01186 5.3049 2.49882 6.62766 2.49882 8C2.49882 9.37234 3.01186 10.6951 3.9372 11.7085C4.86254 12.722 6.13332 13.3529 7.5 13.4773V2.52267ZM1.5 8C1.5 4.41 4.41 1.5 8 1.5C11.59 1.5 14.5 4.41 14.5 8C14.5 11.59 11.59 14.5 8 14.5C4.41 14.5 1.5 11.59 1.5 8Z" fill="currentColor"></path>
                                                    </svg>
                                                    <svg className="sun" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <g clipPath="url(#clip0_78_63)">
                                                            <path d="M7.99998 3.99256C5.79024 3.99256 3.99254 5.79061 3.99254 8.00035C3.99254 10.2101 5.79024 12.0081 7.99998 12.0081C10.2094 12.0081 12.0074 10.2105 12.0074 8.00035C12.0074 5.79026 10.2094 3.99256 7.99998 3.99256ZM7.99998 2.81453C7.79266 2.81453 7.59383 2.73219 7.4472 2.58563C7.30057 2.43907 7.21814 2.24027 7.21805 2.03295V0.781931C7.21805 0.57455 7.30043 0.375663 7.44707 0.229022C7.59371 0.0823818 7.7926 0 7.99998 0C8.20736 0 8.40625 0.0823818 8.55289 0.229022C8.69953 0.375663 8.78191 0.57455 8.78191 0.781931V2.03295C8.78182 2.24027 8.6994 2.43907 8.55276 2.58563C8.40613 2.73219 8.2073 2.81453 7.99998 2.81453ZM7.99998 13.1851C7.8973 13.1851 7.79562 13.2053 7.70075 13.2446C7.60588 13.2839 7.51968 13.3415 7.44707 13.4141C7.37446 13.4868 7.31687 13.573 7.27757 13.6678C7.23828 13.7627 7.21805 13.8644 7.21805 13.9671V15.2177C7.21805 15.4251 7.30043 15.624 7.44707 15.7706C7.59371 15.9173 7.7926 15.9996 7.99998 15.9996C8.20736 15.9996 8.40625 15.9173 8.55289 15.7706C8.69953 15.624 8.78191 15.4251 8.78191 15.2177V13.9671C8.78182 13.7597 8.69941 13.5609 8.55279 13.4142C8.40617 13.2676 8.20733 13.1852 7.99998 13.1851ZM11.6662 4.33339C11.5197 4.18671 11.4374 3.98785 11.4374 3.78051C11.4374 3.57318 11.5197 3.37432 11.6662 3.22764L12.5509 2.34296C12.6232 2.26911 12.7095 2.21033 12.8047 2.17003C12.8999 2.12972 13.0021 2.1087 13.1055 2.10816C13.2088 2.10762 13.3113 2.12758 13.4069 2.16689C13.5025 2.2062 13.5894 2.26408 13.6625 2.33717C13.7356 2.41026 13.7934 2.49712 13.8327 2.59273C13.872 2.68833 13.892 2.79078 13.8915 2.89415C13.8909 2.99752 13.8699 3.09976 13.8296 3.19494C13.7893 3.29013 13.7305 3.37639 13.6567 3.44872L12.772 4.33339C12.6254 4.48001 12.4265 4.56238 12.2191 4.56238C12.0117 4.56238 11.8129 4.48001 11.6662 4.33339ZM4.33337 11.667C4.26081 11.5943 4.17463 11.5366 4.07976 11.4973C3.98489 11.4579 3.8832 11.4377 3.78049 11.4377C3.67779 11.4377 3.5761 11.4579 3.48123 11.4973C3.38636 11.5366 3.30018 11.5943 3.22762 11.667L2.34294 12.5513C2.19882 12.6984 2.11858 12.8965 2.11966 13.1025C2.12073 13.3084 2.20303 13.5057 2.34867 13.6513C2.49431 13.797 2.69154 13.8793 2.8975 13.8803C3.10347 13.8814 3.30154 13.8012 3.4487 13.657L4.33337 12.772C4.40599 12.6995 4.46361 12.6134 4.50291 12.5186C4.54222 12.4237 4.56245 12.3221 4.56245 12.2195C4.56245 12.1169 4.54222 12.0152 4.50291 11.9204C4.46361 11.8256 4.40599 11.7395 4.33337 11.667ZM13.1851 8C13.1851 7.56811 13.5351 7.21807 13.967 7.21807H15.218C15.3221 7.21585 15.4256 7.23444 15.5224 7.27273C15.6191 7.31102 15.7073 7.36825 15.7817 7.44106C15.8561 7.51387 15.9152 7.6008 15.9555 7.69675C15.9958 7.7927 16.0166 7.89574 16.0166 7.99982C16.0166 8.10391 15.9958 8.20695 15.9555 8.3029C15.9152 8.39884 15.8561 8.48577 15.7817 8.55859C15.7073 8.6314 15.6191 8.68863 15.5224 8.72692C15.4256 8.76521 15.3221 8.78379 15.218 8.78158H13.967C13.8644 8.78162 13.7627 8.76144 13.6678 8.72218C13.573 8.68293 13.4868 8.62536 13.4141 8.55278C13.3415 8.4802 13.2839 8.39403 13.2446 8.29918C13.2053 8.20433 13.1851 8.10267 13.1851 8ZM2.81451 8C2.81451 7.89732 2.79428 7.79564 2.75499 7.70077C2.71569 7.6059 2.65809 7.5197 2.58548 7.44709C2.51288 7.37448 2.42668 7.31689 2.33181 7.27759C2.23694 7.23829 2.13526 7.21807 2.03258 7.21807H0.781912C0.67785 7.21585 0.574393 7.23444 0.477607 7.27273C0.380821 7.31102 0.292654 7.36825 0.218276 7.44106C0.143897 7.51387 0.0848039 7.6008 0.044461 7.69675C0.00411808 7.7927 -0.0166626 7.89574 -0.0166626 7.99982C-0.0166626 8.10391 0.00411808 8.20695 0.044461 8.3029C0.0848039 8.39884 0.143897 8.48577 0.218276 8.55859C0.292654 8.6314 0.380821 8.68863 0.477607 8.72692C0.574393 8.76521 0.67785 8.78379 0.781912 8.78158H2.03293C2.24022 8.78158 2.43901 8.69923 2.58559 8.55266C2.73216 8.40608 2.81451 8.20729 2.81451 8ZM11.6662 11.667C11.8129 11.5204 12.0118 11.4381 12.2191 11.4381C12.4264 11.4381 12.6253 11.5204 12.772 11.667L13.6567 12.5516C13.8033 12.6983 13.8856 12.8971 13.8856 13.1045C13.8855 13.3118 13.8031 13.5106 13.6565 13.6572C13.5839 13.7298 13.4977 13.7874 13.4028 13.8266C13.308 13.8659 13.2063 13.8861 13.1037 13.8861C12.8963 13.8861 12.6975 13.8037 12.5509 13.657L11.6662 12.7724C11.5936 12.6998 11.536 12.6137 11.4967 12.5188C11.4574 12.424 11.4371 12.3223 11.4371 12.2197C11.4371 12.117 11.4574 12.0153 11.4967 11.9205C11.536 11.8257 11.5936 11.7395 11.6662 11.667ZM4.33337 4.33339C4.48 4.18675 4.56237 3.98788 4.56237 3.78051C4.56237 3.57315 4.48 3.37427 4.33337 3.22764L3.4487 2.34331C3.3011 2.20166 3.10386 2.12349 2.89929 2.12558C2.69473 2.12766 2.49913 2.20983 2.35445 2.35447C2.20976 2.4991 2.12753 2.69468 2.12538 2.89924C2.12323 3.10381 2.20133 3.30107 2.34294 3.44872L3.22762 4.33339C3.30018 4.40608 3.38636 4.46374 3.48123 4.50308C3.5761 4.54243 3.67779 4.56268 3.78049 4.56268C3.8832 4.56268 3.98489 4.54243 4.07976 4.50308C4.17463 4.46374 4.26081 4.40608 4.33337 4.33339Z" fill="currentColor"></path>
                                                        </g>
                                                        <defs>
                                                            <clipPath>
                                                                <rect width="16" height="16" fill="currentColor"></rect>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    <svg className="moon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clipPath="url(#clip0_78_60)">
                                                            <path d="M7.24135 14C10.1123 13.9981 12.6803 12.2445 13.7367 9.59537C13.7953 9.44832 13.727 9.39266 13.5866 9.46575C12.7818 9.88471 11.888 10.1036 10.9806 10.104C7.86082 10.1042 5.33169 7.57506 5.33188 4.45524C5.3323 3.64636 5.50645 2.84701 5.84254 2.11127C6.17863 1.37552 6.66883 0.720544 7.27996 0.190644C7.42672 0.0486062 7.38444 -0.0171645 7.09498 0.00382823C3.42058 0.029058 0.24231 3.13569 0.24231 7.00113C0.24231 10.8666 3.3758 14.0002 7.24135 14Z" fill="currentColor"></path>
                                                        </g>
                                                        <defs>
                                                            <clipPath>
                                                                <rect width="14" height="14" fill="currentColor"></rect>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </span>
                                                Theme
                                            </label>
                                            <div className="theme-popup__list-container">
                                                <ul className="theme-popup__list">
                                                    <li>
                                                        <label htmlFor="light" onClick={handleLightMode}>
                                                            <span className="theme-popup__icons">
                                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                    <g clipPath="url(#clip0_78_63)">
                                                                        <path d="M7.99998 3.99256C5.79024 3.99256 3.99254 5.79061 3.99254 8.00035C3.99254 10.2101 5.79024 12.0081 7.99998 12.0081C10.2094 12.0081 12.0074 10.2105 12.0074 8.00035C12.0074 5.79026 10.2094 3.99256 7.99998 3.99256ZM7.99998 2.81453C7.79266 2.81453 7.59383 2.73219 7.4472 2.58563C7.30057 2.43907 7.21814 2.24027 7.21805 2.03295V0.781931C7.21805 0.57455 7.30043 0.375663 7.44707 0.229022C7.59371 0.0823818 7.7926 0 7.99998 0C8.20736 0 8.40625 0.0823818 8.55289 0.229022C8.69953 0.375663 8.78191 0.57455 8.78191 0.781931V2.03295C8.78182 2.24027 8.6994 2.43907 8.55276 2.58563C8.40613 2.73219 8.2073 2.81453 7.99998 2.81453ZM7.99998 13.1851C7.8973 13.1851 7.79562 13.2053 7.70075 13.2446C7.60588 13.2839 7.51968 13.3415 7.44707 13.4141C7.37446 13.4868 7.31687 13.573 7.27757 13.6678C7.23828 13.7627 7.21805 13.8644 7.21805 13.9671V15.2177C7.21805 15.4251 7.30043 15.624 7.44707 15.7706C7.59371 15.9173 7.7926 15.9996 7.99998 15.9996C8.20736 15.9996 8.40625 15.9173 8.55289 15.7706C8.69953 15.624 8.78191 15.4251 8.78191 15.2177V13.9671C8.78182 13.7597 8.69941 13.5609 8.55279 13.4142C8.40617 13.2676 8.20733 13.1852 7.99998 13.1851ZM11.6662 4.33339C11.5197 4.18671 11.4374 3.98785 11.4374 3.78051C11.4374 3.57318 11.5197 3.37432 11.6662 3.22764L12.5509 2.34296C12.6232 2.26911 12.7095 2.21033 12.8047 2.17003C12.8999 2.12972 13.0021 2.1087 13.1055 2.10816C13.2088 2.10762 13.3113 2.12758 13.4069 2.16689C13.5025 2.2062 13.5894 2.26408 13.6625 2.33717C13.7356 2.41026 13.7934 2.49712 13.8327 2.59273C13.872 2.68833 13.892 2.79078 13.8915 2.89415C13.8909 2.99752 13.8699 3.09976 13.8296 3.19494C13.7893 3.29013 13.7305 3.37639 13.6567 3.44872L12.772 4.33339C12.6254 4.48001 12.4265 4.56238 12.2191 4.56238C12.0117 4.56238 11.8129 4.48001 11.6662 4.33339ZM4.33337 11.667C4.26081 11.5943 4.17463 11.5366 4.07976 11.4973C3.98489 11.4579 3.8832 11.4377 3.78049 11.4377C3.67779 11.4377 3.5761 11.4579 3.48123 11.4973C3.38636 11.5366 3.30018 11.5943 3.22762 11.667L2.34294 12.5513C2.19882 12.6984 2.11858 12.8965 2.11966 13.1025C2.12073 13.3084 2.20303 13.5057 2.34867 13.6513C2.49431 13.797 2.69154 13.8793 2.8975 13.8803C3.10347 13.8814 3.30154 13.8012 3.4487 13.657L4.33337 12.772C4.40599 12.6995 4.46361 12.6134 4.50291 12.5186C4.54222 12.4237 4.56245 12.3221 4.56245 12.2195C4.56245 12.1169 4.54222 12.0152 4.50291 11.9204C4.46361 11.8256 4.40599 11.7395 4.33337 11.667ZM13.1851 8C13.1851 7.56811 13.5351 7.21807 13.967 7.21807H15.218C15.3221 7.21585 15.4256 7.23444 15.5224 7.27273C15.6191 7.31102 15.7073 7.36825 15.7817 7.44106C15.8561 7.51387 15.9152 7.6008 15.9555 7.69675C15.9958 7.7927 16.0166 7.89574 16.0166 7.99982C16.0166 8.10391 15.9958 8.20695 15.9555 8.3029C15.9152 8.39884 15.8561 8.48577 15.7817 8.55859C15.7073 8.6314 15.6191 8.68863 15.5224 8.72692C15.4256 8.76521 15.3221 8.78379 15.218 8.78158H13.967C13.8644 8.78162 13.7627 8.76144 13.6678 8.72218C13.573 8.68293 13.4868 8.62536 13.4141 8.55278C13.3415 8.4802 13.2839 8.39403 13.2446 8.29918C13.2053 8.20433 13.1851 8.10267 13.1851 8ZM2.81451 8C2.81451 7.89732 2.79428 7.79564 2.75499 7.70077C2.71569 7.6059 2.65809 7.5197 2.58548 7.44709C2.51288 7.37448 2.42668 7.31689 2.33181 7.27759C2.23694 7.23829 2.13526 7.21807 2.03258 7.21807H0.781912C0.67785 7.21585 0.574393 7.23444 0.477607 7.27273C0.380821 7.31102 0.292654 7.36825 0.218276 7.44106C0.143897 7.51387 0.0848039 7.6008 0.044461 7.69675C0.00411808 7.7927 -0.0166626 7.89574 -0.0166626 7.99982C-0.0166626 8.10391 0.00411808 8.20695 0.044461 8.3029C0.0848039 8.39884 0.143897 8.48577 0.218276 8.55859C0.292654 8.6314 0.380821 8.68863 0.477607 8.72692C0.574393 8.76521 0.67785 8.78379 0.781912 8.78158H2.03293C2.24022 8.78158 2.43901 8.69923 2.58559 8.55266C2.73216 8.40608 2.81451 8.20729 2.81451 8ZM11.6662 11.667C11.8129 11.5204 12.0118 11.4381 12.2191 11.4381C12.4264 11.4381 12.6253 11.5204 12.772 11.667L13.6567 12.5516C13.8033 12.6983 13.8856 12.8971 13.8856 13.1045C13.8855 13.3118 13.8031 13.5106 13.6565 13.6572C13.5839 13.7298 13.4977 13.7874 13.4028 13.8266C13.308 13.8659 13.2063 13.8861 13.1037 13.8861C12.8963 13.8861 12.6975 13.8037 12.5509 13.657L11.6662 12.7724C11.5936 12.6998 11.536 12.6137 11.4967 12.5188C11.4574 12.424 11.4371 12.3223 11.4371 12.2197C11.4371 12.117 11.4574 12.0153 11.4967 11.9205C11.536 11.8257 11.5936 11.7395 11.6662 11.667ZM4.33337 4.33339C4.48 4.18675 4.56237 3.98788 4.56237 3.78051C4.56237 3.57315 4.48 3.37427 4.33337 3.22764L3.4487 2.34331C3.3011 2.20166 3.10386 2.12349 2.89929 2.12558C2.69473 2.12766 2.49913 2.20983 2.35445 2.35447C2.20976 2.4991 2.12753 2.69468 2.12538 2.89924C2.12323 3.10381 2.20133 3.30107 2.34294 3.44872L3.22762 4.33339C3.30018 4.40608 3.38636 4.46374 3.48123 4.50308C3.5761 4.54243 3.67779 4.56268 3.78049 4.56268C3.8832 4.56268 3.98489 4.54243 4.07976 4.50308C4.17463 4.46374 4.26081 4.40608 4.33337 4.33339Z" fill="currentColor"></path>
                                                                    </g>
                                                                    <defs>
                                                                        <clipPath>
                                                                            <rect width="16" height="16" fill="currentColor"></rect>
                                                                        </clipPath>
                                                                    </defs>
                                                                </svg>
                                                            </span>
                                                            <span>
                                                                Light
                                                            </span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label htmlFor="dark" onClick={handleDarkMode}>
                                                            <span className="theme-popup__icons ">
                                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                    <g clipPath="url(#clip0_78_60)">
                                                                        <path d="M7.24135 14C10.1123 13.9981 12.6803 12.2445 13.7367 9.59537C13.7953 9.44832 13.727 9.39266 13.5866 9.46575C12.7818 9.88471 11.888 10.1036 10.9806 10.104C7.86082 10.1042 5.33169 7.57506 5.33188 4.45524C5.3323 3.64636 5.50645 2.84701 5.84254 2.11127C6.17863 1.37552 6.66883 0.720544 7.27996 0.190644C7.42672 0.0486062 7.38444 -0.0171645 7.09498 0.00382823C3.42058 0.029058 0.24231 3.13569 0.24231 7.00113C0.24231 10.8666 3.3758 14.0002 7.24135 14Z" fill="currentColor"></path>
                                                                    </g>
                                                                    <defs>
                                                                        <clipPath>
                                                                            <rect width="14" height="14" fill="currentColor"></rect>
                                                                        </clipPath>
                                                                    </defs>
                                                                </svg>
                                                            </span>
                                                            <span>
                                                                Night
                                                            </span>
                                                        </label>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </ul >
                </div >
            </header >
        </>
    );
}

export default Header;
