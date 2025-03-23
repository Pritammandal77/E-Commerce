import { createSlice } from "@reduxjs/toolkit";

export const fullProductSlice = createSlice({
    name: 'fullProduct',
    initialState: {
        product: false
    },
    reducers: {
        setFullProductData: (state, action) => {
            state.product = action.payload;
        }
    }
})

export const { setFullProductData } = fullProductSlice.actions
export default fullProductSlice.reducer
