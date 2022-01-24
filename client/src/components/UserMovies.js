import React, { useState, useEffect } from 'react'
import DisplayControls from './DisplayControls'
import MovieCard from './MovieCard'
import { useSelector } from 'react-redux'

function UserMovies(){
    const [genres, setGenres] = useState([])
    const [selectedGenre, setSelectedGenre] = useState("All")
    const [userMovies, setUserMovies] = useState([])
    const [collection, setCollection] = useState([])

    const username = useSelector(state => state.user.username)

    useEffect(() => {
        fetch('/user_movies')
        .then(resp => resp.json())
        .then(data => {
            const allMovieData = []

            data.forEach(userMovie => {
                const id = userMovie.movie.omdb_id
                
                fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
                .then(resp => resp.json())
                .then(movieData => allMovieData.push(movieData))
            })

            setCollection(allMovieData)
            setUserMovies(data)
        })

        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        .then(resp => resp.json())
        .then(genreData => setGenres(genreData.genres))
    }, [])

    const collectionToDisplay = collection.map(movieData => {
        return <MovieCard 
            key={movieData.id} 
            movie={movieData} 
            username={username} 
            collected={true} 
            collection={collection} 
            setCollection={setCollection} 
            userMovies={userMovies} 
        />
    })

    console.log(collection)

    return (
        <div>
            <DisplayControls genres={genres} setSelectedGenre={setSelectedGenre}/>
            {collection.length ? (
                <div className='collection-grid'>
                    {collectionToDisplay}
                </div>
            ) : <h1>You have no movies in your collection. Browse or search to add some.</h1>}
        </div>
    )
}

export default UserMovies
