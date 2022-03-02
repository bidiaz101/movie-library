import React from 'react'
import MovieCard from './MovieCard'

function Home(){
    return (
        <div className='home'>
            <h2>What is Super Movie Library? (SML)</h2>
            <p>SML is an app designed to help users keep track of movies they own. It uses <a href='https://www.themoviedb.org/' target='_blank' rel="noreferrer">TMDB</a> API for all the data. </p> 

            <p>Without logging in, you can you browse movies to see what's playing in theaters, most popular, best rated, etc. Click the "View Movie Page" button on the movie to see more info about a certain movie.</p>
            <br />
            <p>The movie will appear in cards like this!</p>

            {/* <div className='app-wrap'>
                <MovieCard collected={true} omdbId={550} />
            </div> */}

            <p>See the video walkthrough below to learn more!</p>
            <iframe className='home-video' src="https://www.youtube.com/embed/4Qoii_8cGOs" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

            <p>My name is Brian and you can find the code used to build this site <a href="https://github.com/bidiaz101/movie-library" target='_blank' rel="noreferrer">here!</a></p>
        </div>
    )
}

export default Home
