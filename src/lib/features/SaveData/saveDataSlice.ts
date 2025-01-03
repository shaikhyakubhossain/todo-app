import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { taskType } from "@/utils/Types/local";

interface saveDataStateType {
    tasks: taskType[];
}

const initialState: saveDataStateType = {
    tasks: []
};

export const saveDataSlice = createSlice({
    name: "saveData",
    initialState,
    reducers: {
        setSaveData: (state, action: PayloadAction<taskType[]>) => {
            state.tasks = [...action.payload]
        }
    },
})

export const { setSaveData } = saveDataSlice.actions;

export default saveDataSlice.reducer