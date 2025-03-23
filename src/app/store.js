import { configureStore } from '@reduxjs/toolkit'
import allMobilesReducer from '../features/Mobiles/MobileSlice';
import allShirtsReducer from '../features/Shirts/ShirtSlice';
import allLaptopsReducer  from '../features/Laptops/LaptopSlice';
import searchProductReducer from '../features/SearchProducts/SearchProductSlice';
import authSliceReducer from '../features/Auth/SignUp/SignUp';
import modeReducer  from '../features/themeMode/themeMode';
import cartReducer  from '../features/CartFeature/CartFeature';
import buyNowReducer  from '../features/BuyNow/BuyNow';
import ordersReducer  from '../features/Orders/OrderSlice';
import { fullProductSlice } from '../features/fullProductDetails/FullProductDetails';

const store = configureStore({
    reducer: {
        allMobiles: allMobilesReducer,
        allShirts: allShirtsReducer,
        allLaptops: allLaptopsReducer,
        searchProduct: searchProductReducer,
        auth: authSliceReducer,
        mode: modeReducer,
        cart: cartReducer,
        buyNow: buyNowReducer,
        orders: ordersReducer,
        fullProductsData : fullProductSlice.reducer
    }
})

export default store;