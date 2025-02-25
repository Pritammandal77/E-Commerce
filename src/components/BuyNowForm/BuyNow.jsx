import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function BuyNow() {


    const changeMode = useSelector((state) => state.mode)
    console.log('mode in allproducts', changeMode.currentMode)

    let buyNowPage = document.querySelector(".buyNowPage")
    let buyNowForm = document.querySelector(".buyNowForm")
    let totalAmount = document.querySelector(".totalAmount")

    useEffect(() => {
        if (changeMode.currentMode == 'light') {
            if (buyNowPage) {
                buyNowPage.style.backgroundColor = '#bbf7d0'
            }
            
            if(buyNowForm){
                buyNowForm.style.backgroundColor = 'white'
            }
            
            if(totalAmount){
                totalAmount.style.backgroundColor = 'white'
            }
        }

        if (changeMode.currentMode == 'dark') {
            if (buyNowPage) {
                buyNowPage.style.backgroundColor = '#1e1e1e'
            }

            if (buyNowForm) {
                buyNowForm.style.color = 'black'
                buyNowForm.style.backgroundColor = '#bbf7d0'
            }

            if (totalAmount) {
                totalAmount.style.backgroundColor = '#bbf7d0'
            }

        }
    }, [changeMode.currentMode]);


    return (
        <>
            <div className='buyNowPage text-black w-full h-auto mt-3 lg:mt-15 flex justify-center items-center lg:items-start flex-col-reverse lg:flex-row gap-10 ' >
                <div className='w-[100vw] lg:w-[60vw] h-auto pb-20 relative bottom-20 lg:bottom-0'>
                    <div className="buyNowForm w-[90vw] lg:w-[40vw] mx-auto p-6 bg-white rounded-lg mt-20 ">
                        <h2 className="text-4xl font-bold mb-4 text-center">Order Now</h2>
                        <form className="space-y-4 flex flex-col gap-5 text-[18px] mt-10">
                            <div>
                                <label>Full Name</label>
                                <input type="text" required className="w-full mt-1 p-2 border rounded text-[20px]" />
                            </div>

                            <div>
                                <label>Email</label>
                                <input type="email" required className="w-full mt-1 p-2 border rounded text-[20px]" />
                            </div>

                            <div>
                                <label>Shipping Address</label>
                                <textarea required className="w-full mt-1 p-2 border rounded text-[20px]"></textarea>
                            </div>

                            <div>
                                <label>Quantity</label>
                                <input type="number" min="1" required className="w-full mt-1 p-2 border rounded text-[20px]" />
                            </div>

                            <div>
                                <label>Payment Method</label>
                                <select className="w-full mt-1 p-2 border rounded">
                                    <option value="credit_card">Credit Card</option>
                                    <option value="paypal">PayPal</option>
                                    <option value="cash_on_delivery">Cash on Delivery</option>
                                </select>
                            </div>

                            <button type="submit" className="w-full bg-yellow-500 font-bold text-xl p-3 rounded cursor-pointer hover:bg-yellow-600">
                                Place Order
                            </button>
                        </form>
                    </div>
                </div>
                <div className='totalAmount w-[90vw] lg:w-[25vw] bg-white h-auto lg:h-[55vh] flex flex-col justify-between p-10 text-[20px] mt-20 gap-2 lg:gap-0' >
                    <p className='text-center text-[28px] font-bold'>Price Details</p>
                    <div className='flex justify-between mx-10' >
                        <p>Price  </p>
                        <p> $999 </p>
                    </div>
                    <div className='flex justify-between mx-10'>
                        <p>Delivery Charges</p>
                        <p className='text-green-800 font-bold'>Free</p>
                    </div>
                    <div className='flex justify-between mx-10'>
                        <p>Platform Fee</p>
                        <p>$10</p>
                    </div>
                    <div className='flex justify-between mx-10'>
                        <p>Extra Fees</p>
                        <p>$ 10</p>
                    </div>
                    <hr />
                    <div className='flex justify-between mx-10 font-bold'>
                        <p>Total Amount</p>
                        <p>$1019</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BuyNow;
