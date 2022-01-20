import React from 'react'
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
`

function MovieCard({ movie }){
    const { title, poster_path, release_date } = movie
    return (
        <Card>
            <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title + 'poster'} style={{ width: '100%' }} />
            <div>
                <p>{`${title} (${ release_date.slice(0,4) })`}</p>
            </div>
        </Card>
    )
}

export default MovieCard
