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
            state.thumbnail = action.payload.profile_picture_thumbnail_url
            state.profilePic = action.payload.profile_picture_url
            state.cloudinaryPublicId = action.payload.cloudinary_public_id
        },
        changeDarkMode(state) {
            state.darkMode = !state.darkMode
        },
        logout(state) {
            state.id = 0
            state.username = ''
            state.darkMode = false
            state.thumbnail = ''
            state.profilePic = ''
            state.cloudinaryPublicId = ''
        },
        updateProfilePic(state, action){
            state.thumbnail = action.payload.profile_picture_thumbnail_url
            state.profilePic = action.payload.profile_picture_url
            state.cloudinaryPublicId = action.payload.cloudinary_public_id
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
            state.thumbnail = action.payload.profile_picture_thumbnail_url
            state.profilePic = action.payload.profile_picture_url
            state.cloudinaryPublicId = action.payload.cloudinary_public_id
            state.status = 'idle'
        }
    }
})

export const { login, changeDarkMode, logout, updateProfilePic } = userSlice.actions

export default userSlice.reducer
