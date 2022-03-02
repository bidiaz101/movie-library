import React, { useState, useEffect } from 'react'
import useRating from './useRating'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

function MovieExample({ userScore, setMoviePageId }){
    const darkMode = useSelector(state => state.user.darkMode)

    const [heart, setHeart] = useState(false)
    const [exampleMovie, setExampleMovie] = useState({
        title: '',
        poster_path: '',
        overview: '',
        vote_average: 0,
        vote_count: 0
    })
    const [hidden, setHidden] = useState(true)

    const stars = useRating(userScore)

    useEffect(() => {
        fetch('tmdb/movies/10681')
            .then(resp => resp.json())
            .then(movieData => setExampleMovie(movieData))
    }, [])

    const { id, title, poster_path, overview, vote_average, vote_count } = exampleMovie

    const history = useHistory()

    function handlePageView(){
        fetch('/movies', {
            method: 'POST',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({ omdb_id: exampleMovie.id })
        })
        history.push(`/movies/${id}`)
        setMoviePageId(id)
    }

    function handleAdd(){
        setHidden(false)
        setTimeout(() => setHidden(true) , 2000)
    }

    return (
        <div className='flip-card'>
            <div id='modal' className={hidden ? 'hidden' : null} >You'll get a notification like this when a movie is added to your collection!</div>
            <div id={darkMode? 'flip-card-inner-dark' :null} className='flip-card-inner'>
                <div className='flip-card-front'>
                    <div className='flip-card-front'>
                        <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title + ' poster'} style={{ width: '100%' }} />
                        <div>
                            <h2>{title}</h2>
                            <div>{heart ? '💗' : '♡' }</div>
                            <p>{stars}</p>
                        </div>
                    </div>
                </div>
                <div className='flip-card-back'>
                    <p><strong>Overview: </strong></p>
                    <p>{overview}</p>
                    <p>Average Rating: {vote_average}</p>
                    <p>{stars}</p>
                    <p>Votes: {vote_count}</p>
                    <div><p onClick={() => setHeart(!heart)} className='favorite-heart'>{heart ? '💗' : '♡' } Click Me!</p></div>
                    <div className='button-wrap'>
                        <button id='card-button-uncollected' onClick={handleAdd}>Add to Collection</button>
                        <button className={darkMode ? 'button-dark': null} onClick={handlePageView}>View Movie Page</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieExample
