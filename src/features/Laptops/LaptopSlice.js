import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// For fetching shirts
export const fetchLaptops = createAsyncThunk('fetchLaptops', async () => {
    const response = await fetch('https://dummyjson.com/products/category/laptops');
    if (!response.ok) {
        throw new Error('Failed to fetch shirts');
    }
    return response.json();
});


export const allLaptopsSlice = createSlice({
    name: 'shirts',
    initialState: {
        isloading: false,
        LaptopsData: [],
        isError: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLaptops.pending, (state) => {
                state.isloading = true;
            })
            .addCase(fetchLaptops.fulfilled, (state, action) => {
                state.isloading = false;
                state.LaptopsData = action.payload;
            })
            .addCase(fetchLaptops.rejected, (state, action) => {
                console.error("Error:", action.error.message);
                state.isloading = false;
                state.isError = true;
            });
    },
});

export default allLaptopsSlice.reducer;
