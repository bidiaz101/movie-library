import React, { useState, useEffect } from 'react'
import MovieCard from './MovieCard'
import { useSelector } from 'react-redux'

function Home({ endpoint }) {
    const [movies, setMovies] = useState([])
    const username = useSelector(state => state.user.username)

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${endpoint}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
        .then(resp => resp.json())
        .then(data => {
            setMovies(data.results)

            data.results.forEach(movie => {
                const { id, vote_count, vote_average } = movie

                // Stores OMDB Api ID 

                fetch('/movies', {
                    method: 'POST',
                    headers: { "Content-Type": 'application/json' },
                    body: JSON.stringify({
                        omdb_id: id,
                        vote_count: vote_count,
                        vote_average: vote_average
                    })
                })

            })
        })
    }, [endpoint])

    console.log(movies)

    const moviesToDisplay = movies.map(movie => {

        // movie.id is the OMDB ID, not my backend ID

        return <MovieCard key={movie.id} movie={movie} username={username} />
    })

    return (
        <div className='grid'>
            {moviesToDisplay}
        </div>
    )
}

export default Home