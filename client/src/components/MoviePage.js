import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function MoviePage() {
    const [movieData, setMovieData] = useState([])

    const location = useLocation()

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3${location.pathname}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        .then(resp => resp.json())
        .then(data => setMovieData(data))
    }, [])

    const { title, budget, original_title, release_date, runtime, overview, poster_path, tagline, vote_average, vote_count} = movieData
    const [genreArr, countriesArr] = [movieData.genres, movieData.production_countries]

    let rating = ''

    for(let i = 1; i < vote_average; i++){
        rating += '⭐'
    }

    for(let i = vote_average; i < 10; i++){
        rating += '✰'
    }

    const genres = genreArr.map(genre => <li>{genre.name}</li>)
    const countries = countriesArr.map(country => <li>{country.name}</li>)

    return (
        <div className='app-wrap'>
            <div className='flip-card'>
                <h2>{title}</h2>
                <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title + 'poster'} style={{ width: '100%' }} />
                <p>{tagline}</p>
                <p>Rating: {rating}</p>
                <p>{vote_count} votes</p>
                <p>Overview: {overview}</p>
                <ul>
                    <li>
                        <ul>Genres: {genres}</ul>
                    </li>
                    <li>Runtime: {runtime}</li>
                    {budget ? <p>Budget: ${budget}</p> : null}
                    <li>Original Title: {original_title}</li>
                    <li>Release Date: {release_date}</li>
                    <li>
                        <ul>Produced In: {countries}</ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default MoviePage