import { createSlice } from "@reduxjs/toolkit";



export const modeSlice = createSlice({
    name: 'mode',
    initialState : {
        currentMode : 'light',
    },
    reducers : {
        setMode : (state , action) => {
            state.currentMode = action.payload
        }
    }
})


export const {setMode} = modeSlice.actions
export default modeSlice.reducer