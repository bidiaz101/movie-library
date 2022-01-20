import React, { useState, useEffect } from 'react'
import MovieCard from './MovieCard'
import styled from 'styled-components'

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 20%);
    grid-template-rows: repeat(4, 20%);
    grid-column-gap: 90px;
    grid-row-gap: 30px;
    padding: 50px;
`

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
        <Grid>
            {moviesToDisplay}
        </Grid>
    )
}

export default Home