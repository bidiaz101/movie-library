import React, { useState, useEffect } from 'react'
import DisplayControls from './DisplayControls'
import MovieCard from './MovieCard'

function UserMovies(){
    const [genres, setGenres] = useState([])
    const [selectedGenre, setSelectedGenre] = useState("All")
    const [collection, setCollection] = useState([])

    useEffect(() => {
        fetch('/user_movies')
        .then(resp => resp.json())
        .then(data => setCollection(data))

        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        .then(resp => resp.json())
        .then(genreData => setGenres(genreData.genres))
    }, [])

    // console.log(collection)

    // fetch(`https://api.themoviedb.org/3/movie/${movie.movie.omdb_id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    // .then(resp => resp.json())
    // .then(movieData => movieData)

    return (
        <div>
            <DisplayControls genres={genres} setSelectedGenre={setSelectedGenre}/>
            <div className='app-wrap'>
                {collection.length ? <div>hey</div> : <h1>You have no movies in your collection. Browse or search to add some.</h1>}
            </div>
        </div>
    )
}

export default UserMovies
