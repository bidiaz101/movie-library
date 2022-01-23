import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

function Reviews({ id }){
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetch(`/reviews/${id}`)
        .then(resp => resp.json())
        .then(reviewData => setReviews(reviewData))
    }, [])

    const username = useSelector(state => state.user.username)

    const message = username ? 'Write one now!' : 'Log in to write one!'

    console.log(id, reviews)

    return (
        <div>
            <h3 className='movie-page-title'>Reviews</h3>
            <div className='movie-page-title'>
                {reviews.length ? <p>review component</p>: <p>There aren't any reviews for this movie. {message} </p>}
            </div>
        </div>
    )
}

export default Reviews