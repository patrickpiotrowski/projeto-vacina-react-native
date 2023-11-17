import { createSlice } from '@reduxjs/toolkit'

const initialValues = {
    idUsuario: null
}

export const idUsuario = createSlice({
    name: 'idUsuario',
    initialState: initialValues,
    reducers: {
        reducerSetidUsuario: (state, action) => {
            state.idUsuario = action.payload.idUsuario
        }
    }
})

export const {reducerSetidUsuario} = idUsuario.actions

export default idUsuario.reducer