import { createSlice } from "@reduxjs/toolkit";

const initialState={
    value:15
}

export const CounterSlice=createSlice({
    name:"counter",
    initialState,
    reducer:{
        increment:(state)=>
        {
            state.value+=1
        },
        decrement:(state)=>
        {
            state.value-=1
        }

    }
})

export const {increment,decrement}=CounterSlice.actions;
export default CounterSlice.reducer;