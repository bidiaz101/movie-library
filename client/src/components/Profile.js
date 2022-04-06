import React from 'react'
import CloudinaryUpload from './CloudinaryUpload'
import { useSelector } from 'react-redux'

function Profile(){
    const user = useSelector(state => state.user)
    console.log(user)

    return (
        <h1>Profile</h1>
    )
}

export default Profile
