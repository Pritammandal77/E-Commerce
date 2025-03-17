import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function Footer() {

    const currentMode = useSelector((state) => state.mode.currentMode)

    console.log("mode in footer", currentMode)
    return (
        <>
            <footer className={`text-white py-8 h-auto
                 ${currentMode == 'dark' ? 'bg-black' : 'bg-gray-900'}`}>
                <div className="container mx-auto flex justify-between gap-8 px-20
              flex-col lg:flex-row">
                    <div>
                        <h2 className="text-2xl font-bold mb-3">AuraMart</h2>
                        <p>Where Quality Meets Affordability! </p>
                        <p>Your One-Stop Shop for Everything</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold mb-3">Customer Service</h2>
                        <ul className="space-y-2">
                            <li className='hover:text-green-400'><NavLink to="/orderhistory">Order Tracking</NavLink></li>
                            <li className='hover:text-green-400'><NavLink to="/cart">Cart Products</NavLink></li>
                            <li>FAQs</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold mb-3">Contact Me On</h2>
                        <ul>
                            <li><a href="mailto:pritampmandal@gmail.com">Email: pritampmandal@gmail.com</a></li>
                            <li><a href="tel:+919881228004">Phone: +91 98812 28004</a></li>
                        </ul>

                    </div>

                    <div>
                        <h2 className="text-lg font-bold mb-3">Follow Me On</h2>
                        <div className="flex space-x-4">
                            <ul className="social-icons flex gap-3 text-2xl lg:text-3xl">
                                <li className='hover:scale-110'><a href="https://www.linkedin.com/in/pritam-mandal-871510281?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank"><i className="fa-brands fa-linkedin"></i></a></li>
                                <li className='hover:scale-110'><a href="https://github.com/Pritammandal77" target="_blank"><i className="fa-brands fa-github "></i></a></li>
                                <li className='hover:scale-110'><a href="https://www.instagram.com/pritam_mandal_77/profilecard/?igsh=MWE5cXF5ZGpxam84eA==" target="_blank"><i className="fa-brands fa-square-instagram "></i></a></li>
                                <li className='hover:scale-110'><a href="https://x.com/pritam_mandal77?t=QZAOEcjIQOm58j1hsAq2Bg&s=09" target="_blank"><i className="fa-brands fa-square-x-twitter"></i></a></li>
                            </ul>
                        </div>

                    </div>
                </div>

                <div className="text-center mt-8 border-t border-gray-700 pt-4">
                    © {new Date().getFullYear()} AuraMart. All Rights Reserved.
                </div>
            </footer>

        </>
    );
}

export default Footer;
