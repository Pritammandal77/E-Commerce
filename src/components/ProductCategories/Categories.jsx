import React from 'react';
import { fetchProductsByCategory } from '../../features/SearchProducts/SearchProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Categories() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getProductsByCategory = (data) => {
        console.log(data)
        dispatch(fetchProductsByCategory(data))
        navigate("/searchedproducts")
    }

    const currentMode = useSelector((state) => state.mode.currentMode)
    console.log("Mode in categories ", currentMode)

    let allCards = document.querySelectorAll(".cards")
    console.log(allCards[0])

    if (currentMode == "dark") {
        allCards.forEach((card) => {
            card.style.backgroundColor = "black"
            card.style.color = "white"
        })
    } else {
        allCards.forEach((card) => {
            card.style.backgroundColor = "#FEF3C7"
            card.style.color = "black"

        })

    }


    return (
        <>
            <div className={`mt-15 min-h-screen flex flex-col items-center gap-10 px-5 pb-20
             ${currentMode === "dark" ? 'bg-[#1e1e1e] text-white' : 'bg-green-100 text-black'}`}>
                <div>
                    <h1 className='text-3xl self-center font-bold  mt-5 xl:text-5xl bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text'>Categories</h1>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 items-center gap-5 xl:gap-10'>

                    <div className={`cards h-auto w-[40vw] md:w-[20vw] xl:w-55 bg-amber-100 flex flex-col items-center gap-2 rounded-xl
                        ${currentMode === "dark" ? 'bg-black text-white' : 'bg-[#FEF3C7] text-black'}`}
                        onClick={() => getProductsByCategory("smartphones")}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzz-BMw0YuFoRAO-GdibhH0IXMSHTAsp5qrg&s" alt=""
                            className='h-30 w-[40vw] md:w-[20vw] xl:w-55 lg:h-40 rounded-t-xl ' />
                        <h1 className='h-10 font-bold text-l md:text-xl '>Mobile Phones</h1>
                    </div>

                    <div className={`cards h-auto w-[40vw] md:w-[20vw] xl:w-55 bg-amber-100 flex flex-col items-center gap-2 rounded-xl
                      ${currentMode === "dark" ? 'bg-black text-white' : 'bg-[#FEF3C7] text-black'}`}
                        onClick={() => getProductsByCategory("beauty")}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLYpARhLrF-b7hD7Cn2aueGKDya0PRTso9wQ&s" alt=""
                            className='h-30 w-[40vw] md:w-[20vw] xl:w-55 lg:h-40 rounded-t-xl ' />
                        <h1 className='h-10 font-bold text-l md:text-xl'>Beauty</h1>
                    </div>


                    <div className={`cards h-auto w-[40vw] md:w-[20vw] xl:w-55 bg-amber-100 flex flex-col items-center gap-2 rounded-xl
                        ${currentMode === "dark" ? 'bg-black text-white' : 'bg-[#FEF3C7] text-black'}`}
                        onClick={() => getProductsByCategory("furniture")}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD4v724bT3GOIEmH4O5kJMyveIWqE96EhOjw&s" alt=""
                            className='h-30 w-[40vw] md:w-[20vw] xl:w-55 lg:h-40 rounded-t-xl ' />
                        <h1 className='h-10 font-bold text-l md:text-xl'>Furniture</h1>
                    </div>

                    <div className={`cards h-auto w-[40vw] md:w-[20vw] xl:w-55 bg-amber-100 flex flex-col items-center gap-2 rounded-xl
                         ${currentMode === "dark" ? 'bg-black text-white' : 'bg-[#FEF3C7] text-black'}`}
                         onClick={() => getProductsByCategory("groceries")}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUUAUtMJCGB5L-Wb5z_cDOsK7gp_6SaawD7Q&s" alt=""
                            className='h-30 w-[40vw] md:w-[20vw] xl:w-55 lg:h-40 rounded-t-xl ' />
                        <h1 className='h-10 font-bold text-l md:text-xl'>Groceries</h1>
                    </div>

                    <div className={`cards h-auto w-[40vw] md:w-[20vw] xl:w-55 bg-amber-100 flex flex-col items-center gap-2 rounded-xl
                        ${currentMode === "dark" ? 'bg-black text-white' : 'bg-[#FEF3C7] text-black'}`}
                        onClick={() => getProductsByCategory("home-decoration")}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhf2XE9zCyugxBqoX10MXDCiut-05CpIGpmA&s" alt=""
                            className='h-30 w-[40vw] md:w-[20vw] xl:w-55 lg:h-40 rounded-t-xl ' />
                        <h1 className='h-10 font-bold text-l md:text-xl'>Home Decoration</h1>
                    </div>

                    <div className={`cards h-auto w-[40vw] md:w-[20vw] xl:w-55 bg-amber-100 flex flex-col items-center gap-2 rounded-xl
                       ${currentMode === "dark" ? 'bg-black text-white' : 'bg-[#FEF3C7] text-black'}`}
                        onClick={() => getProductsByCategory("kitchen-accessories")}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkeqUeueNvGhOcwDP2WHPWkw6e8uDoiWA5tw&s" alt=""
                            className='h-30 w-[40vw] md:w-[20vw] xl:w-55 lg:h-40 rounded-t-xl ' />
                        <h1 className='h-10 font-bold text-l md:text-xl'>Kitchen Accessories</h1>
                    </div>


                    <div className={`cards h-auto w-[40vw] md:w-[20vw] xl:w-55 bg-amber-100 flex flex-col items-center gap-2 rounded-xl
                        ${currentMode === "dark" ? 'bg-black text-white' : 'bg-[#FEF3C7] text-black'}`}
                        onClick={() => getProductsByCategory("laptops")}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSQBRR3FLSHgm2_xeA-xHHjBuzg4Sl83o15A&s" alt=""
                            className='h-30 w-[40vw] md:w-[20vw] xl:w-55 lg:h-40 rounded-t-xl ' />
                        <h1 className='h-10 font-bold text-l md:text-xl'>Laptops</h1>
                    </div>

                    <div className={`cards h-auto w-[40vw] md:w-[20vw] xl:w-55 bg-amber-100 flex flex-col items-center gap-2 rounded-xl
                        ${currentMode === "dark" ? 'bg-black text-white' : 'bg-[#FEF3C7] text-black'}`}
                        onClick={() => getProductsByCategory("mens-shirts")}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl3rxwb-7ShSqRBDIqvUtc3g3IVgP8Npq4dg&s" alt=""
                            className='h-30 w-[40vw] md:w-[20vw] xl:w-55 lg:h-40 rounded-t-xl ' />
                        <h1 className='h-10 font-bold text-l md:text-xl'>Mens Shirts</h1>
                    </div>

                    <div className={`cards h-auto w-[40vw] md:w-[20vw] xl:w-55 bg-amber-100 flex flex-col items-center gap-2 rounded-xl
                        ${currentMode === "dark" ? 'bg-black text-white' : 'bg-[#FEF3C7] text-black'}`}
                        onClick={() => getProductsByCategory("mens-watches")}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5t6i8FV811kmnmPI6_ynSI03stc4r1QK4Uw&s" alt=""
                            className='h-30 w-[40vw] md:w-[20vw] xl:w-55 lg:h-40 rounded-t-xl ' />
                        <h1 className='h-10 font-bold text-l md:text-xl'>Mens Watches</h1>
                    </div>

                    <div className={`cards h-auto w-[40vw] md:w-[20vw] xl:w-55 bg-amber-100 flex flex-col items-center gap-2 rounded-xl
                        ${currentMode === "dark" ? 'bg-black text-white' : 'bg-[#FEF3C7] text-black'}`}
                        onClick={() => getProductsByCategory("motorcycle")}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz-mJSDacJF-l9ecRSewOKZT_bl6Nu09QO1Q&s" alt=""
                            className='h-30 w-[40vw] md:w-[20vw] xl:w-55 lg:h-40 rounded-t-xl ' />
                        <h1 className='h-10 font-bold text-l md:text-xl'>Motorcycle</h1>
                    </div>

                    <div className={`cards h-auto w-[40vw] md:w-[20vw] xl:w-55 bg-amber-100 flex flex-col items-center gap-2 rounded-xl
                       ${currentMode === "dark" ? 'bg-black text-white' : 'bg-[#FEF3C7] text-black'}`}
                        onClick={() => getProductsByCategory("skin-care")}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJVh1RpLm3d5eTupBsis-_s2vobi_c9pyI1w&s" alt=""
                            className='h-30 w-[40vw] md:w-[20vw] xl:w-55 lg:h-40 rounded-t-xl ' />
                        <h1 className='h-10 font-bold text-l md:text-xl'>skin-care</h1>
                    </div>

                    <div className={`cards h-auto w-[40vw] md:w-[20vw] xl:w-55 bg-amber-100 flex flex-col items-center gap-2 rounded-xl
                        ${currentMode === "dark" ? 'bg-black text-white' : 'bg-[#FEF3C7] text-black'}`}
                        onClick={() => getProductsByCategory("sports-accessories")}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlIV484tAKcrqV04Y-INhGrajCa4DugPHEIA&s" alt=""
                            className='h-30 w-[40vw] md:w-[20vw] xl:w-55 lg:h-40 rounded-t-xl ' />
                        <h1 className='h-10 font-bold text-l md:text-xl'>sports-accessories</h1>
                    </div>

                    <div className={`cards h-auto w-[40vw] md:w-[20vw] xl:w-55 bg-amber-100 flex flex-col items-center gap-2 rounded-xl
                       ${currentMode === "dark" ? 'bg-black text-white' : 'bg-[#FEF3C7] text-black'}`}
                        onClick={() => getProductsByCategory("sunglasses")}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7osuNJoP5cswSAfKEX0iiq_fFermh4GnIXw&s" alt=""
                            className='h-30 w-[40vw] md:w-[20vw] xl:w-55 lg:h-40 rounded-t-xl ' />
                        <h1 className='h-10 font-bold text-l md:text-xl'>sunglasses</h1>
                    </div>

                    <div className={`cards h-auto w-[40vw] md:w-[20vw] xl:w-55 bg-amber-100 flex flex-col items-center gap-2 rounded-xl
                        ${currentMode === "dark" ? 'bg-black text-white' : 'bg-[#FEF3C7] text-black'}`}
                        onClick={() => getProductsByCategory("tablets")}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwQLZov5lIBECas5ZHvfa_sGKqI7OeNc6ITQ&s" alt=""
                            className='h-30 w-[40vw] md:w-[20vw] xl:w-55 lg:h-40 rounded-t-xl ' />
                        <h1 className='h-10 font-bold text-l md:text-xl'>Tablets</h1>
                    </div>

                    <div className={`cards h-auto w-[40vw] md:w-[20vw] xl:w-55 bg-amber-100 flex flex-col items-center gap-2 rounded-xl
                       ${currentMode === "dark" ? 'bg-black text-white' : 'bg-[#FEF3C7] text-black'}`}
                        onClick={() => getProductsByCategory("tops")}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-zssGorE7hUyUtguwpbGA4jcWUnId2kzzqg&s" alt=""
                            className='h-30 w-[40vw] md:w-[20vw] xl:w-55 lg:h-40 rounded-t-xl ' />
                        <h1 className='h-10 font-bold text-l md:text-xl'>Girls Tops</h1>
                    </div>

                    <div className={`cards h-auto w-[40vw] md:w-[20vw] xl:w-55 bg-amber-100 flex flex-col items-center gap-2 rounded-xl
                        ${currentMode === "dark" ? 'bg-black text-white' : 'bg-[#FEF3C7] text-black'}`}
                        onClick={() => getProductsByCategory("vehicle")}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRomPlH9wlpOknLphyyswrZHLEMqApR0-2yOA&s" alt=""
                            className='h-30 w-[40vw] md:w-[20vw] xl:w-55 lg:h-40 rounded-t-xl ' />
                        <h1 className='h-10 font-bold text-l md:text-xl'>Vehicles</h1>
                    </div>

                    <div className={`cards h-auto w-[40vw] md:w-[20vw] xl:w-55 bg-amber-100 flex flex-col items-center gap-2 rounded-xl
                        ${currentMode === "dark" ? 'bg-black text-white' : 'bg-[#FEF3C7] text-black'}`}
                        onClick={() => getProductsByCategory("womens-bags")}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9EoV7cuo2-CF_CEmzi9qrQUTijVXQ_aAoQQ&s" alt=""
                            className='h-30 w-[40vw] md:w-[20vw] xl:w-55 lg:h-40 rounded-t-xl ' />
                        <h1 className='h-10 font-bold text-l md:text-xl'>womens-bags</h1>
                    </div>

                    <div className={`cards h-auto w-[40vw] md:w-[20vw] xl:w-55 bg-amber-100 flex flex-col items-center gap-2 rounded-xl
                        ${currentMode === "dark" ? 'bg-black text-white' : 'bg-[#FEF3C7] text-black'}`}
                        onClick={() => getProductsByCategory("womens-dresses")}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT5p-DYpAXh_Sa7TaUy-SN5qA7VI8k7LgYOQ&s" alt=""
                            className='h-30 w-[40vw] md:w-[20vw] xl:w-55 lg:h-40 rounded-t-xl ' />
                        <h1 className='h-10 font-bold text-l md:text-xl'>womens-dresses</h1>
                    </div>

                    <div className={`cards h-auto w-[40vw] md:w-[20vw] xl:w-55 bg-amber-100 flex flex-col items-center gap-2 rounded-xl
                          ${currentMode === "dark" ? 'bg-black text-white' : 'bg-[#FEF3C7] text-black'}`}
                        onClick={() => getProductsByCategory("womens-jewellery")}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZwYf4frGDj4FJo7UFiEUzk8pFdNXAPwJiLg&s" alt=""
                            className='h-30 w-[40vw] md:w-[20vw] xl:w-55 lg:h-40 rounded-t-xl ' />
                        <h1 className='h-10 font-bold text-l md:text-xl'>womens-jewellery</h1>
                    </div>

                    <div className={`cards h-auto w-[40vw] md:w-[20vw] xl:w-55 bg-amber-100 flex flex-col items-center gap-2 rounded-xl
                         ${currentMode === "dark" ? 'bg-black text-white' : 'bg-[#FEF3C7] text-black'}`}
                        onClick={() => getProductsByCategory("womens-shoes")}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs0YJKfhxISSNf20EREkud5j5AgrCKVd9KMg&s" alt=""
                            className='h-30 w-[40vw] md:w-[20vw] xl:w-55 lg:h-40 rounded-t-xl ' />
                        <h1 className='h-10 font-bold text-l md:text-xl'>womens-shoes</h1>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Categories;
