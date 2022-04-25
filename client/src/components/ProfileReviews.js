import React, { useState, useEffect } from 'react'
import ProfileReviewCard from './ProfileReviewCard'
import { Link } from 'react-router-dom'

function ProfileReviews({ movieId, reviews }){
    const [movie, setMovie] = useState(0)

    useEffect(() => {
        fetch(`tmdb/movies/${movieId}`)
        .then(resp => resp.json())
        .then(data => setMovie(data))
    }, [movieId])

    const reviewsToDisplay = reviews.map(review => <ProfileReviewCard key={review.id} review={review} />)

    return (
        <>
        <div className='review-section'>
            <h3>Reviews for "{<Link to={`/movies/${movieId}`}>{movie.title}</Link>}"</h3>
            <div>
                <div>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className='poster' />
                </div>
                <div>
                    {reviewsToDisplay}
                </div>
            </div>
        </div>
        <hr />
        </>
    )
}

export default ProfileReviews
