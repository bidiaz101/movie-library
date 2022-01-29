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
    favorite,
    favoritesArr=[],
    setFavoritesArr
}) {
    const [hidden, setHidden] = useState(true)
    const [errors, setErrors] = useState([])
    const [thisMovie, setThisMovie] = useState(movie)
    const [favoriteState, setFavoriteState] = useState(favorite)

    useEffect(() => {
        if(collected){
            fetch(`tmdb/movie/${omdbId}`)
            .then(resp => resp.json())
            .then(movieData => setThisMovie(movieData))
        }
    }, [collected, omdbId])

    //id is OMDB ID
    const { id, title, poster_path, release_date, overview, vote_average, vote_count } = thisMovie

    function handleAdd(){
        fetch('/movies', {
            method: 'POST',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({ omdb_id: thisMovie.id })
        })
        .then(
            // id in this fetch request is using the OMDB id
            // will run regardless of if the movie has been posted already, making it independent on whether the first fetch is successful
            // Movies can only be posted if their omdb id is unique
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
        fetch('/movies', {
            method: 'POST',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({ omdb_id: thisMovie.id })
        })
        history.push(`/movie/${id}`)
    }

    const darkMode = useSelector(state => state.user.darkMode)

    const collectionBtn = collected ? (
        <button id='card-button-collected' onClick={() => handleRemove(userMovieId)}>Remove from Collection</button>
    ) : (
        <button id='card-button-uncollected' onClick={handleAdd}>Add to Collection</button>
    )

    const heart = favoritesArr.includes(userMovieId) ? '💗' : '♡' ;

    // favoriteState used to setState after fetching data to render favorites on loading, FavoritesArray is to 
    // keep track of which cards to display when switch is toggled
    function handleFavorite(){
        fetch(`/user_movies/${userMovieId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ favorite: !favorite })
        })
        .then(setFavoriteState(!favoriteState))
        if(!favoriteState){
            setFavoritesArr([...favoritesArr, userMovieId])
        } else {
            setFavoritesArr(favoritesArr.filter(id => userMovieId !== id))
        }
    }

    const movieCardTitle = `${title} ${release_date ? `(${release_date.slice(0,4) })` : ""}`
    const stars = useRating(vote_average)

    return (
        <div className='flip-card'>
            <div id='modal' className={hidden ? 'hidden' : null} >Movie Successfully Added!</div>
            <div className={errors.length ? 'error' : 'hidden'}>{errors[0]}</div>
            <div id={darkMode? 'flip-card-inner-dark' :null} className='flip-card-inner'>
                <div className='flip-card-front'>
                    <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title + ' poster'} style={{ width: '100%' }} />
                    <div>
                        <h2>{movieCardTitle}</h2>
                        {collected ? <div>{heart}</div> : null}
                        {movieCardTitle.length > 44 && collected ? null : <p>{stars}</p>}
                    </div>
                </div>
                <div className='flip-card-back'>
                    <p><strong>Overview: </strong></p>
                    <p>{overview}</p>
                    <p>Average Rating: {vote_average}</p>
                    <p>{useRating(vote_average)}</p>
                    <p>Votes: {vote_count}</p>
                    {collected ? <div onClick={handleFavorite}>{heart}</div> : null}
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
