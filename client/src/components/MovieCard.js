import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
    border-style: solid;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-wrap: wrap;
    height: 600px;
    width: 100%;
`

function MovieCard({ movie }){
    const { title, poster_path, release_date } = movie

    return (
        <Card>
            <img src={`https://image.tmdb.org/t/p/w200${poster_path}`} alt={title + 'poster'} />
            <p>{`${title} (${ release_date.slice(0,4) })`}</p>
        </Card>
    )
}

export default MovieCard
