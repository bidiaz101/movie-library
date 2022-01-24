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
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${search}&page=1&include_adult=false`)
        .then(resp => resp.json())
        .then(data => {
            setResults(data.results)
            data.results.forEach(movie => {
                // Stores OMDB Api ID 

                fetch('/movies', {
                    method: 'POST',
                    headers: { "Content-Type": 'application/json' },
                    body: JSON.stringify({ omdb_id: movie.id })
                })
            })
        })
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
            <div className='grid'>
                {moviesToDisplay}
            </div>
         ) : null}
        </>

    )
}

export default Search