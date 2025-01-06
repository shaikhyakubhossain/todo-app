import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { taskType } from "@/utils/Types/local";

interface saveDataStateType {
    savedTasks: taskType[];
    loadedTasks: taskType[];
}

const initialState: saveDataStateType = {
    savedTasks: [],
    loadedTasks: [],
};

export const saveDataSlice = createSlice({
    name: "saveData",
    initialState,
    reducers: {
        setSaveData: (state, action: PayloadAction<taskType[]>) => {
            state.savedTasks = [...action.payload]
        },
        setLoadedData: (state, action: PayloadAction<taskType[]>) => {
            state.loadedTasks = [...action.payload]
        }
    },
})

export const { setSaveData, setLoadedData } = saveDataSlice.actions;

export default saveDataSlice.reducer