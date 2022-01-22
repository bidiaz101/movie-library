import React, { useState, useEffect } from 'react'
import MovieCard from './MovieCard'

function Home({ endpoint }) {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${endpoint}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
        .then(resp => resp.json())
        .then(data => setMovies(data.results))
    }, [endpoint])

    const moviesToDisplay = movies.map(movie => {
        return <MovieCard key={movie.id} movie={movie} />
    })

    return (
        <div className='grid'>
            {moviesToDisplay}
        </div>
    )
}

export default Home