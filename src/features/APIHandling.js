import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: false,
    messageError: "",
};

export const APIHandling = createSlice({
    name: "APIHandling",
    initialState,
    reducers: {
        changeLoading: (state) => {
            state.loading = !state.loading;
        },
        changeError: (state) => {
            state.error = !state.error;
        },
        addMessageError: (state, action) => {
            state.messageError = action.payload;
        },
    },
});

export const { changeLoading, changeError, addMessageError } =
    APIHandling.actions;
export default APIHandling.reducer;
