import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, googleProvider } from "../../../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'

export const handleCreateUser = createAsyncThunk("auth/handleCreateUser",
    async ({ email, password }, thunkAPI) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            return {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || "", // Handle null values
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);   
        }
    }
);

export const handleSignInUser = createAsyncThunk("auth/handleSignInUser",
    async ({ email, password }, thunkAPI) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            return {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || "", // Handle null values
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message); 
        }
    }
);


export const handleSignInWithGoogle = createAsyncThunk(
    "auth/handleSignInWithGoogle",
    async (_, thunkAPI) => { 
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            const user = userCredential.user;
            return {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || "", // Handle null values
            };
        } catch (error) {
            console.error("Google Sign-In Error:", error);
            return thunkAPI.rejectWithValue(error.message); // Return error for handling in Redux
        }
    }
);


export const handleLogout = createAsyncThunk(
    "auth/handleLogout",
    async (_, thunkAPI) => {
        try {
            await signOut(auth);
            return null; 
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        status: "idle",
        error: null,
        isloggedOut : false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(handleCreateUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(handleCreateUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload; // Save user data
            })
            .addCase(handleCreateUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload; // Store error message
            })

            .addCase(handleSignInWithGoogle.pending, (state) => {
                state.status = "loading";
            })
            .addCase(handleSignInWithGoogle.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
            })
            .addCase(handleSignInWithGoogle.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            .addCase(handleLogout.pending, (state) => {
                state.status = "loading";
            })
            .addCase(handleLogout.fulfilled, (state) => {
                state.status = "idle";
                state.user = null;
                state.isloggedOut = true;
            })
            .addCase(handleLogout.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            .addCase(handleSignInUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(handleSignInUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload; 
            })
            .addCase(handleSignInUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload; 
            });
    },

})


// export const { setEmail, setPassword } = authSlice.actions
export default authSlice.reducer