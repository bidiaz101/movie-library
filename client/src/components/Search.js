import React, { useState } from 'react'
import MovieCard from './MovieCard'
import { useSelector } from 'react-redux'

function Search({ setMoviePageId }){
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
        return <MovieCard key={movie.id} movie={movie} username={username} setMoviePageId={setMoviePageId} />
    })

    const darkMode = useSelector(state => state.user.darkMode)

    const noResults = typeof results[0] === 'string' ? (
        <div className='app-wrap'><h1>{results[0]}</h1></div>
     ) : null;

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="search">Search: </label>
            <input id={darkMode ? 'option-dark' : null} type='text' onChange={handleChange} name='search' />
            <input type='submit' id={darkMode ? 'button-dark' : null} value='Go!' />
        </form>
        
        {displayError ? <div className='app-wrap'><h1>Please enter a search term</h1></div> : null}

        {results.length && typeof results[0] !== 'string' ? (
            <div className='grid-container'>
                <div className='collection-grid'>
                    {moviesToDisplay}
                </div>
            </div>
         ) : noResults}
        </>

    )
}

export default Search