import React, { useEffect, useState } from 'react'
import CloudinaryUpload from './CloudinaryUpload'
import { useSelector, useDispatch } from 'react-redux'
import { updateProfilePic } from '../features/user/userSlice'
import ProfileReviews from './ProfileReviews'

function Profile(){
    const { id, username, profilePic } = useSelector(state => state.user)
    const [userReviews, setUserReviews] = useState([])

    useEffect(() => {
        if(id){
            fetch(`/users/profiles/${id}`)
            .then(resp => resp.json())
            .then(data => setUserReviews(data.reviews))
        }
    }, [id])

    const dispatch = useDispatch()

    function handleUpload(result){
        const body = {
            profile_picture_url: result.info.secure_url,
            profile_picture_thumbnail_url: result.info.eager[0].secure_url,
            cloudinary_public_id: result.info.public_id
        }
        fetch(`/users/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
        .then(user => {
            dispatch(updateProfilePic(user))
        })
    }

    const movieReviews = Array.from(new Set(userReviews.map(review => review.movie.omdb_id)))
    const moviesToDisplay = movieReviews.map(movieId => <ProfileReviews key={movieId} movieId={movieId} reviews={userReviews.filter(review => review.movie.omdb_id === movieId)} />) 

    return (
        <div className="profile">
            <div>
                <div>
                    <img src={profilePic || "https://res.cloudinary.com/dimt84h2m/image/upload/v1649265828/Profile_avatar_placeholder_large_ky4gfw_wlukfb.png"} alt={`${username}`} className='pfp' />
                    <br />
                    <CloudinaryUpload
                        preset="ncp1k6i2"
                        buttonText="Update Profile Picture"
                        handleUpload={handleUpload}
                    /> 
                </div>
                <div className="col-span-2">
                    <h2 className="text-xl">{username}</h2>
                </div>
            </div>
            <div>
                {moviesToDisplay}
            </div>
        </div>
    )
}

export default Profile
