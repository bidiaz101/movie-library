import React, { useState, useEffect } from 'react'
import MovieCard from './MovieCard'
import { useSelector } from 'react-redux'

function Browse({ endpoint, setMoviePageId }) {
    const [movies, setMovies] = useState([])
    const [status, setStatus] = useState('idle')

    const username = useSelector(state => state.user.username)

    useEffect(() => {
        setStatus('loading')
        fetch(`/tmdb/movies/${endpoint}`)
        .then(resp => resp.json())
        .then(data => {
            setMovies(data.results)
            setStatus('idle')
        })
    }, [endpoint])

    const moviesToDisplay = movies.map(movie => {

        // movie.id is the OMDB ID, not my backend ID

        return <MovieCard key={movie.id} movie={movie} username={username} setMoviePageId={setMoviePageId} />
    })

    return (
        <div className='grid'>
            {status === 'idle' ? moviesToDisplay : <h1>Loading...</h1>}
        </div>
    )
}

export default Browse