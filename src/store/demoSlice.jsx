import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";

const initialState = {
    demoSlice: {
        demoProperty: "Hello"
    }
}

export const demoSlice = createSlice({
    name: 'demoSlice',
    initialState,
    reducers: {
        setDemoSlice: (state, action) => {
            state.demoProperty = action.payload
        }
    }
})
export const { setDemoSlice } = demoSlice.actions
export default demoSlice.reducer