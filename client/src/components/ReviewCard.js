import React from 'react'
import useRating from './useRating'
import { useSelector } from 'react-redux'

function ReviewCard({ review, handleDelete }){
    const stars = useRating(review.score)

    const userId = useSelector(state => state.user.id)
    const darkMode = useSelector(state => state.user.darkMode)

    return (
         <div>
            <div>
                <p>{stars}</p>
                <h3>"{review.content}" - {review.user.username}</h3>
            </div>
            {userId === review.user.id ? <button className={darkMode ? 'button-dark-review': 'button-review'} onClick={() => handleDelete(review.id)} >X</button> : null}
            <hr />
        </div>
    )
}

export default ReviewCard