import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching searchedProducts
export const fetchSearchProducts = createAsyncThunk('fetchsearchProducts', async (query) => {
    const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
    if (!response.ok) {
        throw new Error('Failed to fetch Products');
    }
    return response.json();
});

// Async thunk for fetching products by categories
export const fetchProductsByCategory = createAsyncThunk('fetchProductsByCategory', async (query) => {
    const response = await fetch(`https://dummyjson.com/products/category/${query}`);
    if (!response.ok) {
        throw new Error('Failed to fetch Products');
    }
    return response.json();
});

// Slice for shirts
export const searchProductsSlice = createSlice({
    name: 'SearchedProduct',
    initialState: {
        isloading: false,
        SearchProducts: [],
        isError: false,
        query: "",
    },
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchProducts.pending, (state) => {
                state.isloading = true;
            })
            .addCase(fetchSearchProducts.fulfilled, (state, action) => {
                state.isloading = false;
                state.SearchProducts = action.payload;
            })
            .addCase(fetchSearchProducts.rejected, (state, action) => {
                console.error("Error:", action.error.message);
                state.isloading = false;
                state.isError = true;
            })

            .addCase(fetchProductsByCategory.pending, (state) => {
                state.isloading = true;
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                state.isloading = false;
                state.SearchProducts = action.payload;
            })
            .addCase(fetchProductsByCategory.rejected, (state, action) => {
                console.error("Error:", action.error.message);
                state.isloading = false;
                state.isError = true;
            });
    },
});

export const { setQuery } = searchProductsSlice.actions
export default searchProductsSlice.reducer;
