import { configureStore } from "@reduxjs/toolkit";
import authDetailSlice from "./features/AuthDetail/authDetailSlice";

export const store = configureStore({
    reducer: {
        authDetail: authDetailSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;