import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchUser = createAsyncThunk('user/fetchUser', () => {
    return fetch('/me')
    .then(resp => resp.json())
    .then(userData => userData)
})

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: 0,
        username: '',
        darkMode: false,
        status: 'idle',
    },
    reducers: {
        login(state, action) {
            state.id = action.payload.id
            state.username = action.payload.username
            state.darkMode = action.payload.dark_mode
        },
        changeDarkMode(state) {
            state.darkMode = !state.darkMode
        },
        logout(state) {
            state.id = 0
            state.username = ''
            state.darkMode = false
        }
    },
    extraReducers: {
        [fetchUser.pending](state){
            state.status = 'loading'
        },
        [fetchUser.fulfilled](state, action){
            state.id = action.payload.id
            state.username = action.payload.username
            state.darkMode = action.payload.dark_mode
            state.status = 'idle'
        }
    }
})

export const { login, changeDarkMode, logout } = userSlice.actions

export default userSlice.reducer
