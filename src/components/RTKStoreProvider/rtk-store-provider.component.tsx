"use client";
import { Provider } from "react-redux";
import { store } from "@/lib/store";

export default function RTKStoreProvider(props: {children: React.ReactNode}) {
    return <Provider store={store}>{props.children}</Provider>
}