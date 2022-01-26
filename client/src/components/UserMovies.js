import React, { useState, useEffect } from 'react'
import DisplayControls from './DisplayControls'
import MovieCard from './MovieCard'
import { useSelector } from 'react-redux'

function UserMovies(){
    const [displayFavorites, setDisplayFavorites] = useState(false)
    const [userMovies, setUserMovies] = useState([])
    const [status, setStatus] = useState('idle')

    const username = useSelector(state => state.user.username)

    useEffect(() => {
        setStatus('loading')
        fetch('/user_movies')
        .then(resp => resp.json())
        .then(data => {
            setUserMovies(data)
            setStatus('idle')
        })
    }, [])

    function handleRemove(id){
        fetch(`/user_movies/${id}`, { method: 'DELETE' })
        .then(setUserMovies(userMovies.filter(userMovie => userMovie.id !== id)))
    }

    const moviesToDisplay = userMovies.filter(movieData => displayFavorites ? movieData.favorite : true).map(movieData => {
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
        />
    })

    const idleContent = userMovies.length ? (
        <div className='collection-grid'>
            {moviesToDisplay}
        </div>
    ) : <h1>You have no movies in your collection. Browse or search to add some.</h1> ;

    return (
        <div>
            <DisplayControls displayFavorites={displayFavorites} setDisplayFavorites={setDisplayFavorites} />
            {status === 'loading' ? <h1>Loading...</h1> : idleContent}
        </div>
    )
}

export default UserMovies
