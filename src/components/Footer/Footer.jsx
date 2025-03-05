import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useSelector } from 'react-redux';

function Footer() {

    const changeMode = useSelector((state) => state.mode)

    if (changeMode.currentMode == 'light') {
        let footer = document.querySelector('.footer')
        // footer.style.backgroundColor = 'red'
        if (footer) {
            footer.style.backgroundColor = '#111827'

        }

    }

    if (changeMode.currentMode == 'dark') {
        let footer = document.querySelector('.footer')
        footer.style.backgroundColor = 'black'

    }

    return (
        <>
            <footer className="footer bg-gray-900 text-white py-8 h-auto">
                <div className="container mx-auto flex justify-between gap-8 px-20
              flex-col lg:flex-row">
                    <div>
                        <h2 className="text-2xl font-bold mb-3">MetaMart</h2>
                        <p>Where Quality Meets Affordability! </p>
                        <p>Your One-Stop Shop for Everything</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold mb-3">Customer Service</h2>
                        <ul className="space-y-2">
                            <li>Order Tracking</li>
                            <li>Return & Refund Policy</li>
                            <li>Shipping & Delivery</li>
                            <li>FAQs</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold mb-3">Contact Me On</h2>
                        <p>Email: pritampmandal@gmail.com</p>
                        <p>Phone: +91 98812 28004</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold mb-3">Follow Me On</h2>
                        <div className="flex space-x-4">
                            <FaFacebook size={24} />
                            <FaInstagram size={24} />
                            <FaTwitter size={24} />
                            <FaLinkedin size={24} />
                        </div>

                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center mt-8 border-t border-gray-700 pt-4">
                    © {new Date().getFullYear()} MetaMart. All Rights Reserved.
                </div>
            </footer>

        </>
    );
}

export default Footer;
