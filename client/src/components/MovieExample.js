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

    const stars = useRating(userScore)

    let movieId

    switch(userScore){
        case '9':
            movieId = '634649'
            break;
        case '8':
            movieId = '568124'
            break;
        case '7':
            movieId = '585083'
            break;
        case '6':
            movieId = '752623'
            break;
        case '5':
            movieId = '512195'
            break;
        case '4':
            movieId = '299537'
            break;
        case '3':
            movieId = '9312'
            break;
        case '2':
            movieId = '644495'
            break;
        case '1':
            movieId = '11324'
            break;
        case '0':
            movieId = '4515'
            break;
        default:
            movieId = '10681'
    }

    useEffect(() => {
        fetch(`tmdb/movies/${movieId}`)
            .then(resp => resp.json())
            .then(movieData => setExampleMovie(movieData))
    }, [movieId])

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

    return (
        <div className='flip-card'>
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
                    <div onClick={() => setHeart(!heart)} className='favorite-heart'>{heart ? '💗' : '♡' } Click Me!</div>
                    <div className='button-wrap'>
                        <button className={darkMode ? 'button-dark': null} onClick={handlePageView}>View Movie Page</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieExample
