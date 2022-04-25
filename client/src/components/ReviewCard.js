import React from 'react'
import useRating from './useRating'
import { useSelector } from 'react-redux'

function ReviewCard({ review, handleDelete }){
    const stars = useRating(review.score)

    const userId = useSelector(state => state.user.id)
    const darkMode = useSelector(state => state.user.darkMode)

    const buttonclassName = darkMode ? 'button-dark-review': 'button-review'
    
    return (
        <div>
            <div>
                <p>{stars}</p>
                <div className='review-content'>
                    <img src={review.user.profile_picture_thumbnail_url || "https://res.cloudinary.com/dimt84h2m/image/upload/c_fill,g_faces,h_60,w_60/v1649397503/SML_profile_pictures/npmrfmboeuuz8sokvwqe.jpg"} alt='user profile picture' className='pfp-thumbnail' />
                    <h3>"{review.content}" - {review.user.username}</h3>
                </div>
                {userId === review.user.id ? <button className={buttonclassName} onClick={() => handleDelete(review.id)} >Delete Review</button> : null}
            </div>
            <hr />
        </div>
    )
}

export default ReviewCard