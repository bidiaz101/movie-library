import React, { useState, useEffect } from 'react'
import DisplayControls from './DisplayControls'
import MovieCard from './MovieCard'
import { useSelector } from 'react-redux'

function UserMovies({ setMoviePageId }){
    const [displayFavorites, setDisplayFavorites] = useState(false)
    const [userMovies, setUserMovies] = useState([])
    const [status, setStatus] = useState('idle')
    const [favoritesArr, setFavoritesArr] = useState([])

    const username = useSelector(state => state.user.username)

    useEffect(() => {
        setStatus('loading')
        fetch('/user_movies')
        .then(resp => resp.json())
        .then(data => {
            setUserMovies(data)
            setFavoritesArr(data.filter(userMovie => userMovie.favorite).map(userMovie => userMovie.id))
            setStatus('idle')
        })
    }, [])

    function handleRemove(id){
        fetch(`/user_movies/${id}`, { method: 'DELETE' })
        .then(setUserMovies(userMovies.filter(userMovie => userMovie.id !== id)))
    }

    const moviesToDisplay = userMovies.filter(movieData => displayFavorites ? favoritesArr.includes(movieData.id) : true).map(movieData => {
        // movieData.id is the user_movie id
        return <MovieCard 
            key={movieData.id}
            omdbId={movieData.movie.omdb_id}
            username={username} 
            collected={true}
            setUserMovies={setUserMovies} 
            userMovies={userMovies}
            handleRemove={handleRemove}
            userMovieId={movieData.id}
            favorite={movieData.favorite}
            favoritesArr={favoritesArr}
            setFavoritesArr={setFavoritesArr}
            setMoviePageId={setMoviePageId}
        />
    })

    const idleContent = userMovies.length ? (
        <div className='collection-grid'>
            {moviesToDisplay}
        </div>
    ) : <h1>You have no movies in your collection. Browse or search to add some.</h1> ;

    return (
        <div className='grid-parent'>
            <DisplayControls displayFavorites={displayFavorites} setDisplayFavorites={setDisplayFavorites} />
            <div className='grid-container'>
                {status === 'loading' ? <h1>Loading...</h1> : idleContent}
            </div>
        </div>
    )
}

export default UserMovies
