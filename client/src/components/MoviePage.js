import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Reviews from './Reviews'
import useRating from './useRating'
import { useSelector } from 'react-redux'

function MoviePage() {
    const [movieData, setMovieData] = useState([])
    const [status, setStatus] = useState('idle')
    const [errors, setErrors] = useState([])
    const [hidden, setHidden] = useState(true)

    const location = useLocation()

    useEffect(() => {
        setStatus('loading')
        fetch(`/tmdb${location.pathname}`)
        .then(resp => resp.json())
        .then(data => {
            setStatus('idle')
            setMovieData(data)
        })
    }, [location.pathname])

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

    let formattedBudget = ''

    if(budget){
        for(let i = 0; i < budget.toString().length; i++){
            if(i % 3 === 0 && i) {
                formattedBudget += ',' + budget.toString()[i]
            } else {
                formattedBudget += budget.toString()[i] 
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
                        <hr />
                        <button id='card-button-uncollected' onClick={handleAdd}>Add to Collection</button>
                    </ul>
                </div>
                {id ? <Reviews id={id} /> : null}
            </div>
            </>
        )
    )
}

export default MoviePage