import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderHistory } from '../../features/Orders/OrderSlice';

function OrderHistory() {

    const { products } = useSelector((state) => state.orders)
    console.log("products in product history", typeof products)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchOrderHistory())
    }, [dispatch]);

    return (
        <>
            <div className='min-h-100 mt-14 bg-green-100 flex flex-col items-center'>
                <h1 className='font-bold text-3xl p-5 md:text-5xl'>Orders</h1>
                <div className='h-auto flex flex-col gap-5 p-5 lg:gap-10'>
                    {
                        products ? products.map((data) => (
                            <div key={data.id} className='flex flex-col lg:flex-row bg-yellow-200 gap-3 rounded-2xl w-[90vw] xl:w-[80vw]'>
                                <div className='flex bg-green-300 lg:w-[50%] lg:flex-col lg:p-5 lg:gap-2 rounded-2xl'>
                                    <div className='w-[35vw] lg:w-[100%] lg:h-55 flex items-center justify-center bg-blue-200 rounded-2xl'>
                                        <img src={data.image} alt="" className='h-35  xl:h-[20vh] xl:w-auto ' />
                                    </div>
                                    <div className='w-[65vw] p-2 lg:w-[100%] '>
                                        <p className='text-2xl font-bold'>{data.name}</p>
                                        <p className='text-justify'>{data.description}</p>
                                    </div>
                                </div>

                                {/* <div className='p-2'>
                                    <p>Price : ₹ {Math.floor(data.price * 83)}</p>
                                    <p>Date : {data.date}</p>
                                    <p>CustomerName : {data.customerName}</p>
                                    <p>Email : {data.customerEmail}</p>
                                    <p>Address :{data.customerAddress}</p>
                                    <p>Quantity : {data.purchasedQuantity}</p>
                                </div> */}
                                <div className='w-[90vw] px-2 sm:px-4 overflow-x-auto xl:w-[80vw]'>
                                    <table className="table min-w-full text-left bg-green-200 border border-gray-300">
                                        <thead className="w-[80vw] bg-gray-200 text-black">
                                            <tr className='bg-blue-200'>
                                                <th colSpan="2" className="p-3 text-xl font-semibold border-b border-black text-center">Details</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="bg-gray-100">
                                                <td className="p-3 border border-black font-semibold">Price</td>
                                                <td className="p-3 border border-black">₹ {Math.floor(data.price * 83)}</td>
                                            </tr>
                                            <tr className="">
                                                <td className="p-3 border border-black font-semibold">Quantity</td>
                                                <td className="p-3 border border-black">{data.purchasedQuantity}</td>
                                            </tr>
                                            <tr className="bg-gray-100">
                                                <td className="p-3 border border-black font-semibold">Total Price</td>
                                                <td className="p-3 border border-black">{data.totalPrice}</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 border border-black font-semibold">Date</td>
                                                <td className="p-3 border border-black">{data.date}</td>
                                            </tr>

                                            <tr className='bg-gray-100'>
                                                <td className="p-3 border border-black font-semibold ">Customer Name</td>
                                                <td className="p-3 border border-black">{data.customerName}</td>
                                            </tr>
                                            <tr className="">
                                                <td className="p-3 border border-black font-semibold">Email</td>
                                                <td className="p-3 border border-black">{data.customerEmail}</td>
                                            </tr>
                                            <tr className='bg-gray-100'>
                                                <td className="p-3 border border-black font-semibold">Address</td>
                                                <td className="p-3 border border-black">{data.customerAddress}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>




                            </div>
                        )) : (
                            <h1>Not Found</h1>
                        )
                    }

                </div>
            </div>
        </>
    );
}

export default OrderHistory;
