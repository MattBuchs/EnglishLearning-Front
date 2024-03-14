import { createSlice } from "@reduxjs/toolkit";
import { decodeToken, isTokenValid } from "../utils/token";

const initialState = {
    token: null,
    tokenDecoded: null,
    isAuthenticated: false,
};

export const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        checkToken: (state) => {
            console.log("CHECK TOKEN");
            const token = localStorage.getItem("user");

            if (token) {
                const tokenValidated = isTokenValid(token);

                console.log(tokenValidated);
                if (tokenValidated) state.isAuthenticated = true;
                else state.isAuthenticated = false;
            } else state.isAuthenticated = false;
        },

        getToken: (state, action) => {
            if (action.payload) {
                localStorage.setItem("user", action.payload);

                const token = localStorage.getItem("user");

                state.token = token;
                state.tokenDecoded = decodeToken(token);
                state.isAuthenticated = true;
            }
        },
    },
});

export const { checkToken, getToken } = user.actions;
export default user.reducer;
