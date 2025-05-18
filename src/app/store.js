import { configureStore } from '@reduxjs/toolkit'
import allMobilesReducer from '../features/Mobiles/MobileSlice';
import allShirtsReducer from '../features/Shirts/ShirtSlice';
import allLaptopsReducer  from '../features/Laptops/LaptopSlice';
import searchProductReducer from '../features/SearchProducts/SearchProductSlice';
// import authSliceReducer from '../features/Auth/SignUp';
import modeReducer  from '../features/themeMode/themeMode';
import cartReducer  from '../features/CartFeature/CartFeature';
import buyNowReducer  from '../features/BuyNow/BuyNow';
import ordersReducer  from '../features/Orders/OrderSlice';
import  fullProductreducer  from '../features/fullProductDetails/FullProductDetails';
import { authSlice } from '../features/Auth/Auth';

const store = configureStore({
    reducer: {
        allMobiles: allMobilesReducer,
        allShirts: allShirtsReducer,
        allLaptops: allLaptopsReducer,
        searchProduct: searchProductReducer,
        auth: authSlice.reducer,
        mode: modeReducer,
        cart: cartReducer,
        buyNow: buyNowReducer,
        orders: ordersReducer,
        fullProductsData : fullProductreducer
    }
})

export default store;