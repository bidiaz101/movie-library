import React from 'react'
import useRating from './useRating'

function ReviewCard({ review }){
    const stars = useRating(review.score)

    return (
        <div>
            <p>{stars}</p>
            <h3>"{review.content}" - {review.user.username}</h3>
            <hr />
        </div>
    )
}

export default ReviewCard