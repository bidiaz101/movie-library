import React, { useState, useEffect } from 'react'
import MovieCard from './MovieCard'
import EndpointDropdown from './EndpointDropdown'
import { useSelector } from 'react-redux'

function Browse({ setMoviePageId }) {
    const [movies, setMovies] = useState([])
    const [status, setStatus] = useState('idle')
    const [endpoint, setEndpoint] = useState('popular')

    const username = useSelector(state => state.user.username)

    // Possible endpoints: 'popular' 'now-playing' 'top-rated' 'upcoming'

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
        <>
        <EndpointDropdown setEndpoint={setEndpoint} />
        <div className='grid'>
            {status === 'idle' ? moviesToDisplay : <h1>Loading...</h1>}
        </div>
        </>
    )
}

export default Browse