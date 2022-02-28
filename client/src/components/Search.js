import React, { useState } from 'react'
import MovieCard from './MovieCard'
import { useSelector } from 'react-redux'

function Search(){
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])

    function handleChange(e){
        setSearch(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        fetch(`/tmdb/search/${search}`)
        .then(resp => resp.json())
        .then(data => setResults(data.results))
    }

    const username = useSelector(state => state.user.username)

    const moviesToDisplay = results.map(movie => {
        return <MovieCard key={movie.id} movie={movie} username={username} />
    })

    const darkMode = useSelector(state => state.user.darkMode)

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="search">Search: </label>
            <input id={darkMode ? 'option-dark' : null} type='text' onChange={handleChange} name='search' />
            <input type='submit' id={darkMode ? 'button-dark' : null} value='Go!' />
        </form>
        {results.length ? (
            <div className='grid-container'>
                <div className='collection-grid'>
                    {moviesToDisplay}
                </div>
            </div>
         ) : null}
        </>

    )
}

export default Search