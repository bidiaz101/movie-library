import React from 'react'
import useRating from './useRating'

function ProfileReviewCard({ review }){
    const stars = useRating(review.score)
    
    return (
        <div>
            <div>
                <p>{stars}</p>
                <div>
                    {/* <img src={review.user.profile_picture_thumbnail_url} alt='user profile picture' className='pfp-thumbnail' /> */}
                    <h3>"{review.content}" - username</h3>
                </div>
                {/* {userId === review.user.id ? <button className={buttonclassName} onClick={() => handleDelete(review.id)} >Delete Review</button> : null} */}
            </div>
            <hr />
        </div>
    )
}

export default ProfileReviewCard
