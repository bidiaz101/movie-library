import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import ReviewForm from './ReviewForm'
import ReviewCard from './ReviewCard'

function Reviews({ id }){
    // id is OMDB id

    const [reviews, setReviews] = useState([])
    const [isReviewing, setIsReviewing] = useState(false)

    const username = useSelector(state => state.user.username)

    useEffect(() => {
        fetch(`/movies/${id}`)
        .then(resp => resp.json())
        .then(movieData => setReviews(movieData.reviews))
    }, [id, username])

    const darkMode = useSelector(state => state.user.darkMode)

    const message = username ? 'Write one now!' : 'Log in to write one!'

    function handleDelete(id){
        fetch(`/reviews/${id}`, { method: 'DELETE' })
        .then(setReviews(reviews.filter(review => review.id !== id)))
    }

    const reviewsToDisplay = reviews.map(review => {
        return <ReviewCard key={review.id} review={review} handleDelete={handleDelete} />
    })

    return (
        <div className='review-page'>
            <h3 className='movie-page-title'>Reviews</h3>
            <hr />
            <div>
                {reviews.length ? reviewsToDisplay : <p>There aren't any reviews for this movie. {message} </p>}
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