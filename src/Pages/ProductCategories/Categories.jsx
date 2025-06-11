import React from 'react';
import { fetchProductsByCategory } from '../../features/SearchProducts/SearchProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Categories() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getProductsByCategory = (data) => {
        dispatch(fetchProductsByCategory(data))
        navigate("/searchedproducts")
    }

    const currentMode = useSelector((state) => state.mode.currentMode)

    const productCategories = [
         {
          key: 1,
          name : 'Mobile Phones',
          query : 'smartphones',
          imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzz-BMw0YuFoRAO-GdibhH0IXMSHTAsp5qrg&s',
         },
         {
          key: 2,
          name : 'Beauty',
          query : 'beauty',
          imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLYpARhLrF-b7hD7Cn2aueGKDya0PRTso9wQ&s',
         }, 
         {
            key: 3,
            name : 'Furniture',
            query : 'furniture',
            imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD4v724bT3GOIEmH4O5kJMyveIWqE96EhOjw&s',
         }, 
         {
            key: 4,
            name : 'Groceries',
            query : 'groceries',
            imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUUAUtMJCGB5L-Wb5z_cDOsK7gp_6SaawD7Q&s',
         }, 
         {
            key: 5,
            name : 'Furniture',
            query : 'furniture',
            imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD4v724bT3GOIEmH4O5kJMyveIWqE96EhOjw&s',
         },
         {
            key: 6,
            name : 'Kitchen Accessories',
            query : 'kitchen-accessories',
            imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkeqUeueNvGhOcwDP2WHPWkw6e8uDoiWA5tw&s',
         }, 
         {
            key: 7,
            name: "Laptops",
            query: "laptops",
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSQBRR3FLSHgm2_xeA-xHHjBuzg4Sl83o15A&s",
         },
         {
            key: 8,
            name: "Mens Shirts",
            query: "mens-shirts",
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl3rxwb-7ShSqRBDIqvUtc3g3IVgP8Npq4dg&s",
         },
         {
            key: 9,
            name: "Mens Watches",
            query: "mens-watches",
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5t6i8FV811kmnmPI6_ynSI03stc4r1QK4Uw&s",
         },
         {
            key: 10,
            name: "Motorcycle",
            query: "motorcycle",
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz-mJSDacJF-l9ecRSewOKZT_bl6Nu09QO1Q&s",
          },
          {
            key: 11,
            name: "Skin Care",
            query: "skin-care",
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJVh1RpLm3d5eTupBsis-_s2vobi_c9pyI1w&s",
          },
          {
            key: 12,
            name: "Sports Accessories",
            query: "sports-accessories",
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlIV484tAKcrqV04Y-INhGrajCa4DugPHEIA&s",
          },
          {
            key: 13,
            name: "Sunglasses",
            query: "sunglasses",
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7osuNJoP5cswSAfKEX0iiq_fFermh4GnIXw&s",
          },
          {
            key: 14,
            name: "Tablets",
            query: "tablets",
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwQLZov5lIBECas5ZHvfa_sGKqI7OeNc6ITQ&s",
          },
          {
            key: 15,
            name: "Girls Tops",
            query: "tops",
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-zssGorE7hUyUtguwpbGA4jcWUnId2kzzqg&s",
          },
          {
            key: 16,
            name: "Vehicles",
            query: "vehicle",
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRomPlH9wlpOknLphyyswrZHLEMqApR0-2yOA&s",
          },
          {
            key: 17,
            name: "Women's Bags",
            query: "womens-bags",
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9EoV7cuo2-CF_CEmzi9qrQUTijVXQ_aAoQQ&s",
          },
          {
            key: 18,
            name: "Women's Dresses",
            query: "womens-dresses",
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT5p-DYpAXh_Sa7TaUy-SN5qA7VI8k7LgYOQ&s",
          },
          {
            key: 19,
            name: "Women's Jewellery",
            query: "womens-jewellery",
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZwYf4frGDj4FJo7UFiEUzk8pFdNXAPwJiLg&s",
          },
          {
            key: 20,
            name: "Women's Shoes",
            query: "womens-shoes",
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs0YJKfhxISSNf20EREkud5j5AgrCKVd9KMg&s",
          },
        ]

    return (
        <>
            <div className={`mt-15 min-h-screen flex flex-col items-center gap-5 lg:gap-10 px-5 pb-20
             ${currentMode === "dark" ? 'bg-[#1e1e1e] text-white' : 'bg-[#dadada] text-black'}`}>
                <div>
                    <h1 className='font-bold text-4xl p-3 md:text-5xl lg:text-6xl bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text'>Categories</h1>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 items-center gap-5 xl:gap-10'>
                     {
                         productCategories.map((data) => (
                             <div className={`cards h-auto w-[40vw] md:w-[20vw] border-2 border-gray-400  cursor-pointer xl:w-55 flex flex-col items-center gap-3 xl:gap-4 rounded-xl 
                             ${currentMode === "dark" ? 'bg-black text-white' : 'bg-white text-black'}`}
                             onClick={() => getProductsByCategory(data.query)} key={data.key}>
                             <img src={data.imgUrl} alt="" className='h-30 w-[40vw] md:w-[20vw] xl:w-55 lg:h-40 rounded-t-xl ' />
                             <h1 className='h-10 xl:h-13 font-bold text-l md:text-xl xl:text-[21px]'>{data.name}</h1>
                             </div>
                             ))
                     }
                   
                </div>
            </div>
        </>
    );
}

export default Categories;
