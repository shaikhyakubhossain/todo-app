import { createSlice } from "@reduxjs/toolkit";

interface authDetailStateType {
    username: string | null;
    token: string | null;
}

const initialState: authDetailStateType = {
    username: null,
    token: null,
};

export const authDetailSlice = createSlice({
    name: "authDetail",
    initialState,
    reducers: {
        setAuthDetail: (state, action) => {
            state.username = action.payload.username;
            state.token = action.payload.token;
        },
    },
})

export const { setAuthDetail } = authDetailSlice.actions;

export default authDetailSlice.reducer