import React, { useState } from 'react'
import styled from 'styled-components'

const Card = styled.div`
    border: 2px solid #e7e7e7;
    border-radius: 4px;
    padding: .5rem;
    display: flex;
    justify-content: center;
    text-align: center;
    flex-wrap: wrap;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    &:hover{
        box-shadow: 0 10px 20px 0 rgba(0,0,0,0.2);
    }
    &:active{
        transition: transform 0.8s;
        perspective: 1000px;
        transform: rotateY(180deg);
    }
`

function MovieCard({ movie, genres }){
    const [flipped, setFlipped] = useState(false)

    const { title, poster_path, release_date, overview, vote_average, vote_count } = movie

    function handleFlip(){
        setFlipped(!flipped)
    }

    let rating = ''

    console.log(vote_average)

    for(let i = 1; i < vote_average; i++){
        rating += '⭐'
    }

    for(let i = vote_average; i < 10; i++){
        rating += '✰'
    }

    return (
        <Card onClick={handleFlip}>
            {flipped ? (
                <div>
                    <p><strong>Overview: </strong></p>
                    <p>{overview}</p>
                    <p>Average Rating: </p>
                    <p>{rating}</p>
                    <p>Votes: {vote_count}</p>
                </div>
            ) : (
                <>
                <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title + 'poster'} style={{ width: '100%' }} />
                <div>
                    <p>{`${title} (${ release_date.slice(0,4) })`}</p>
                </div>
                </>
            )}
        </Card>
    )
}

export default MovieCard
