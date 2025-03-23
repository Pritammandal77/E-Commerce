import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// For fetching shirts
export const fetchShirts = createAsyncThunk('shirts/fetchShirts', async () => {
    const response = await fetch('https://dummyjson.com/products/category/mens-shirts');
    if (!response.ok) {
        throw new Error('Failed to fetch shirts');
    }
    return response.json();
});

// Slice for shirts
export const allShirtsSlice = createSlice({
    name: 'shirts',
    initialState: {
        isloading: false,
        shirtsData: [],
        isError: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchShirts.pending, (state) => {
                state.isloading = true;
            })
            .addCase(fetchShirts.fulfilled, (state, action) => {
                state.isloading = false;
                state.shirtsData = action.payload;
            })
            .addCase(fetchShirts.rejected, (state, action) => {
                console.error("Error:", action.error.message);
                state.isloading = false;
                state.isError = true;
            });
    },
});

export default allShirtsSlice.reducer;
