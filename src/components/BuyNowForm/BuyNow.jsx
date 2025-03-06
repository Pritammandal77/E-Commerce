import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addOrderInHistory, fetchOrderHistory, setIsItemOrdered, setOrderedProduct } from '../../features/Orders/OrderSlice';

import Swal from 'sweetalert2'

function BuyNow() {


    const changeMode = useSelector((state) => state.mode)
    // console.log('mode in allproducts', changeMode.currentMode)

    let buyNowPage = document.querySelector(".buyNowPage")
    let buyNowForm = document.querySelector(".buyNowForm")
    let totalAmount = document.querySelector(".totalAmount")
    useEffect(() => {
        if (changeMode.currentMode == 'light') {
            if (buyNowPage) {
                buyNowPage.style.backgroundColor = '#bbf7d0'
            }

            if (buyNowForm) {
                buyNowForm.style.backgroundColor = 'white'
            }

            if (totalAmount) {
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


    const { price, productData } = useSelector((state) => state.buyNow)
    // console.log('price of that item', price)
    // console.log('product for buy now', productData)

    const platFormFee = 19;
    const extraFees = 29;

    const [buyerName, setBuyerName] = useState('')
    const [buyerEmail, setBuyerEmail] = useState('')
    const [shippingAddress, setShippingAddress] = useState('')
    const [quantity, setQuantity] = useState('1')

    let productsPrice = Math.floor(price * 83)
    let priceWithQuantity = productsPrice * quantity
    let priceAfterTaxes = priceWithQuantity + platFormFee + extraFees

    const dispatch = useDispatch()
    //Sending the product to orderSlice to save the ordered product on cloud firestore
    const saveOrderHistory = (e, product, buyerName, buyerEmail, shippingAddress, quantity, priceAfterTaxes) => {
        e.preventDefault()
        // console.log(product)
        dispatch(addOrderInHistory({
            orderedProduct: product,
            buyerName: buyerName,
            buyerEmail: buyerEmail,
            shippingAddress: shippingAddress,
            quantity: quantity,
            totalPrice: priceAfterTaxes,
        }));
        console.log("data to send on orders" , product)
    }


    const { isItemOrdered } = useSelector((state) => state.orders)
    //after a successsful order , we are displaying this alert , after the alert completes , reset the isItemOrdered to false , in the orderSlice
    if (isItemOrdered) {
        Swal.fire({
            title: "Order Placed Successfully!",
            icon: "success",
            draggable: true
        }).then(() => {
            dispatch(setIsItemOrdered(false)); // Reset AFTER alert is closed
        });
    }

    return (
        <>
            <div className='buyNowPage text-black w-full h-auto mt-3 lg:mt-15 flex justify-center items-center lg:items-start flex-col-reverse lg:flex-row gap-10 ' >
                <div className='w-[100vw] lg:w-[60vw] h-auto pb-20 relative bottom-20 lg:bottom-0'>
                    <div className="buyNowForm w-[90vw] lg:w-[40vw] mx-auto p-6 bg-white rounded-lg mt-20 ">
                        <h2 className="text-4xl font-bold mb-4 text-center">Order Now</h2>
                        <form className="space-y-4 flex flex-col gap-5 text-[18px] mt-10">
                            <div>
                                <label>Full Name</label>
                                <input type="text" required className="w-full mt-1 p-2 border rounded text-[20px]"
                                    onChange={(e) => setBuyerName(e.target.value)} value={buyerName} />
                            </div>

                            <div>
                                <label>Email</label>
                                <input type="email" required className="w-full mt-1 p-2 border rounded text-[20px]"
                                    onChange={(e) => setBuyerEmail(e.target.value)} value={buyerEmail} />
                            </div>

                            <div>
                                <label>Shipping Address</label>
                                <textarea required className="w-full mt-1 p-2 border rounded text-[20px]"
                                    onChange={(e) => setShippingAddress(e.target.value)} value={shippingAddress}></textarea>
                            </div>

                            <div>
                                <label>Quantity</label>
                                <input type="number" min="1" required className="w-full mt-1 p-2 border rounded text-[20px]"
                                    onChange={(e) => setQuantity(e.target.value)} value={quantity} />
                            </div>

                            <div>
                                <label>Payment Method</label>
                                <select className="w-full mt-1 p-2 border rounded">
                                    <option value="credit_card">Credit Card</option>
                                    <option value="paypal">PayPal</option>
                                    <option value="cash_on_delivery">Cash on Delivery</option>
                                </select>
                            </div>

                            <button type="submit" className="w-full bg-yellow-500 font-bold text-xl p-3 rounded cursor-pointer hover:bg-yellow-600"
                                onClick={(e) => saveOrderHistory(e, productData, buyerName, buyerEmail, shippingAddress, quantity, priceAfterTaxes)}>
                                Place Order
                            </button>
                        </form>
                    </div>
                </div>
                <div className='totalAmount w-[90vw] lg:w-[25vw] bg-white h-auto lg:h-[55vh] flex flex-col justify-between p-10 text-[20px] mt-20 gap-2 lg:gap-0' >
                    <p className='text-center text-[28px] font-bold'>Price Details</p>
                    <div className='flex justify-between mx-5' >
                        <p>Price  </p>
                        <p>₹{priceWithQuantity} </p>
                    </div>
                    <div className='flex justify-between mx-5'>
                        <p>Delivery Charges</p>
                        <p className='text-green-800 font-bold'>free</p>
                    </div>
                    <div className='flex justify-between mx-5'>
                        <p>Platform Fee</p>
                        <p>₹ {platFormFee}</p>
                    </div>
                    <div className='flex justify-between mx-5'>
                        <p>Extra Fees</p>
                        <p>₹ {extraFees}</p>
                    </div>
                    <hr />
                    <div className='flex justify-between mx-5 font-bold'>
                        <p>Total Amount</p>
                        <p>₹ {priceAfterTaxes}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BuyNow;
