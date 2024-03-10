import { configureStore } from "@reduxjs/toolkit";
import APIHandling from "./features/APIHandling";

export const store = configureStore({
    reducer: {
        APIHandling,
    },
});
