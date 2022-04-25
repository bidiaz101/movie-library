import React from 'react'
import useRating from './useRating'

function ProfileReviewCard({ review }){
    const stars = useRating(review.score)
    
    return (
        <div>
            <p>{stars}</p>
            <h3>"{review.content}"</h3>
        </div>
    )
}

export default ProfileReviewCard
