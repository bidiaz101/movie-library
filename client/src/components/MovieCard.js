import React from 'react'
import { useHistory } from 'react-router-dom'
import useRating from './useRating'

function MovieCard({ movie, username,  collected=false }){

    const { id, title, poster_path, release_date, overview, vote_average, vote_count } = movie

    function handleClick(){
        fetch(`/movies/${id}`)
        .then(resp => {
            if(resp.ok){
                resp.json()
                .then(movieData => postUserMovie(movieData))
            } else {
                postMovieAndUserMovie()
            }
        })
    }

    function postMovieAndUserMovie(){
        fetch('/movies', {
            method: 'POST',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({
                omdb_id: id,
                vote_count: vote_count,
                vote_average: vote_average
            })
        })
        .then(resp => resp.json())
        .then(movieData => postUserMovie(movieData))
    }

    function postUserMovie(movieData){
        fetch('/user_movies', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                movie_id: movieData.id,
                favorite: false
            })
        })
    }

    const history = useHistory()

    function handlePageView(){
        history.push(`/movie/${id}`)
    }

    return (
        <div className='flip-card'>
            <div className='flip-card-inner'>
                <div className='flip-card-front'>
                    <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title + 'poster'} style={{ width: '100%' }} />
                    <div>
                        <h2>{`${title} (${ release_date.slice(0,4) })`}</h2>
                    </div>
                </div>
                <div className='flip-card-back'>
                    <p><strong>Overview: </strong></p>
                    <p>{overview}</p>
                    <p>Average Rating: {vote_average}</p>
                    <p>{useRating(vote_average)}</p>
                    <p>Votes: {vote_count}</p>
                    <div className='button-wrap'>
                        {username ? (
                            <button id={collected ? 'card-button-collected' : 'card-button-uncollected'} onClick={handleClick}>{collected ? 'Remove from Collection' : 'Add to Collection'}</button>
                        ) : null}
                        <button onClick={handlePageView}>View Movie Page</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard
