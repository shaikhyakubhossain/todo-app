import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authDetailSlice from "./features/AuthDetail/authDetailSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    authDetail: authDetailSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;