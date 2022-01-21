import React, { useState, useEffect } from 'react'
import MovieCard from './MovieCard'

function Home({ genres }) {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
        .then(resp => resp.json())
        .then(data => setMovies(data.results))
    }, [])

    const moviesToDisplay = movies.map(movie => {
        return <MovieCard key={movie.id} movie={movie} genres={genres} />
    })

    return (
        <div className='grid'>
            {moviesToDisplay}
        </div>
    )
}

export default Home