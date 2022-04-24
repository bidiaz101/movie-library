import React, { useState, useEffect } from 'react'
import ProfileReviewCard from './ProfileReviewCard'

function ProfileReviews({ movieId, reviews }){
    const [movie, setMovie] = useState(0)

    useEffect(() => {
        fetch(`tmdb/movies/${movieId}`)
        .then(resp => resp.json())
        .then(data => setMovie(data))
    }, [movieId])

    const reviewsToDisplay = reviews.map(review => <ProfileReviewCard key={review.id} review={review} />)

    return (
        <div>
            <h3>Reviews for "{movie.title}"</h3>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className='poster' />
            {reviewsToDisplay}
        </div>
    )
}

export default ProfileReviews
