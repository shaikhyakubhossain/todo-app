import { createSlice } from "@reduxjs/toolkit";

interface viewModeStateType {
    listMode: boolean;
}

const initialState: viewModeStateType = {
    listMode: false
};

export const viewModeSlice = createSlice({
    name: "viewMode",
    initialState,
    reducers: {
        toggleViewMode: (state) => {
            state.listMode = !state.listMode
        }
    },
})

export const { toggleViewMode } = viewModeSlice.actions;

export default viewModeSlice.reducer