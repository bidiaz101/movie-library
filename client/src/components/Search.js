import React, { useState } from 'react'
import MovieCard from './MovieCard'
import { useSelector } from 'react-redux'

function Search(){
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const [displayError, setDisplayError] = useState(false)

    function handleChange(e){
        setSearch(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        if(search){
            fetch(`/tmdb/search/${search}`)
            .then(resp => resp.json())
            .then(data => setResults(data.results))
        } else {
            setDisplayError(true)
            setTimeout(() => setDisplayError(false), 3000)
        }
    }

    const username = useSelector(state => state.user.username)

    let moviesToDisplay = results.map(movie => {
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
        {displayError ? <div className='app-wrap'><h1>Please enter a search term</h1></div> : null}
        {results.length ? (
            <div className='grid-container'>
                <div className='collection-grid'>
                    {moviesToDisplay}
                </div>
            </div>
         ) : <div className='app-wrap'><h1>No movies found</h1></div>}
        </>

    )
}

export default Search