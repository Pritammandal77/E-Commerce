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

function Header() {
    const dispatch = useDispatch()

    const query = useSelector((state) => state.searchProduct.query)

    //Getting auth state from the store 
    const { user, isloggedOut } = useSelector((state) => state.auth)

    //getting user input , and sending(dispatching) to the searchproductslice
    let value;
    const handleChange = (e) => {
        value = e.target.value
        console.log(value)
        dispatch(setQuery(value))
    }

    useEffect(() => {
        if (query.trim()) {
            dispatch(fetchSearchProducts(query)); // Fetch API when input changes
        }
    }, [query, dispatch]);


    const navigate = useNavigate();

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            navigate(`/searchedproducts`); // Navigate on Enter key press
        }
    };


    const HandleOpenHamburger = () => {
        let hamburgerDiv = document.querySelector(".HamburgerDiv")
        hamburgerDiv.style.display = "flex";
    }


    const HandleCloseHamburger = () => {
        let hamburgerDiv = document.querySelector(".HamburgerDiv")
        hamburgerDiv.style.display = "none";
    }

    console.log("isloggedOut", isloggedOut)
    console.log("User :- ", user)


    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userImage, setUserImage] = useState(null)
    const [userEmail, setUserEmail] = useState(null)
    const [userName, setUserName] = useState(null)
    //Getting data of user when thwe auth state changes

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user)
                const uid = user.uid;
                console.log(uid)
                console.log(user.email)
                console.log(user.displayName)
                console.log(user.photoURL)
                setUserImage(user.photoURL)
                setUserEmail(user.email)
                setIsLoggedIn(true)
                setUserName(user.displayName)

                //when a user logged in , they will redirect to home screen after a successful login 
                // navigate('/')

            } else {
                console.log('user is logged out')
            }
        });
    }, [auth, isloggedOut]);


    //if user clicks on logout button then dispatch logout
    const handleLogOut = () => {
        dispatch(handleLogout())

        //popup message , when the user logs out
        if (isloggedOut == true) {
            Swal.fire({
                title: "Logged Out Successfully",
                icon: "success",
                draggable: true
            });
        }
    }

    console.log('email', userEmail && userEmail)


    //code for setting modes
    const handleLightMode = () => {
        dispatch(setMode('light'))
    }
    const handleDarkMode = () => {
        dispatch(setMode('dark'))

    }

    //we are getting the state of mode from our mode store
    const changeMode = useSelector((state) => state.mode)
    console.log('mode', changeMode.currentMode)

    if (changeMode.currentMode == 'light') {
        let header = document.querySelector('.header')
        let hamburger = document.querySelector('.HamburgerBody')
        if (header) {
            header.style.backgroundColor = '#111827'
        }
        if (hamburger) {
            hamburger.style.backgroundColor = '#111827'
        }
    }

    if (changeMode.currentMode == 'dark') {
        let header = document.querySelector('.header')
        let hamburger = document.querySelector('.HamburgerBody')

        header.style.backgroundColor = 'black'
        hamburger.style.backgroundColor = 'black'

    }


    return (
        <>
            <header className='header z-20 flex bg-gray-900 h-15 justify-between items-center fixed w-[100vw] top-0 left-0 p-0 md:px-10 lg:px-20 xl:px-10'>
                <div className='flex text-2xl font-semibold cursor-pointer text-white px-3'>
                    <NavLink to=''>Metamart</NavLink>
                </div>
                <div className='mr-2 md:mr-0 lg:mr-0 xl:mr-0'>
                    <ul className='flex items-center gap-5 mr-5 lg:gap-15 '>
                        <li className='flex bg-yellow-500 text-black items-center w-[50vw] md:w-[45vw] xl:w-[42.5vw] rounded-xl' >
                            <input type="text" className='input flex bg-white w-[40vw] h-9 rounded-l-xl px-2 text-[18px] lg:text-xl'
                                value={query} onChange={handleChange} list='products'
                                onKeyDown={handleKeyDown} />
                            <datalist id='products'>
                                <option value='beauty'>beauty</option>
                                <option value='fragrance'>fragrance</option>
                                <option value='furniture'>furniture</option>
                                <option value='groceries'>groceries</option>
                                <option value='home-decoration'>home decoration</option>
                                <option value='kitchen-accessories'>kitchen accessories</option>
                                <option value='laptops'>laptops</option>
                                <option value='mens-shirts'>mens shirts</option>
                                <option value='mens-watches'>watches</option>
                                <option value='mobile-accessories'>mobile accessories</option>
                                <option value='motorcycle'>motorcycle</option>
                                <option value='skin-care'>skin care</option>
                                <option value='smartphones'>Smartphones</option>
                                <option value='sports-accessories'>sports accessories</option>
                                <option value='sunglasses'>sunglasses</option>
                                <option value='tablets'>tablets</option>
                                <option value='tops'>tops</option>
                                <option value='vehicle'>vehicle</option>
                                <option value='womens-bags'>womens bags</option>
                                <option value='womens-dresses'>womens dresses</option>
                                <option value='womens-jewellery'>jewellery</option>
                                <option value='womens-shoes'>womens shoes</option>
                                <option value='womens-watches'>womens watches</option>
                            </datalist>
                            <NavLink to='/searchedproducts'><i className="fa-solid fa-magnifying-glass ml-2 text-xl cursor-pointer"></i></NavLink>
                        </li>
                        <li className=' hidden lg:flex xl:flex gap-2 '>
                            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#ffffff"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"
                                className='cursor-pointer' /></svg>
                            <p className='text-white text-xl'>Cart</p>
                        </li>
                        {/* <li className='hidden lg:flex xl:flex gap-2'>
                            <NavLink to='/signup'>
                                <button className='bg-gray-700 h-10 w-30 text-white rounded-2xl cursor-pointer text-xl'>Login</button>
                            </NavLink>
                        </li> */}

                        <li className="iconToOpenHamburger">
                            <i className="fa-solid fa-bars text-[20px] mr-0 cursor-pointer" id='menuIcon' style={{ color: 'white' }} onClick={HandleOpenHamburger}></i>
                        </li>

                        <div className='HamburgerDiv hidden h-[100vh] w-[50vw] lg:w-[25vw] absolute top-0 right-0 bg-gray-900'>
                            <div className='HamburgerBody flex flex-col h-[100vh] w-[50vw] lg:w-[25vw] absolute top-0 right-0 bg-gray-900'>
                                <i className="fa-solid fa-xmark text-white xMark self-end mt-5 mr-4 
                                text-[23px] lg:mr-14 cursor-pointer" onClick={HandleCloseHamburger}></i>

                                <ul className="Hamburgerul flex flex-col w-full gap-5 pl-5 mt-10 lg:pl-10">
                                    <li className='self-center'>
                                        <img src={userImage ? (userImage) : ('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnFcoNkDNEQ9sXq36dfEj8FZjB4n_X3VFFew&s')} alt="not found"
                                            className='rounded-full w-20' />
                                    </li>
                                    <li onClick={HandleCloseHamburger} className='self-center'>
                                        {
                                            isLoggedIn ? (
                                                <h1 className='text-xl text-white'>Welcome</h1>
                                            ) : (
                                                <NavLink to='/signup'>
                                                    <button className='bg-gray-700 h-10 w-30 text-white rounded-2xl cursor-pointer text-xl'>Login</button>
                                                </NavLink>
                                            )
                                        }

                                    </li>
                                    <li className='self-center text-white text-xl'>
                                        {userName ? (userName) : 'How Are You'}
                                    </li>
                                    <li className='text-white self-center'>
                                        {userEmail ? (userEmail) : ('user not found')}
                                    </li>
                                    <li>
                                        {isLoggedIn ? (
                                            <button className='bg-gray-700 h-10 w-30 text-white rounded-2xl cursor-pointer text-xl'
                                                onClick={handleLogOut}>Logout</button>
                                        ) : ("")}

                                    </li>
                                    <li className='flex'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#ffffff"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"
                                            className='cursor-pointer' /></svg>
                                        <p className='text-white text-xl'>Cart</p>
                                    </li>
                                    <li>

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
                                                    {/* <li>
                                                        <label htmlFor="default">
                                                            <span className="theme-popup__icons">
                                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.5 2.52267C6.13332 2.64713 4.86254 3.27802 3.9372 4.29146C3.01186 5.3049 2.49882 6.62766 2.49882 8C2.49882 9.37234 3.01186 10.6951 3.9372 11.7085C4.86254 12.722 6.13332 13.3529 7.5 13.4773V2.52267ZM1.5 8C1.5 4.41 4.41 1.5 8 1.5C11.59 1.5 14.5 4.41 14.5 8C14.5 11.59 11.59 14.5 8 14.5C4.41 14.5 1.5 11.59 1.5 8Z" fill="currentColor"></path>
                                                                </svg>
                                                            </span>
                                                            <span>
                                                                OS Default
                                                            </span>
                                                        </label>
                                                    </li> */}
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
                                                            <span className="theme-popup__icons">
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
