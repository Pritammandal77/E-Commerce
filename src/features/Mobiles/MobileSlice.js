import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";


export const fetchMobiles = createAsyncThunk('fetchProducts', async () => {
    const response = await fetch('https://dummyjson.com/products/category/smartphones');
    return response.json();
})

export const allMobilesSlice = createSlice({
    name : 'mobiles',
    initialState: {
        isloading : false,
        mobilesData : null,
        isError : false,
        fullMobiledataIndex : -1 ,
    },
    reducers: {
        setIndex : (state,action) => {
            state.fullMobiledataIndex = action.payload;
         }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMobiles.pending, (state, action) => {
              state.isloading = true;
        });
        builder.addCase(fetchMobiles.fulfilled, (state, action) => {
            state.isloading = false;
            state.mobilesData = action.payload;
        });
        builder.addCase(fetchMobiles.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isError = true;
        })
    },
})

export const {setIndex} = allMobilesSlice.actions;
export default allMobilesSlice.reducer;





// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchMobiles = createAsyncThunk(
//   "fetchProducts",
//   async () => {
//     const response = await fetch(
//       "https://dummyjson.com/products/category/smartphones"
//     );
//     return response.json();
//   }
// );

// export const allMobilesSlice = createSlice({
//   name: "mobiles",
//   initialState: {
//     isloading: false,
//     mobilesData: null,
//     isError: false,
//     fullMobiledataIndex: -1,
//   },
//   reducers: {
//     setIndex: (state, action) => {
//       state.fullMobiledataIndex = action.payload; // ✅ Corrected this
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(fetchMobiles.pending, (state) => {
//       state.isloading = true;
//     });
//     builder.addCase(fetchMobiles.fulfilled, (state, action) => {
//       state.isloading = false;
//       state.mobilesData = action.payload;
//     });
//     builder.addCase(fetchMobiles.rejected, (state, action) => {
//       console.log("Error", action.error.message);
//       state.isError = true;
//     });
//   },
// });

// // ✅ Corrected export of action
// export const { setIndex } = allMobilesSlice.actions;

// export default allMobilesSlice.reducer;