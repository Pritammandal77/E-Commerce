import React from 'react';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import image1 from '../../Images/Image1.jpg'
import image2 from '../../Images/Image2.jpg'
import image3 from '../../Images/Image3.jpg'
import image4 from '../../Images/Image4.png'
import image5 from '../../Images/Image5.jpg'
import { useSelector } from 'react-redux';

function ImageSlider() {

    const images = [
        `${image1}`,
        `${image2}`,
        `${image3}`,
        `${image4}`,
        `${image5}`,
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Function to go to the next slide
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Function to go to the previous slide
    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    // Autoplay functionality
    useEffect(() => {
        if (isPaused) return; // Pause autoplay if the user hovers over the slider
        const interval = setInterval(nextSlide, 3000);

        return () => clearInterval(interval); // Clear interval on unmount
    }, [currentIndex, isPaused, 1000]);

    const currentMode = useSelector((state) => state.mode.currentMode)
    let icons = document.querySelectorAll('.changeImageIcons')

    if (currentMode == 'light') {
        icons.forEach((icon) => {
            icon.style.color = 'black'
        })
    }

    if (currentMode == 'dark') {
        icons.forEach((icon) => {
            icon.style.color = 'white'
        })
    }

    return (
        <>
            <div className="w-full h-50 md:h-100 lg:h-110 mt-15 overflow-hidden" >
                {/* Manual Controls */}
                <div className="flex items-center justify-between px-10 z-10" >
                    <i className="fa-solid fa-angles-left text-3xl changeImageIcons"
                        onClick={prevSlide}></i>
                    <i className="fa-solid fa-angles-right text-3xl changeImageIcons"
                        onClick={nextSlide}></i>
                </div>

                {/* Slider */}
                <div className="relative w-full h-50 md:h-100 lg:h-110">
                    <AnimatePresence>
                        <motion.img
                            key={currentIndex}
                            src={images[currentIndex]}
                            alt="Slide"
                            className="absolute w-full h-50 md:h-100 lg:h-110 object-cover"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                        />
                    </AnimatePresence>
                </div>
            </div>
        </>

    );

}
export default ImageSlider;
