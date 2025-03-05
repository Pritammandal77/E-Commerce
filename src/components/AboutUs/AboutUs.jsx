import React from 'react';

function AboutUs() {
    return (
        <>
            <div className="max-w-4xl mx-auto p-6 mt-14 text-justify">
                <h1 className="text-3xl font-bold">About MetaMart</h1>
                <p className="text-lg text-gray-700 mb-4">
                    <strong>MetaMart</strong> is a modern eCommerce platform built with React.js, designed to provide a smooth and user-friendly shopping experience. This app allows users to explore various products, search product according to their choice , add items to their cart, and manage their purchases effortlessly.
                </p>

                <p>
                    This website is created only for learning purpose , all the products in this website are facebook
                </p>
                <h2 className="text-2xl font-semibold mt-6">Tech Stack</h2>
                <ul className="list-disc pl-6 text-gray-700">
                    <li><strong>Frontend:</strong> React.js, Redux.js ,Tailwind CSS</li>
                    <li><strong>API:</strong> Dummy JSON API for product data</li>
                    <li><strong>Backend:</strong> Firebase (for authentication & database)</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6">Key Features</h2>
                <ul className="list-disc pl-6 text-gray-700">
                    <li>Browse and search products</li>
                    <li>Firebase authentication (Login/Signup)</li>
                    <li>Add products to the cart</li>
                    <li>View product details</li>
                    <li>Order Products</li>
                    <li>Can view order history</li>
                    <li>Dark & light mode</li>
                    <li>Dynamic UI with smooth user interactions</li>
                    <li>Responsive design for all devices</li>
                    
                </ul>

                <h2 className="text-2xl font-semibold mt-6">Future Enhancements</h2>
                <ul className="list-disc pl-6 text-gray-700">
                    <li>Wishlist feature</li>
                    <li>Order history and checkout functionality</li>
                    <li>Real-time database for user and order management</li>
                </ul>

                <p className="text-lg text-gray-700 mt-6">
                    MetaMart is a personal project aimed at improving my frontend and backend development skills while providing an engaging shopping experience for users. 🚀
                </p>
            </div>
        </>
    );
}

export default AboutUs;
