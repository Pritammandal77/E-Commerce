import { createSlice } from "@reduxjs/toolkit";

export const buyNowSlice = createSlice({
    name: 'products',
    initialState: {
        price: 0,
        productData : []
    },
    reducers: {
        setPrice: (state, action) => {
            state.price = action.payload
        },
        setProductData : (state, action) => {
            state.productData = action.payload
        }
    }

})

export const { setPrice , setProductData} = buyNowSlice.actions
export default buyNowSlice.reducer;
