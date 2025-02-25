import { configureStore } from '@reduxjs/toolkit'
import allMobilesReducer from '../features/Mobiles/MobileSlice';
import { allShirtsSlice } from '../features/Shirts/ShirtSlice';
import { allLaptopsSlice } from '../features/Laptops/LaptopSlice';
import searchProductReducer from '../features/SearchProducts/SearchProductSlice';
// import authReducer from '../features/Auth/Auth';
import  authSliceReducer  from '../features/Auth/SignUp/SignUp';
import { modeSlice } from '../features/themeMode/themeMode';
// import { signInSlice } from '../features/Auth/SignIn/SignIn';

const store = configureStore({
    reducer:{
        allMobiles : allMobilesReducer,
        allShirts : allShirtsSlice.reducer,
        allLaptops : allLaptopsSlice.reducer,
        searchProduct : searchProductReducer,
        auth : authSliceReducer,
        // signin : signInSlice.reducer
        mode : modeSlice.reducer
    }
})

export default store;