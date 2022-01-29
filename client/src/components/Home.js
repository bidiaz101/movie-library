import React, { useState, useEffect } from 'react'
import MovieCard from './MovieCard'
import { useSelector } from 'react-redux'

function Home({ endpoint }) {
    const [movies, setMovies] = useState([])
    const [status, setStatus] = useState('idle')

    const username = useSelector(state => state.user.username)

    useEffect(() => {
        setStatus('loading')
        fetch(`https://api.themoviedb.org/3/movie/${endpoint}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
        .then(resp => resp.json())
        .then(data => {
            setMovies(data.results)
            setStatus('idle')
        })
    }, [endpoint])

    const moviesToDisplay = movies.map(movie => {

        // movie.id is the OMDB ID, not my backend ID

        return <MovieCard key={movie.id} movie={movie} username={username} />
    })

    return (
        <div className='grid'>
            {status === 'idle' ? moviesToDisplay : <h1>Loading...</h1>}
        </div>
    )
}

export default Home