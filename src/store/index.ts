import { configureStore } from "@reduxjs/toolkit";
import { TodoSlice } from "./todo/todoSlice";

export const store = configureStore({
    reducer: {
        [TodoSlice.name]: TodoSlice.reducer
    }

})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>