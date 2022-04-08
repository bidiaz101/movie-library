import React from 'react'
import useRating from './useRating'
import { useSelector } from 'react-redux'

function ReviewCard({ review, handleDelete }){
    const stars = useRating(review.score)

    const userId = useSelector(state => state.user.id)
    const darkMode = useSelector(state => state.user.darkMode)

    const buttonclassName = darkMode ? 'button-dark-review': 'button-review'

    console.log(review)
    
    return (
         <div>
            <div>
                <p>{stars}</p>
                <div className='review-content'>
                    <img src={review.user.profile_picture_thumbnail_url} alt='user profile picture' className='pfp-thumbnail' />
                    <h3>"{review.content}" - {review.user.username}</h3>
                </div>
                {userId === review.user.id ? <button className={buttonclassName} onClick={() => handleDelete(review.id)} >Delete Review</button> : null}
            </div>
            <hr />
        </div>
    )
}

export default ReviewCard