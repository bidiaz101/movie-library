import React from 'react'

function MovieCard({ movie, genres, collected=false }){

    const { id, title, poster_path, release_date, overview, vote_average, vote_count } = movie

    let rating = ''

    for(let i = 1; i < vote_average; i++){
        rating += '⭐'
    }

    for(let i = vote_average; i < 10; i++){
        rating += '✰'
    }

    function handleClick(){
        fetch('/user_movies', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                movie_id: id,
                favorite: false
            })
        })

    }

    return (
        <div className='flip-card'>
            <div className='flip-card-inner'>
                    <div className='flip-card-front'>
                        <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title + 'poster'} style={{ width: '100%' }} />
                        <div>
                            <p>{`${title} (${ release_date.slice(0,4) })`}</p>
                        </div>
                    </div>
                    <div className='flip-card-back'>
                        <p><strong>Overview: </strong></p>
                        <p>{overview}</p>
                        <p>Average Rating: </p>
                        <p>{rating}</p>
                        <p>Votes: {vote_count}</p>
                        <button id={collected ? 'card-button-collected' : 'card-button-uncollected'} onClick={handleClick}>{collected ? 'Remove from Collection' : 'Add to Collection'}</button>
                    </div>
            </div>
        </div>
    )
}

export default MovieCard
