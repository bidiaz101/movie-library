import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import ReviewForm from './ReviewForm'
import ReviewCard from './ReviewCard'

function Reviews({ id }){
    // id is OMDB id

    const [reviews, setReviews] = useState([])
    const [isReviewing, setIsReviewing] = useState(false)

    useEffect(() => {
        fetch(`/reviews/${id}`)
        .then(resp => resp.json())
        .then(reviewData => setReviews(reviewData))
    }, [])

    const username = useSelector(state => state.user.username)
    const darkMode = useSelector(state => state.user.darkMode)

    const message = username ? 'Write one now!' : 'Log in to write one!'

    const reviewsToDisplay = reviews.map(review => {
        return <ReviewCard key={review.id} review={review} />
    })

    return (
        <div>
            <h3 className='movie-page-title'>Reviews</h3>
            <div className='movie-page-content'>
                {reviews.length ? <div>darn</div> : <p>There aren't any reviews for this movie. {message} </p>}
                <br />
                <br />
                {isReviewing ? (
                    <div>
                        <ReviewForm id={id} reviews={reviews} setReviews={setReviews} setIsReviewing={setIsReviewing} />
                    </div> 
                ) : <button className={darkMode ? 'button-dark': null} onClick={() => setIsReviewing(!isReviewing)}>Write Review</button>}

            </div>
        </div>
    )
}

export default Reviews