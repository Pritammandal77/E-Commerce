import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderHistory } from '../../features/Orders/OrderSlice';
import Loader from '../../components/Loader/NormalLoader/Loader';

function OrderHistory() {

    const { products } = useSelector((state) => state.orders)
    const currentMode = useSelector((state) => state.mode.currentMode)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchOrderHistory())
    }, []);

    return (
        <>
            <div className={`min-h-100 mt-14 flex flex-col items-center
             ${currentMode == 'dark' ? 'bg-[#1d1d1d] text-white' : 'bg-[#dadada] text-black'}`}>
                {
                    products?.length >= 1 && <div className='cartHeading py-5 text-3xl ml-10 self-center font-bold  xl:text-5xl flex gap-3'>
                        <h1 className=''>Orders</h1>
                        <p>({products.length})</p>
                    </div>
                }
                <div className='h-auto flex flex-col gap-15 p-5 mb-20 lg:gap-15 items-center'>
                    {
                        products?.length >= 1 ? products.map((data) => (
                            <div key={data.id} className={`flex flex-col lg:flex-row gap-3  rounded-2xl w-[90vw] xl:w-[80vw] 
                               ${currentMode == 'dark' ? 'bg-[#2e2e2e] text-black' : 'bg-[#ffffff] text-black'}`}>

                                <div className={`flex lg:w-[50%] lg:flex-col lg:p-5 lg:gap-2 rounded-2xl
                                     ${currentMode == 'dark' ? 'bg-black text-white' : 'bg-green-200 text-black'}`}>
                                    <div className='w-[35vw] lg:w-[100%] lg:h-55 flex items-center justify-center bg-blue-200 rounded-2xl'>
                                        <img src={data.image} alt="" className='h-35  xl:h-[20vh] xl:w-auto ' />
                                    </div>
                                    <div className='w-[65vw] p-2 lg:w-[100%] '>
                                        <p className='text-2xl font-bold'>{data.name}</p>
                                        <p className='text-justify'>{data.description}</p>
                                    </div>
                                </div>

                                <div className='w-[90vw] px-2 sm:px-4 overflow-x-auto xl:w-[80vw]'>
                                    <table className="table min-w-full text-left bg-green-300 border border-gray-300">
                                        <thead className="w-[80vw] bg-gray-200 text-black">
                                            <tr className='bg-blue-200'>
                                                <th colSpan="2" className="p-3 text-xl font-semibold border-b border-black text-center">Order Details</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="bg-gray-400">
                                                <td className="p-3 border border-black font-semibold">Price</td>
                                                <td className="p-3 border border-black">₹ {Math.floor(data.price * 83)}</td>
                                            </tr>
                                            <tr className="">
                                                <td className="p-3 border border-black font-semibold">Quantity</td>
                                                <td className="p-3 border border-black">{data.purchasedQuantity}</td>
                                            </tr>
                                            <tr className="bg-gray-400">
                                                <td className="p-3 border border-black font-semibold">Total Price</td>
                                                <td className="p-3 border border-black">₹ {data.totalPrice}</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 border border-black font-semibold">Date</td>
                                                <td className="p-3 border border-black">{data.date}</td>
                                            </tr>

                                            <tr className='bg-gray-400'>
                                                <td className="p-3 border border-black font-semibold ">Customer Name</td>
                                                <td className="p-3 border border-black">{data.customerName}</td>
                                            </tr>
                                            <tr className="">
                                                <td className="p-3 border border-black font-semibold">Email</td>
                                                <td className="p-3 border border-black">{data.customerEmail}</td>
                                            </tr>
                                            <tr className='bg-gray-400'>
                                                <td className="p-3 border border-black font-semibold">Address</td>
                                                <td className="p-3 border border-black">{data.customerAddress}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )) : (
                            products?.length <= 0 ? (
                                <div className='h-[100vh] flex items-center justify-center relative bottom-10'>
                                    <h1 className=' text-3xl text-center lg:text-4xl font-bold'>You haven't ordered anything !!</h1>
                                </div>
                            ) : (
                                <Loader />
                            )
                        )
                    }

                </div>
            </div>
        </>
    );
}

export default OrderHistory;
