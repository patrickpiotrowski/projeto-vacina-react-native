import { configureStore } from "@reduxjs/toolkit";
import idUsuarioSlice from "./idUsuarioSlice";

export const store = configureStore({
    reducer: {
        idUsuario: idUsuarioSlice
    }
})