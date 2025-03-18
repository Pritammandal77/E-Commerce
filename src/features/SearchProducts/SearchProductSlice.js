import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching searched products
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

// Slice for searched products
export const searchProductsSlice = createSlice({
    name: 'SearchedProduct',
    initialState: {
        isloading: false,
        SearchProducts: [], // Original data
        defaultProduct: [] , // data for default filter , stored here.
        isError: false,
        query: "",
        SearchedDataIndex: 1,
    },
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload;
        },
        setSearchedDataIndex: (state, action) => {
            state.SearchedDataIndex = action.payload;
        },
        sortByPriceInAscending: (state) => {
            if (state.SearchProducts.products) {
                state.SearchProducts.products.sort((a, b) => a.price - b.price);
            }
        },
        sortByPriceInDescending: (state) => {
            if (state.SearchProducts.products) {
                state.SearchProducts.products.sort((a, b) => b.price - a.price);
            }
        },
        setDefaultProduct: (state) => {
            state.SearchProducts = state.defaultProduct 
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
                state.defaultProduct = action.payload // stored default products data , to show then user selects default filter
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
                state.defaultProduct = action.payload; // stored default products data , to show then user selects default filter
            })
            .addCase(fetchProductsByCategory.rejected, (state, action) => {
                console.error("Error:", action.error.message);
                state.isloading = false;
                state.isError = true;
            });
    },
});

export const { setQuery,  setSearchedDataIndex,  sortByPriceInAscending,  sortByPriceInDescending,  setDefaultProduct } = searchProductsSlice.actions;
export default searchProductsSlice.reducer;
