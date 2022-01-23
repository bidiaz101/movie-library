import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import useRating from './useRating'
import { useSelector } from 'react-redux'

function MovieCard({ movie, username, collected=false }){
    const [hidden, setHidden] = useState(true)
    const [errors, setErrors] = useState([])

    //id is OMDB ID
    const { id, title, poster_path, release_date, overview, vote_average, vote_count } = movie

    function handleClick(){
        fetch(`/movies/${id}`)
        .then(resp => resp.json())
        .then(movie => {
            // id is my DB ID. omdb_id is exactly what you'd think

            fetch('/user_movies', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    movie_id: movie.id,
                    favorite: false
                })
            })
            .then(resp => {
                if(resp.ok){
                    setHidden(false)
                    setTimeout(() => setHidden(true) , 2000)
                } else {
                    resp.json()
                    .then(data => setErrors(data.error))
                    setTimeout(() => setErrors([]) , 2000)
                }
            })
        })
    }

    const history = useHistory()

    function handlePageView(){
        history.push(`/movie/${id}`)
    }

    const darkMode = useSelector(state => state.user.darkMode)

    return (
        <div className='flip-card'>
            <div id='modal' className={hidden ? 'hidden' : null} >Movie Successfully Added!</div>
            <div className={errors.length ? 'error' : 'hidden'}>{errors[0]}</div>
            <div id={darkMode? 'flip-card-inner-dark' :null} className='flip-card-inner'>
                <div className='flip-card-front'>
                    <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title + 'poster'} style={{ width: '100%' }} />
                    <div>
                        <h2>{`${title} ${ release_date ? `(${release_date.slice(0,4)})` : "" }`}</h2>
                    </div>
                </div>
                <div className='flip-card-back'>
                    <p><strong>Overview: </strong></p>
                    <p>{overview}</p>
                    <p>Average Rating: {vote_average}</p>
                    <p>{useRating(vote_average)}</p>
                    <p>Votes: {vote_count}</p>
                    <div className='button-wrap'>
                        {username ? (
                            <button id={collected ? 'card-button-collected' : 'card-button-uncollected'} onClick={handleClick}>{collected ? 'Remove from Collection' : 'Add to Collection'}</button>
                        ) : null}
                        <button className={darkMode ? 'button-dark': null} onClick={handlePageView}>View Movie Page</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard
