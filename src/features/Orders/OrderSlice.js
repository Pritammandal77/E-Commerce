import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { auth, firestoredb } from "../../config/firebase";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";

export const fetchOrderHistory = createAsyncThunk("orders/fetchOrderHistory", async (_, thunkAPI) => {
    const user = auth.currentUser;
    if (!user) {
        console.log("❌ No user logged in while fetching cart.");
        return [];
    }

    const orderRef = collection(firestoredb, "orders", user.uid, "products"); // Subcollection of user cart
    try {
        const querySnapshot = await getDocs(orderRef);
        console.log("order fetched:", querySnapshot.docs.map((doc) => doc.data()));
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching cart:", error);
        return thunkAPI.rejectWithValue(error.message);
    }
});

//add Items to cart
export const addOrderInHistory = createAsyncThunk("orders/addOrderInHistory", async ({ orderedProduct, buyerName, buyerEmail, shippingAddress, quantity, totalPrice }, thunkAPI) => {
    const productId = String(orderedProduct.id);
    try {
        const user = auth.currentUser;
        if (!user) {
            return thunkAPI.rejectWithValue("User not logged in");
        }

        const productRef = doc(firestoredb, "orders", user.uid, "products", productId);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
            const updatedQuantity = productSnap.data().quantity + 1;
            await updateDoc(productRef, { quantity: updatedQuantity });

            return { id: productId, ...productSnap.data(), quantity: updatedQuantity };

        } else {
            const orderItem = {
                name: orderedProduct.title,
                price: orderedProduct.price,
                image: orderedProduct.images[0],
                description: orderedProduct.description,
                category: orderedProduct.category || "uncategorized",
                date: new Date().toISOString().split('T')[0],// Example: "2025-03-02"
                customerName: buyerName,
                customerEmail: buyerEmail,
                customerAddress: shippingAddress,
                purchasedQuantity: quantity,
                totalPrice: totalPrice,
            };

            await setDoc(productRef, orderItem);
            return { id: productId, ...orderItem };
        }
    } catch (error) {
        console.log("Error happend", error)
        return thunkAPI.rejectWithValue(error.message);
    }
});


export const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        //getting the ordered product from components
        orderedProduct: [],

        //all orders are savee here i.e, products array
        products: [],

        status: "idle",
        error: null,
        isItemOrdered: false,
    },
    reducers: {
        setOrderedProduct: (state, action) => {
            state.orderedProduct = action.payload
        },
        setIsItemOrdered: (state, action) => {
            state.isItemOrdered = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrderHistory.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchOrderHistory.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = action.payload;
            })
            .addCase(fetchOrderHistory.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })


            .addCase(addOrderInHistory.fulfilled, (state, action) => {
                console.log("🛒 Updating Order History - Product Added:", action.payload);
                const existingItem = state.products.find((item) => item.id === action.payload.id);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    state.products.push(action.payload);
                }
                state.status = 'succeeded'
                state.isItemOrdered = true;
            })
            .addCase(addOrderInHistory.rejected, (state, actions) => {
                state.status = "Failed"
            })
            .addCase(addOrderInHistory.pending, (state, actions) => {
                state.status = "Pending"
            })
    }
})

export const { setOrderedProduct, setIsItemOrdered } = orderSlice.actions
export default orderSlice.reducer