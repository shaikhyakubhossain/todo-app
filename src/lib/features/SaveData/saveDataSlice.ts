import { createSlice } from "@reduxjs/toolkit";
import { taskType } from "@/utils/Types/local";

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
        setSaveData: (state, action) => {
            state.tasks = action.payload
        }
    },
})

export const { setSaveData } = saveDataSlice.actions;

export default saveDataSlice.reducer