import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import useRating from './useRating'
import { useSelector } from 'react-redux'

function MovieCard({ 
    movie={
        id: 0,
        title: '',
        poster_path: '',
        release_date: '',
        overview: '',
        vote_average: 0,
        vote_count: 0
    }, 
    username, 
    collected=false,
    omdbId,
    handleRemove,
    userMovieId,
    favorite
}){
    const [hidden, setHidden] = useState(true)
    const [errors, setErrors] = useState([])
    const [thisMovie, setThisMovie] = useState(movie)
    const [favoriteState, setFavoriteState] = useState(favorite)

    useEffect(() => {
        if(collected){
            fetch(`https://api.themoviedb.org/3/movie/${omdbId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
            .then(resp => resp.json())
            .then(movieData => setThisMovie(movieData))
        }
    }, [])

    //id is OMDB ID
    const { id, title, poster_path, release_date, overview, vote_average, vote_count } = thisMovie

    function handleAdd(){
        fetch('/movies', {
            method: 'POST',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({ omdb_id: thisMovie.id })
        })
        .then(
            fetch(`/movies/${id}`)
            .then(resp => resp.json())
            .then(movieResp => {
                // id is my DB ID. omdb_id is exactly what you'd think

                fetch('/user_movies', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        movie_id: movieResp.id,
                        favorite: false
                    })
                })
                .then(resp => {
                    if(resp.ok){
                        setHidden(false)
                        setTimeout(() => setHidden(true) , 2000)
                    } else {
                        resp.json()
                        .then(data => setErrors(data.error))
                        setTimeout(() => setErrors([]) , 2000)
                    }
                })
            })
        )
    }

    const history = useHistory()

    function handlePageView(){
        history.push(`/movie/${id}`)
    }

    const darkMode = useSelector(state => state.user.darkMode)

    const collectionBtn = collected ? (
        <button id='card-button-collected' onClick={() => handleRemove(userMovieId)}>Remove from Collection</button>
    ) : (
        <button id='card-button-uncollected' onClick={handleAdd}>Add to Collection</button>
    )

    const heart = favoriteState ? '💗' : '♡' ;

    function handleFavorite(){
        fetch(`/user_movies/${userMovieId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ favorite: !favorite })
        })
        .then(setFavoriteState(!favoriteState))
    }

    return (
        <div className='flip-card'>
            <div id='modal' className={hidden ? 'hidden' : null} >Movie Successfully Added!</div>
            <div className={errors.length ? 'error' : 'hidden'}>{errors[0]}</div>
            <div id={darkMode? 'flip-card-inner-dark' :null} className='flip-card-inner'>
                <div className='flip-card-front'>
                    <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title + ' poster'} style={{ width: '100%' }} />
                    <div>
                        <h2>{`${title} ${ release_date ? `(${release_date.slice(0,4) })` : "" }`}</h2>
                        {collected ? <div>{heart}</div> : null}
                        <p>{useRating(vote_average)}</p>
                    </div>
                </div>
                <div className='flip-card-back'>
                    {collected ? <div onClick={handleFavorite}>{heart}</div> : null}
                    <p><strong>Overview: </strong></p>
                    <p>{overview}</p>
                    <p>Average Rating: {vote_average}</p>
                    <p>{useRating(vote_average)}</p>
                    <p>Votes: {vote_count}</p>
                    <div className='button-wrap'>
                        {username ? (
                            collectionBtn
                        ) : null}
                        <button className={darkMode ? 'button-dark': null} onClick={handlePageView}>View Movie Page</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard
