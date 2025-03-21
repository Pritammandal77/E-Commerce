import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, firestoredb } from "../../config/firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";

//  Fetch Cart Items
export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, thunkAPI) => {
    const user = auth.currentUser;
    if (!user) {
        return [];
    }

    const cartRef = collection(firestoredb, "carts", user.uid, "items"); // Subcollection of user cart
    try {
        const querySnapshot = await getDocs(cartRef);
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching cart:", error);
        return thunkAPI.rejectWithValue(error.message);
    }
});

//add Items to cart
export const addToCart = createAsyncThunk("cart/addToCart", async (product, thunkAPI) => {
    const productId = String(product.id);
    try {
        const user = auth.currentUser;
        if (!user) {
            return thunkAPI.rejectWithValue("User not logged in");
        }

        const productRef = doc(firestoredb, "carts", user.uid, "items", productId);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
            const updatedQuantity = productSnap.data().quantity + 1;
            await updateDoc(productRef, { quantity: updatedQuantity });

            return { id: productId, ...productSnap.data(), quantity: updatedQuantity };

        } else {
            const cartItem = {
                product : product,
            };

            await setDoc(productRef, cartItem);
            return { id: productId, ...cartItem };
        }
    } catch (error) {
        console.log("Error happend", error)
        return thunkAPI.rejectWithValue(error.message);
    }
});


// Remove Item from Cart 
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (product, thunkAPI) => {

    const user = auth.currentUser;
    if (!user) return thunkAPI.rejectWithValue("User not logged in");

    try {
        await deleteDoc(doc(firestoredb, "carts", user.uid, "items", product.id));
        return product.id;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});


// Cart Slice
export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        status: "idle",
        error: null,
        isItemAdded: false,
    },
    reducers: {
        setIsItemAdded: (state, action) => {
            state.isItemAdded = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })


            .addCase(addToCart.fulfilled, (state, action) => {
                const existingItem = state.items.find((item) => item.id === action.payload.id);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    state.items.push(action.payload);
                }
                state.status = 'succeeded'
                state.isItemAdded = true;
            })
            .addCase(addToCart.rejected, (state, actions) => {
                state.status = "Failed"
            })
            .addCase(addToCart.pending, (state, actions) => {
                state.status = "Pending"
            })

            // Remove from Cart
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload);
                state.status = "succeeded"
            })
            .addCase(removeFromCart.pending, (state, action) => {
                state.status = "pending"
            })
    },
});

export const { getProductDataFromComponents, setIsItemAdded } = cartSlice.actions;
export default cartSlice.reducer;
