// app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { CounterSlice } from "./CounterSlice";

export default  store=configureStore({
    reducer:{
        counter:CounterSlice.reducer
    }
})
