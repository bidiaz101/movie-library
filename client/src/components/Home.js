import React, { useState } from 'react'
import MovieExample from './MovieExample'

function Home({ setMoviePageId }){
    const [userScore, setUserScore] = useState(10)

    return (
        <div className='home'>
            <h2>What is Super Movie Library? (SML)</h2>
            <p>SML is an app designed to help users keep track of movies they own. It uses <a href='https://www.themoviedb.org/' target='_blank' rel="noreferrer">TMDB</a> API for all the data. </p> 

            <p>Without logging in, you can you browse movies to see what's playing in theaters, most popular, best rated, etc. Click the "View Movie Page" button on the movie to see more info about a certain movie.</p>
            <br />
            <p>The movie will appear in cards like this!</p>
            <div id='home-example' className='app-wrap'>
                <MovieExample userScore={userScore} setUserScore={setUserScore} setMoviePageId={setMoviePageId} />
            </div>

            <form>
                <label htmlFor='rating'>Change the rating to see how it'll appear:</label>
                <input type='number' name='rating' style={{color: 'black'}} min='0' max='10' name='score' value={userScore} onChange={e => setUserScore(e.target.value)} />
            </form>

            <p>See the video walkthrough below to learn more!</p>
            <iframe className='home-video' src="https://www.youtube.com/embed/4Qoii_8cGOs" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

            <p>My name is Brian and you can find the code used to build this site <a href="https://github.com/bidiaz101/movie-library" target='_blank' rel="noreferrer">here!</a></p>
        </div>
    )
}

export default Home
