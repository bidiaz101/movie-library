import React, { useState } from 'react'
import MovieCard from './MovieCard'

function Search(){
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])

    function handleChange(e){
        setSearch(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${search}&page=1&include_adult=false`)
        .then(resp => resp.json())
        .then(data => setResults(data.results))
    }

    const moviesToDisplay = results.map(movie => {
        return <MovieCard key={movie.id} movie={movie} />
    })

    console.log(moviesToDisplay)

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="search">Search: </label>
            <input type='text' onChange={handleChange} name='search' />
            <input type='submit' className='button' value='Go!' />
        </form>
        {results.length ? <h1>hey</h1> : null}
        </>

    )
}

export default Search