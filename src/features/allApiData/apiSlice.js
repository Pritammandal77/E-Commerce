import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk('fetchProducts', async () => {
    const response = await fetch('https://dummyjson.com/products');
    return response.json();
})
 
export const allProductsSlice = createSlice({
    name : 'products',
    extraReducers : (builder) => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.status = 'loading';
        }),
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'success';
            state.products = action.payload;
        }),
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.status = 'error';
            state.error = action.error;
        })
    }
    

})


export default allProductsSlice.reducer;