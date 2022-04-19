import React, { useState, useEffect } from 'react'
import Reviews from './Reviews'
import useRating from './useRating'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

function MoviePage({ moviePageId }) {
    const [movieData, setMovieData] = useState([])
    const [status, setStatus] = useState('idle')
    const [errors, setErrors] = useState([])
    const [hidden, setHidden] = useState(true)

    const location = useLocation()

    useEffect(() => {
        setStatus('loading')
        fetch(`/tmdb/movies/${moviePageId || location.pathname.slice(8)}`)
        .then(resp => resp.json())
        .then(data => {
            setStatus('idle')
            setMovieData(data)
        })
    }, [moviePageId])

    // id is the OMDB ID
    const { id, title, budget, original_title, release_date, runtime, overview, poster_path, tagline, vote_average, vote_count} = movieData
    const [genreArr, countriesArr] = [movieData.genres, movieData.production_countries]

    let genres
    if(genreArr){
        genres = genreArr.map(genre => <li key={genre.name}>{genre.name}</li>)
    }

    let countries
    if(countriesArr) {
        countries = countriesArr.map(country => <li key={country.name}>{country.name}</li>)
    }

    const darkMode = useSelector(state => state.user.darkMode)
    const username = useSelector(state => state.user.username)

    let formattedBudget = ''

    if(budget){
        for(let i = budget.toString().length - 1; i >= 0; i--){
            if((formattedBudget.length + 1) % 4 === 0){
                formattedBudget = budget.toString()[i] + ',' + formattedBudget
            } else {
                formattedBudget = budget.toString()[i] + formattedBudget
            }
        }
    }

    const stars = useRating(vote_average)

    function handleAdd(){
        fetch('/user_movies', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                movie: {
                    omdb_id: id
                }
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
    }

    return (
        status === 'loading' ? <h1>Loading...</h1> : (
            <>
            <h2 className='movie-page-title'>{title}</h2>
            <div className='movie-page'>
                <div className='flip-card' id='movie-page-card'>
                    <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title + 'poster'} style={{ width: '100%' }} id={darkMode ? 'poster-dark' : null} className='poster' />
                    <p>{tagline}</p>
                    <p>Rating: {vote_average} {stars}</p>
                    <p>{vote_count} votes</p>
                </div>
                <div className='column'>
                    <div id='modal' className={hidden ? 'hidden' : null} >Movie Successfully Added!</div>
                    <div className={errors.length ? 'error' : 'hidden'}>{errors[0]}</div>
                    <p>Overview: {overview}</p>
                    <ul>
                        {genres ? (
                        <li>
                            <ul>Genres: {genres}</ul>
                        </li>
                        ) : null}
                        <li>Runtime: {runtime}</li>
                        {budget ? <li>Budget: ${formattedBudget}</li> : null}
                        <li>Original Title: {original_title}</li>
                        <li>Release Date: {release_date}</li>
                        {countries ? (
                        <li>
                            <ul>Produced In: {countries}</ul>
                        </li>
                        ) : null}
                    </ul>
                    <hr />
                    {username ? (
                        <button id='card-button-uncollected' onClick={handleAdd}>Add to Collection</button>
                     ) : (
                        <p>Log in or continue as a guest to add this to a collection!</p>
                     )}
                </div>
                {id ? <Reviews id={id} setErrors={setErrors} /> : null}
            </div>
            </>
        )
    )
}

export default MoviePage