import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Reviews from './Reviews'
import useRating from './useRating'
import { useSelector } from 'react-redux'

function MoviePage() {
    const [movieData, setMovieData] = useState([])

    const location = useLocation()

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3${location.pathname}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        .then(resp => resp.json())
        .then(data => setMovieData(data))
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
                formattedBudget += ','
                formattedBudget += budget.toString()[i] 
            } else {
                formattedBudget += budget.toString()[i] 
            }
        }
    }

    return (
        <>
        <h2 className='movie-page-title'>{title}</h2>
        <div className='movie-page'>
            <div className='flip-card' id='movie-page-card'>
                <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title + 'poster'} style={{ width: '100%' }} id={darkMode ? 'poster-dark' : null} className='poster' />
                <p>{tagline}</p>
                <p>Rating: {vote_average} {useRating(vote_average)}</p>
                <p>{vote_count} votes</p>
            </div>
            <div className='column'>
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
            </div>
            {id ? <Reviews id={id} /> : null}
        </div>
        </>
    )
}

export default MoviePage