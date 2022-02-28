import React from 'react'

function Home(){
    return (
        <div className='home'>
            <h2>What is Super Movie Library? (SML)</h2>
            <p>SML is an app designed to help users keep track of movies they own. It uses <a href='https://www.themoviedb.org/' target='_blank' rel="noreferrer">TMDB</a> API for all the data. See the video walkthrough below to learn more!</p>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/4Qoii_8cGOs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <p>My name is Brian and you can find the code used to build this site <a href="https://github.com/bidiaz101/movie-library" target='_blank' rel="noreferrer">here!</a></p>
        </div>
    )
}

export default Home
