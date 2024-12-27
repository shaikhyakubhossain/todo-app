"use client";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import RTKStoreProviderLoading from "./rtk-store-provider.loading";

export default function RTKStoreProvider(props: {children: React.ReactNode}) {
    const persistor = persistStore(store);
    return (
        <Provider store={store}>
            <PersistGate loading={<RTKStoreProviderLoading/>} persistor={persistor}>
            {props.children}
            </PersistGate>
        </Provider>
    )
}